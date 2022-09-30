import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import autoprefixer from 'autoprefixer';
import libCss from 'vite-plugin-libcss';

const LOCALHOST = 'https://lzz.enbo12119.com';
// const LOCALHOST = 'http://192.168.9.148';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    plugins: [
        react(),
        libCss(),
        vitePluginImp({
            libList: [
                {
                    libName: 'antd',
                    style: (name) => `antd/lib/${name}/style/index.css`
                }
            ]
        })
    ],
    server: {
        hmr: true,
        open: true,
        port: 3000,
        proxy: {
            '/prod-api': {
                target: LOCALHOST,
                changeOrigin: true,
            },
            '/proxy': {
                target: LOCALHOST,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/proxy/, '')
            },
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
            // scss: {
            //     additionalData: `@import "./src/styles/variables.scss";`
            // }
        },
        postcss: {
            plugins: [
                autoprefixer({
                    'overrideBrowserslist': ['last 2 versions'],
                    grid: true
                })
            ]
        },
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'WsPlayer',
            fileName: 'ws-player'
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        }
    },
});
