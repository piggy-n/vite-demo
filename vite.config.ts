import { defineConfig } from 'vite';
import reactRefresh from "@vitejs/plugin-react-refresh"; // 热更新
const path = require('path');

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    plugins:[
        reactRefresh()
    ]
});
