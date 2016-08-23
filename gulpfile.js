var gulp = require('gulp');
var uglify=require("gulp-uglify");
var concat=require("gulp-concat");
var nodemon = require('gulp-nodemon');
var autoprefixer=require('gulp-autoprefixer')
var plumber=require("gulp-plumber");
var sourcemaps=require("gulp-sourcemaps")
var sass=require("gulp-sass")


gulp.task("styles",function(){
	return gulp.src("public/styles/styles.scss")
			.pipe(plumber(function(err){
				console.log(err);
				this.emit("end");
			}))
			.pipe(sourcemaps.init())
			.pipe(autoprefixer())
			.pipe(sass({outputStyle:"compressed"}))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest("public/dist"))
})		


gulp.task("scripts",function(){
	return gulp.src(["public/scripts/socket.js","public/scripts/*.js"])
			   .pipe(concat("main.js"))
			   .pipe(gulp.dest("public/dist"))
})

gulp.task('start', function () {
     
  nodemon({
    script: 'app.js'
  , ext: 'js html scss'
  , env: { 'NODE_ENV': 'development' },
  tasks:["styles"]
  })    
});