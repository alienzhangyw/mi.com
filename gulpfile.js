'use strict';
const { gulp, src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');

// 清空dist文件夹
function clean() {
    return del('dist/**/*');
}

// 把.scss文件解析并压缩成min.css
function scss() {
    return src('stylesheet/*.scss')
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(dest('dist/css'))
        .pipe(connect.reload());
}

// 处理.js
function scripts() {
    return src('scripts/*.js')
        .pipe(dest('dist/js'))
        .pipe(connect.reload());
}

// 处理.html
function html() {
    return src('html/*.html')
        .pipe(dest('dist'))
        .pipe(connect.reload());
}

// 处理数据
function data() {
    return src('data/*.json')
        .pipe(dest('dist/data'))
        .pipe(connect.reload());
}

// 处理图片
function images() {
    return src('images/**/*')
        .pipe(dest('dist/images'))
        .pipe(connect.reload());
}

// 执行所有任务
exports.build = series(clean, scss, scripts, html, data, images);

// 监控文件变化
function watchFiles() {
    watch('stylesheet/*.scss', scss);
    watch('scripts/*.js', scripts);
    watch('html/*.html', html);
    watch('data/*.json', data);
    watch('images/**/*', images);
};

// 启动一个服务器
const connect = require('gulp-connect');
function server() {
    connect.server({
        root: 'dist',
        port: 8000,
        livereload: true
    });
    connect.serverClose();
}

// 创建默认任务，启动监听和服务器
exports.default = parallel(watchFiles, server);