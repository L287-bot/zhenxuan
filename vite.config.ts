import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
//引入svg需要用到的插件
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";
import {viteMockServe} from "vite-plugin-mock";
// https://vite.dev/config/
export default defineConfig(({command,mode}) => {
    //获取各种环境下对应的变量
    let env=loadEnv(mode,process.cwd());
    return {
        plugins: [vue(),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                symbolId: 'icon-[dir]-[name]'
            }),
            viteMockServe({
                localEnabled: command === 'serve',//保证开发阶段可以使用mock接口
            }),],
        resolve: {alias: {"@": path.resolve('./src')}},
        css: {
            preprocessorOptions: {
                scss: {
                    javascriptEnabled: true,
                    additionalData: '@import "@/styles/variable.scss";',
                },
            },
        },
        // 代理跨域
        server: {
            proxy: {
                [env.VITE_APP_BASE_API]: {
                    target: env.VITE_SERVE,
                    // 需要代理跨域
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },

    }
})
