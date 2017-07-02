const gulp= require('gulp'),
	 sass= require('gulp-sass'),
	 autoprefixer= require('gulp-autoprefixer');
    pug= require('gulp-pug');

	 gulp.task('sass', ()=>
	 	gulp.src('./recourses/css/*.scss')
	 		.pipe(sass({
	 			outputStyle: 'nested'
	 		}))
	 		.pipe(autoprefixer({
 				versions: ['last 2 browers']
 			}))
	 		.pipe(gulp.dest('./recourses/css'))
	 );


     gulp.task('pug',()=>
        gulp.src('./pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(''))
    );

    gulp.task('default',()=>{
         gulp.watch('./recourses/css/*.scss',['sass']);
        gulp.watch('./pug/*.pug',['pug']);
    });