const multer = require('multer');
const fs = require('fs');
const path = require('path');

// 파일 저장 경로 및 파일 이름 설정

try {
	fs.readdirSync('public/uploads'); // 폴더 확인
} catch(err) {
	console.error('uploads 폴더가 없습니다. 폴더를 생성합니다.');
    fs.mkdirSync('public/uploads'); // 폴더 생성
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // 업로드 폴더 경로
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    file.originalname = Buffer.from(file.originalname,'latin1').toString('utf-8');
    cb(null, uniqueSuffix + path.extname(file.originalname)); // 파일 이름 설정
    
  }
});

// // 파일 필터링 (예: 이미지 파일만 허용)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only JPEG, PNG, and GIF files are allowed.'), false);
//   }
// };

// 업로드 객체 생성
const upload = multer({
  storage: storage,
//   fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // 파일 사이즈 제한: 5MB
});

module.exports = upload;
