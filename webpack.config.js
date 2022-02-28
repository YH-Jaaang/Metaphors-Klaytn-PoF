const path = require("path");
const SRC_PATH = path.join(__dirname, './react/views/typescript');

module.exports = {
    mode: "development",
    // 엔트리 포인트
    entry: {
        index: ['babel-polyfill', path.join(SRC_PATH, 'index.tsx')]
    },
    // 빌드 결과물을 dist/main.js에 위치
    output: {
        path: path.join(__dirname, './public/javascripts'),
        filename: '[name].js'
    },
    resolve: {
        // 파일 확장자 처리
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        // rules: [
        //     // .ts나 .tsx 확장자를 ts-loader가 트랜스파일
        //     { test: /\.tsx?$/, loader: "ts-loader" },
        // ],
        rules: [
            // loader 나열
            {
                // ts, js
                test: /\.(ts|js)x?$/,
                exclude: '/node_module/',
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                // css
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                // image
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'Assets/Images/[name].[ext]?[hash]',
                        },
                    },
                ],
            },
            {
                // font
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'Assets/Fonts/[name].[ext]?[hash]',
                        },
                    },
                ],
            },
        ],
    },
}
