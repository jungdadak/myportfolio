'use client';

import React, { useState, useRef, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// DynamicSelect 컴포넌트 임포트
import DynamicSelect from '../../../components/DynamicSelect';

// Toolbar 컴포넌트
const Toolbar = ({ onToolbarClick }) => (
  <div className="flex gap-2 mb-2 p-2 bg-gray-800 rounded-t">
    {[
      { icon: 'B', action: '**텍스트**', tooltip: '굵게' },
      { icon: 'I', action: '*텍스트*', tooltip: '기울임' },
      { icon: 'H1', action: '# ', tooltip: '제목 1' },
      { icon: 'H2', action: '## ', tooltip: '제목 2' },
      { icon: 'H3', action: '### ', tooltip: '제목 3' },
      { icon: '```', action: '```', tooltip: '코드 블록' },
      { icon: '<>', action: '`텍스트`', tooltip: '인라인 코드' },
      { icon: '1.', action: '1. ', tooltip: '순서 있는 목록' },
      { icon: '- ', action: '- ', tooltip: '순서 없는 목록' },
      { icon: '>', action: '> ', tooltip: '인용' },
      { icon: '---', action: '\n---\n', tooltip: '구분선' },
      { icon: '📷', action: '![이미지](주소)', tooltip: '이미지' },
      { icon: '🔗', action: '[링크](주소)', tooltip: '링크' },
      {
        icon: 'T',
        action: '| 헤더1 | 헤더2 |\n|---|---|\n| 셀1 | 셀2 |',
        tooltip: '테이블',
      },
      { icon: '📝', action: '- [ ] ', tooltip: '체크리스트' },
      { icon: '👉', action: '👉 ', tooltip: '화살표' },
      { icon: '👍', action: '👍 ', tooltip: '좋아요' },
      { icon: '👎', action: '👎 ', tooltip: '싫어요' },
      { icon: '🎉', action: '🎉 ', tooltip: '파티' },
    ].map((item) => (
      <button
        key={item.icon}
        type="button"
        onClick={() => onToolbarClick(item.action)}
        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
        title={item.tooltip}
      >
        {item.icon}
      </button>
    ))}
  </div>
);

export default function EditPost() {
  const router = useRouter();
  const params = useParams();

  // 콘솔 로그를 통해 파라미터 확인
  console.log('useParams:', params);

  // 파라미터 이름 확인 후 수정 (예: [id].js 이면 params.id 사용)
  const postId = params.id || params.detail; // 라우트에 맞게 수정

  // 상태 관리
  const [heroImage, setHeroImage] = useState(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [tagsOptions, setTagsOptions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [projectsOptions, setProjectsOptions] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const textareaRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  // 게시글 데이터 및 태그/프로젝트 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 태그와 프로젝트 데이터를 병렬로 불러오기
        const [tagsRes, projectsRes] = await Promise.all([
          axios.get('/api/tags'),
          axios.get('/api/projects'),
        ]);

        const tagOptions = tagsRes.data.map((tag) => ({
          value: tag.id,
          label: tag.name,
        }));
        setTagsOptions(tagOptions);

        const projectOptions = projectsRes.data.map((project) => ({
          value: project.id,
          label: project.title,
        }));
        setProjectsOptions(projectOptions);

        // 게시글 데이터 불러오기
        const postRes = await axios.get(`/api/posts/${postId}`);
        const post = postRes.data;

        setTitle(post.title);
        setSubtitle(post.subtitle || '');
        setContent(post.content);
        setHeroImage(post.heroImage || null);
        setSelectedTags(
          post.tags.map((tag) => ({
            value: tag.id,
            label: tag.name,
          }))
        );
        setSelectedProject(
          post.project
            ? { value: post.project.id, label: post.project.title }
            : null
        );
      } catch (error) {
        console.error('데이터 로드 실패:', error);
        toast.error('데이터를 불러오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchData();
    }
  }, [postId]);

  // 툴바 클릭 시 텍스트 삽입
  const handleToolbarClick = (action) => {
    insertAtCursor(action);
  };

  // 히어로 이미지 업로드 핸들러
  const handleHeroImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setHeroImage(res.data.url);
      toast.success('히어로 이미지 업로드 성공');
    } catch (error) {
      console.error('히어로 이미지 업로드 실패:', error);
      toast.error('히어로 이미지 업로드 실패');
    }
  };

  // 이미지 드롭 또는 붙여넣기 핸들러
  const handleImageDropOrPaste = async (e) => {
    e.preventDefault();

    const files = e.dataTransfer?.files || e.clipboardData?.files;
    console.log('Pasted Files:', files); // 디버깅용 로그

    if (files && files.length > 0) {
      const file = files[0];
      const fileType = file.type;
      console.log('File Type:', fileType); // 디버깅용 로그

      if (fileType && fileType.startsWith('image/')) {
        const formData = new FormData();
        formData.append('file', file);

        try {
          const res = await axios.post('/api/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          // 마크다운 이미지 문법으로 변경
          insertAtCursor(`![이미지](${res.data.url})\n\n`);
          toast.success('이미지 삽입 성공');
        } catch (error) {
          console.error('이미지 삽입 실패:', error);
          toast.error('이미지 삽입 실패');
        }
        return;
      }
    }

    // 데이터 URL 형태의 이미지 처리
    const text = e.clipboardData?.getData('text');
    if (text) {
      const dataUrlMatch = text.match(/^data:image\/(png|jpeg|jpg);base64,/);
      if (dataUrlMatch) {
        // 데이터 URL을 서버로 전송하여 이미지 URL을 얻는 로직
        try {
          const res = await axios.post('/api/upload-data-url', {
            dataUrl: text,
          });
          insertAtCursor(`![이미지](${res.data.url})\n\n`);
          toast.success('이미지 삽입 성공');
        } catch (error) {
          console.error('데이터 URL 이미지 삽입 실패:', error);
          toast.error('데이터 URL 이미지 삽입 실패');
        }
      } else {
        // 일반 텍스트 삽입
        insertAtCursor(text);
      }
    }
  };

  // 텍스트 삽입 함수 (상태 기반)
  const insertAtCursor = (text) => {
    if (!textareaRef.current) {
      console.error('textareaRef.current is null in insertAtCursor');
      toast.error('텍스트 에어리어에 접근할 수 없습니다.');
      return;
    }

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = content; // 상태에서 현재 값을 가져옴
    const newValue = value.substring(0, start) + text + value.substring(end);
    setContent(newValue); // 상태 업데이트

    // 커서 위치 설정
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + text.length;
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentContent = content;

    if (!title || !currentContent) {
      toast.error('제목과 내용을 입력하세요.');
      return;
    }

    const tagIds = selectedTags.map((tag) => tag.value);
    const projectId = selectedProject ? selectedProject.value : null;

    try {
      // 수정된 데이터 준비
      const updateData = {
        title,
        subtitle,
        content: currentContent,
        heroImage,
        tagIds, // tags 대신 tagIds로 변경
        projectId,
      };

      // PUT 요청 보내기
      const response = await axios.put(`/api/posts/${postId}`, updateData);

      if (response.status === 200) {
        toast.success('글이 성공적으로 수정되었습니다.');
        // 수정된 라우팅
        router.push(`/articles/${postId}`);
      }
    } catch (error) {
      console.error('글 수정 실패:', error);
      // 더 자세한 에러 메시지 표시
      const errorMessage =
        error.response?.data?.message || '글 수정에 실패했습니다.';
      toast.error(errorMessage);
    }
  };

  // 임시 저장 핸들러
  const handleSaveDraft = async () => {
    if (!title || !content) {
      toast.error('제목과 내용을 입력하세요.');
      return;
    }

    const tagIds = selectedTags.map((tag) => tag.value);
    const projectId = selectedProject ? selectedProject.value : null;

    try {
      const response = await axios.post('/api/posts/draft', {
        title,
        subtitle,
        content,
        heroImage,
        tagIds, // tags 대신 tagIds로 변경
        projectId,
      });

      if (response.status === 200) {
        toast.success('초안이 성공적으로 저장되었습니다.');
        router.push('/articles');
      }
    } catch (error) {
      console.error('초안 저장 실패:', error);
      const errorMessage =
        error.response?.data?.message || '초안 저장에 실패했습니다.';
      toast.error(errorMessage);
    }
  };

  // 취소 핸들러
  const handleCancel = () => {
    if (
      confirm('작성 중인 내용을 취소하시겠습니까? 모든 변경 사항이 사라집니다.')
    ) {
      // 폼 초기화
      setTitle('');
      setSubtitle('');
      setHeroImage(null);
      setSelectedTags([]);
      setSelectedProject(null);
      setContent('');
      toast.success('작성 취소되었습니다.');
      router.push('/articles');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-xl">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Toaster position="top-right" />
      <h2 className="text-4xl font-bold mb-6 text-center">글 수정하기</h2>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        {/* 제목 입력 */}
        <div>
          <label className="block text-xl font-semibold mb-2">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* 부제목 입력 */}
        <div>
          <label className="block text-xl font-semibold mb-2">부제목</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="부제목을 입력하세요"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* 히어로 이미지 업로드 */}
        <div>
          <label className="block text-xl font-semibold mb-2">
            히어로 이미지
          </label>
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleHeroImageUpload}
              className="w-full text-gray-400"
            />
            {heroImage && (
              <img
                src={heroImage}
                alt="Hero"
                className="mt-4 w-full h-64 object-cover rounded"
              />
            )}
          </div>
        </div>

        {/* 태그 선택 */}
        <div>
          <label className="block text-xl font-semibold mb-2">태그</label>
          <DynamicSelect
            isMulti
            options={tagsOptions}
            value={selectedTags}
            onChange={setSelectedTags}
            className="w-full"
            placeholder="태그를 선택하세요"
          />
        </div>

        {/* 프로젝트 선택 */}
        <div>
          <label className="block text-xl font-semibold mb-2">프로젝트</label>
          <DynamicSelect
            options={projectsOptions}
            value={selectedProject}
            onChange={setSelectedProject}
            isClearable
            className="w-full"
            placeholder="프로젝트를 선택하세요"
          />
        </div>

        {/* 내용 입력 및 미리보기 */}
        <div>
          <label className="block text-xl font-semibold mb-2">내용</label>
          <div className="bg-gray-800 border border-gray-700 rounded">
            <Toolbar onToolbarClick={handleToolbarClick} />
            {!isPreview ? (
              <textarea
                ref={textareaRef}
                onDrop={handleImageDropOrPaste}
                onPaste={handleImageDropOrPaste}
                placeholder="내용을 입력하세요"
                className="w-full p-3 bg-gray-800 rounded-b h-96 focus:outline-none resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            ) : (
              <div className="w-full p-3 h-96 overflow-auto prose prose-sm md:prose-base prose-invert max-w-none">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <div className="relative rounded-xl overflow-hidden my-6">
                          <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                            <span className="text-sm font-medium text-gray-300">
                              {match[1].toUpperCase()}
                            </span>
                          </div>
                          <SyntaxHighlighter
                            style={okaidia}
                            language={match[1]}
                            PreTag="pre"
                            className="!m-0 !bg-gray-900"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        <code
                          className="bg-gray-800 rounded px-1 py-0.5"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    img({ node, ...props }) {
                      return (
                        <img
                          {...props}
                          alt={props.alt || 'Content Image'}
                          className="rounded-lg shadow-lg max-w-full h-auto mx-auto"
                          loading="lazy"
                        />
                      );
                    },
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            )}
          </div>
          <div className="flex justify-between mt-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded"
            >
              임시 저장
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
            >
              취소
            </button>
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              {isPreview ? '편집하기' : '미리보기'}
            </button>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded text-white"
          >
            글 수정하기
          </button>
        </div>
      </form>
    </div>
  );
}
