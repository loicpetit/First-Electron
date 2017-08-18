const gulp = require('gulp');
const ts = require('gulp-typescript');
const less = require('gulp-less');
const packager = require('electron-packager');
const install = require('gulp-install');
const del = require('del');

/*  CLEAN */

gulp.task('Clean:Build', function(){
    return del(['build']);
});

gulp.task('Clean:Package', ['Clean:build'], function(){
    return del(['package']);
});

gulp.task('Clean', ['Clean:Build', 'Clean:Package']);

/* BUILD */

gulp.task('Build:Copy', function(){
    return gulp.src(['src/main/**/*.html', 'src/main/package.json', '!src/main/node_modules/**'])
            .pipe(gulp.dest('build'))
});

gulp.task('Build:Less', function(){
    return gulp.src(['src/main/**/*.less', '!src/main/node_modules/**'])
            .pipe(less())
            .pipe(gulp.dest('build'));
});

gulp.task('Build:TypeScript', function(){
    var project = ts.createProject('tsconfig.json');
    return project.src()
        .pipe(project())
        .js.pipe(gulp.dest('build'));
});

gulp.task('Build:Install', ['Build:Copy'], function(){
    return gulp.src('build/package.json')
        .pipe(install());
})

gulp.task('Build', ['Build:Copy', 'Build:Install', 'Build:Less', 'Build:TypeScript']);

/*  PACKAGE TASKS */

gulp.task('Package', ['Build'], function(done){
    packager({
        dir: 'build',
        out: 'package'
    }, (err, appPaths) => {
        if(err){
            console.error('Error during packagiing: ', err);
        }
        done();
    });
});