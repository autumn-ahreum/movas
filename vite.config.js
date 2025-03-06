import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",  // 상대 경로 설정
  build: {
    outDir: "movas",  // 빌드 파일을 movas 폴더로 저장
    assetsDir: "assets",  // CSS, JS 파일을 movas/assets 폴더에 저장
    emptyOutDir: true,  // 기존 파일 삭제 후 새로 빌드
    },
    plugins: [react()],
})
