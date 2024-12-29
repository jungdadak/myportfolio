// pages/api/upload.js

import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Multer 설정
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// 디렉토리가 없으면 생성
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('이미지 파일만 업로드할 수 있습니다.'));
  },
});

// 핸들러 함수
export default function handler(req, res) {
  if (req.method === 'POST') {
    upload.single('file')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // Multer 에러 처리
        return res.status(500).json({ error: err.message });
      } else if (err) {
        // 일반 에러 처리
        return res.status(500).json({ error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ error: '파일이 업로드되지 않았습니다.' });
      }

      const fileUrl = `/uploads/${req.file.filename}`;
      res.status(200).json({ url: fileUrl });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`허용되지 않은 메서드: ${req.method}`);
  }
}

export const config = {
  api: {
    bodyParser: false, // multer는 자체적으로 body parsing을 처리합니다.
  },
};
