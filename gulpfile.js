//gulp的变量
const {src,dest,series,watch} = require('gulp');


//处理html的插件变量
const htmlclean = require('gulp-htmlclean');


//处理js的变量
const uglify = require('gulp-uglify-es').default;
const stripDebug = require('gulp-strip-debug');

//处理less的变量
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');


//处理图片的插件的变量
const miniPhotos = require('gulp-image-optimize');


//设置开发环境或生产环境
const connect = require('gulp-connect');
process.env.NODE_ENV="production";

//处理html的任务
function dealHtml(){
    let stream = src('./src/html/*.html');
    if(process.env.NODE_ENV==='production'){
        stream.pipe(htmlclean());
    }
    return stream.pipe(connect.reload()).pipe(dest('./dist/'));  
}
//处理Css的任务
function dealCss(){
    let stream = src('./src/css/*.less')
        stream.pipe(less());
    let plugins = [autoprefixer()];
    if(process.env.NODE_ENV==='production'){
        plugins.push(cssnano());
    }
    return stream.pipe(postcss(plugins))
    .pipe(connect.reload())
        .pipe(dest('./dist/css/'));
}
//处理js的任务
function dealJs(){
    let stream = src('./src/js/*.js');
        if(process.env.NODE_ENV==='production'){
            stream.pipe(stripDebug())
            .pipe(uglify());
        }
    return stream.pipe(connect.reload()).pipe(dest('./dist/js/'));
}

//处理图片的任务
function dealPhotos(){
        return src('./src/img/*')
            .pipe(miniPhotos())
            .pipe(connect.reload())
            .pipe(dest('./dist/img/'));
}

//处理开启服务的任务
function dealService(cb){
    connect.server({
        port:9999,
        livereload:true,
        root:'dist'
    });
    cb();
}


//处理监控文件变化的任务
watch(['./src/html/*.html'],dealHtml);
watch(['./src/css/*.less'],dealCss);
watch(['./src/js/*.js'],dealJs);
//默认导出的任务
exports.default=series(dealHtml,dealCss,dealJs,dealPhotos,dealService);

