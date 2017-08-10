const gulp = require('gulp');
const ts = require('gulp-typescript');
const less = require('gulp-less');
const packager = require('electron-packager');

/* DEFAULT TASKS */

gulp.task('Copy', function(){
    return gulp.src(['src/main/**/*.html', 'src/main/package.json'])
            .pipe(gulp.dest('build'))
});

gulp.task('Less', function(){
    return gulp.src('src/main/**/*.less')
            .pipe(less())
            .pipe(gulp.dest('build'));
});

gulp.task('TypeScript', function(){
    var project = ts.createProject('tsconfig.json');
    return project.src()
        .pipe(project())
        .js.pipe(gulp.dest('build'));
});

gulp.task('default', ['Copy', 'Less', 'TypeScript']);

/*  PACKAGE TASKS */

gulp.task('Package', ['default'], function(){
    packager({
        dir: 'build',
        out: 'package'
    }, (err, appPaths) => {
        if(err){
            console.error('Error during packagiing: ', err);
        }
    });
});