const gulp = require('gulp');
const ts = require('gulp-typescript');
const less = require('gulp-less');
const packager = require('electron-packager');
const install = require('gulp-install');
const del = require('del');

/*  CLEAN */

gulp.task('Clean:build', function(){
    return del(['build']);
});

gulp.task('Clean:package', ['Clean:build'], function(){
    return del(['package']);
});

gulp.task('Clean', ['Clean:build', 'Clean:package']);

/* BUILD */

gulp.task('Copy', function(){
    return gulp.src(['src/main/**/*.html', 'src/main/package.json', '!src/main/node_modules/**'])
            .pipe(gulp.dest('build'))
});

gulp.task('Less', function(){
    return gulp.src(['src/main/**/*.less', '!src/main/node_modules/**'])
            .pipe(less())
            .pipe(gulp.dest('build'));
});

gulp.task('TypeScript', function(){
    var project = ts.createProject('tsconfig.json');
    return project.src()
        .pipe(project())
        .js.pipe(gulp.dest('build'));
});

gulp.task('Install', ['Copy'], function(){
    return gulp.src('build/package.json')
        .pipe(install());
})

gulp.task('Build', ['Copy', 'Install', 'Less', 'TypeScript']);

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