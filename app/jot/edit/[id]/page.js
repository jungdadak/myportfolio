// app/jot/edit/[id]/page.jsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import Select from 'react-select';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';

export default function Edit() {
  const router = useRouter();
  const params = useParams();
  const { id } = params; // useParams를 사용하여 params를 가져옵니다.

  const [tags, setTags] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  const textareaRef = useRef(null);

  // 태그와 프로젝트 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tagsRes, projectsRes] = await Promise.all([
          axios.get('/api/tags'),
          axios.get('/api/projects'),
        ]);
        setTags(tagsRes.data);
        setProjects(projectsRes.data);
      } catch (error) {
        toast.error('데이터 가져오기 실패');
      }
    };
    fetchData();
  }, []);

  // 기존 게시물 데이터 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        const post = res.data;
        setTitle(post.title);
        setSubtitle(post.subtitle);
        setContent(post.content);
        setHeroImage(post.heroImage);
        setSelectedTags(
          post.tags.map((tag) => ({ value: tag.id, label: tag.name }))
        );
        setSelectedProject(
          post.project
            ? { value: post.project.id, label: post.project.title }
            : null
        );
      } catch (error) {
        toast.error('게시물 가져오기 실패');
      }
    };
    if (id) {
      fetchPost();
    }
  }, [id]);

  // 태그 및 프로젝트 옵션 변환
  const tagOptions = tags.map((tag) => ({ value: tag.id, label: tag.name }));
  const projectOptions = projects.map((project) => ({
    value: project.id,
    label: project.title,
  }));

  // 이미지 업로드 처리 및 마크다운 삽입
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const imageUrl = res.data.url;
      setHeroImage(imageUrl);
      insertAtCursor(`![이미지](${imageUrl})`);
      toast.success('이미지 업로드 성공');
    } catch (error) {
      toast.error(error.response?.data?.error || '이미지 업로드 실패');
    }
  };

  // 커서 위치에 텍스트 삽입
  const insertAtCursor = (text) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = content.substring(0, start);
    const after = content.substring(end, content.length);
    const newContent = before + text + after;
    setContent(newContent);

    // 커서 위치 조정
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + text.length;
    }, 0);
  };

  // 폼 제출 처리 (Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수 필드 검증
    if (!title || !content) {
      toast.error('제목과 내용을 입력하세요.');
      return;
    }

    const postData = {
      title,
      subtitle,
      content,
      heroImage,
      tags: selectedTags.map((tag) => tag.value),
      projectId: selectedProject ? selectedProject.value : null,
    };

    try {
      // 글 수정
      await axios.put(`/api/posts/${id}`, postData);
      toast.success('성공적으로 수정되었습니다!');
      setTimeout(() => {
        router.push(`/jot/${id}`);
      }, 1000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || '게시물 수정 실패';
      console.error('게시물 수정 실패:', error);
      toast.error(errorMessage);
    }
  };

  // 임시 저장 기능
  const handleSaveDraft = async () => {
    const draftData = {
      title,
      subtitle,
      content,
      heroImage,
      tags: selectedTags.map((tag) => tag.value),
      projectId: selectedProject ? selectedProject.value : null,
    };

    try {
      await axios.post('/api/posts/draft', draftData);
      toast.success('초안이 저장되었습니다.');
    } catch (error) {
      toast.error('초안 저장에 실패했습니다.');
    }
  };

  // 미리보기 토글
  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Toaster position="top-right" />
      <h2 className="text-4xl font-bold mb-6 text-center">글 수정하기</h2>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        {/* 제목 및 히어로 이미지 레이아웃 */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mb-8">
          {heroImage && (
            <div className="mb-4 md:mb-0">
              <img
                src={heroImage}
                alt="Hero"
                className="rounded-full object-cover w-24 h-24"
              />
            </div>
          )}
          <div className="flex-1">
            <label htmlFor="title" className="block text-xl font-semibold mb-2">
              제목
            </label>
            <input
              id="title"
              name="title"
              placeholder="글 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* 부제목 입력 */}
        <div>
          <label
            htmlFor="subtitle"
            className="block text-xl font-semibold mb-2"
          >
            부제목
          </label>
          <input
            id="subtitle"
            name="subtitle"
            placeholder="부제목을 입력하세요"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 태그 선택 */}
        <div>
          <label className="block text-xl font-semibold mb-2">태그</label>
          <Select
            isMulti
            options={tagOptions}
            value={selectedTags}
            onChange={setSelectedTags}
            className="select-container"
            classNamePrefix="select"
            placeholder="태그를 선택하세요..."
          />
        </div>

        {/* 프로젝트 선택 */}
        <div>
          <label className="block text-xl font-semibold mb-2">프로젝트</label>
          <Select
            options={projectOptions}
            value={selectedProject}
            onChange={setSelectedProject}
            isClearable
            className="select-container"
            classNamePrefix="select"
            placeholder="프로젝트를 선택하세요..."
          />
        </div>

        {/* 마크다운 입력 및 미리보기 토글 */}
        <div>
          <label htmlFor="content" className="block text-xl font-semibold mb-2">
            내용
          </label>
          {!isPreview ? (
            <textarea
              id="content"
              name="content"
              placeholder="내용을 입력하세요..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              ref={textareaRef}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded h-96 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          ) : (
            <div className="w-full p-3 bg-gray-800 border border-gray-700 rounded h-96 overflow-auto">
              <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                {content || '내용이 없습니다.'}
              </ReactMarkdown>
            </div>
          )}
          <button
            type="button"
            onClick={togglePreview}
            className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
          >
            {isPreview ? '편집하기' : '미리보기'}
          </button>
        </div>

        {/* 이미지 삽입 버튼 */}
        <div>
          <label className="block text-xl font-semibold mb-2">
            이미지 삽입
          </label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        {/* 버튼 그룹 */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 rounded text-black font-semibold transition duration-300"
          >
            임시 저장
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition duration-300"
          >
            글 발사버튼
          </button>
        </div>
      </form>
    </div>
  );
}
