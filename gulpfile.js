
var gulp = require('gulp'),
webserver = require('gulp-webserver'),
url = require('url'),
	fs = require('fs'),		// fileSystem
	sass = require('gulp-sass'),
	imagemin = require('gulp-imagemin'),
	// css 压缩，只把格式合并一行
	minifyCss = require('gulp-minify-css'),
	// 压缩HTML
	minifyHtml = require('gulp-minify-html'),
	// 丑化操作，对变量名称做修改
	uglify = require('gulp-uglify'),

	// 模块化打包工具
	webpack = require('gulp-webpack'),
	// 命名模块
	named =require('vinyl-named'),
	//自动前缀模块
	autoprefixer = require('gulp-autoprefixer'),
	// 版本模块
	rev = require('gulp-rev'),
	// 版本控制模块
	revCollector = require('gulp-rev-collector'),

	// 监控模块
	watch = require('gulp-watch'),
	// 队列模块
	sequence = require('gulp-watch-sequence');


// webserver
gulp.task('webserver', function() {
	gulp.src('./src')
	.pipe(webserver({
      livereload: true,		//实时重载
      open: true,
      // 实现我们的Mock数据
      // 1.用户在浏览器地址里输入url地址，比如：http://localhost/queryList
      // 2.系统通过判断，获取到url的地址参数，即queryList
      // 3.通过url的地址参数queryList，去查找相对应的json文件，比如queryList.json
      // 4.读取eryList.json文件，并将这个文件的内容写到我们的浏览器上
      middleware: function(req, res, next){
      	var urlObj = url.parse(req.url, true),
      	method = req.method;
      	switch(urlObj.pathname){
      		case '/api/skill':
      			// 设置的头信息
      			res.setHeader('Content-Type', 'application/json');
	      		// 读取本地的json文件，并将读的信息内容设置编码，然后将内容转成data数据返回
	      		fs.readFile('mock/skill.json', 'utf-8', function(err, data){
	      			// res的全程是response，end是结束的意思，就是把我们的data数据渲染到浏览器上
	      			res.end(data);
	      			});
	      		return;

	      		case '/api/project':
	      		res.setHeader('Content-Type', 'application/json');
	      		fs.readFile('mock/project.json', 'utf-8', function(err, data){
	      			res.end(data);
	      			});
	      		return;

	      		case '/api/product':
	      		res.setHeader('Content-Type', 'application/json');
	      		fs.readFile('mock/product.json', 'utf-8', function(err, data){
	      			res.end(data);
	      			});
	      		return;

	      		case '/api/work':
	      		res.setHeader('Content-Type', 'application/json');
	      		fs.readFile('mock/work.json', 'utf-8', function(err, data){
	      			res.end(data);
	      			});
	      		return;

	      		default: ;
	      	}

      	next();		// 这行代码非常重要，next解决的是循环遍历操作

      } // end middleware

      }));
	});

// 将sass进行转换
gulp.task('sass', function(){
	return gulp.src('./src/styles/index.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./src/css'))
	});

gulp.task('autoprefix',["sass"], function(){
	return gulp.src('./src/styles/index.css')
	.pipe(autoprefixer({
		browsers: ['last 4 versions','Android >= 3.2'],
		cascade: true,
		remove:true 
		}))
	.pipe(gulp.dest('./src/css'))
	})


// ------------js模块化管理----------------
var jsFiles = ['src/scripts/index.js'];

// 打包js
gulp.task('packjs', function(){
	return gulp.src(jsFiles)
	.pipe(named())
	.pipe(webpack())
	// .pipe(uglify())
	.pipe(gulp.dest('./src/js'));
	})

gulp.task("watch",function () {
	gulp.watch("./src/styles/index.scss",["sass"]);
	gulp.watch("./src/scripts/index.js",["packjs"]);
})


gulp.task("default",["autoprefix","packjs","webserver","watch"],function () {
	console.log("ok")
	})


/******************************************************
 * 					生产环境
 ******************************************************/


// --------------版本控制------------------
var cssDistFiles = ['www/css/index.css'],
jsDistFiles = ['www/js/index.js'];

// css的ver控制
gulp.task('verCss',["copy-css"], function(){
	return gulp.src(cssDistFiles)
			   // 生成一个版本
			   .pipe(rev())
			   // 复制到指定目录
			   .pipe(gulp.dest('www/css'))
			   // 生成版本对应的映射关系
			   .pipe(rev.manifest())
			   // 将映射文件输出到指定的目录
			   .pipe(gulp.dest('www/ver/css'));
			   })

// js的ver控制
gulp.task('verJs',["copy-js"], function(){
	return gulp.src(jsDistFiles)
			   // 生成一个版本
			   .pipe(rev())
			   // 复制到指定目录
			   .pipe(gulp.dest('www/js'))
			   // 生成版本对应的映射关系
			   .pipe(rev.manifest())
			   // 将映射文件输出到指定的目录
			   .pipe(gulp.dest('www/ver/js'));
			   })

// 对html文件的版本内容的替换
gulp.task('html',["copy-index","verCss","verJs"], function(){
	return gulp.src(['www/ver/**/*.json', 'www/*.html'])
	.pipe(revCollector({replaceReved: true}))
	.pipe(gulp.dest('www'))
	})

// 设置监控
// gulp.task('watch', function(){
// 	gulp.watch('./src/**/*.html', ['copy-index']);
// 	var queue = sequence(300);
// 	watch('src/scripts/**/*.js', {
// 		name: 'JS',
// 		emitOnGlob: false,
// 	}, queue.getHandler('packjs', 'verJs', 'html'));

// 	watch('src/styles/**/*.*', {
// 		name: 'CSS',
// 		emitOnGlob: false,
// 	}, queue.getHandler('sass', 'verCss', 'html'));
// })

// 设置默认任务
gulp.task('end', ['copy-img','copy-index',"html"], function(){

	})


// 复制
gulp.task('copy-index', function(){
	return gulp.src('./src/**/**.html')
	.pipe(gulp.dest('./www'));
	})
gulp.task('copy-img', function(){
	return gulp.src('./src/images/**')
	.pipe(imagemin())
	.pipe(gulp.dest('./www/images'));
	})		 	   
gulp.task('copy-css', function(){
	return gulp.src('./src/css/*.css')
	.pipe(gulp.dest('./www/css/'));
	})		 	   
gulp.task('copy-js', function(){
	return gulp.src('./src/js/*.js')
	.pipe(gulp.dest('./www/js/'));
	})	
















