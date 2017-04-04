"use strict";

var gulp = require("gulp"),
  tslint = require("gulp-tslint"),
  tsc = require("gulp-typescript"),
  size = require("gulp-size"),
  uglify = require("gulp-uglify"),
  sourcemaps = require('gulp-sourcemaps')

var tsProject = tsc.createProject('tsconfig.json');

gulp.task("tslint", () => {
  return tsProject.src()
    .pipe(tslint())
    .pipe(tslint.report());
})

gulp.task("build", ["tslint"], () => {
  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject()).js
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest('dist'));
});
