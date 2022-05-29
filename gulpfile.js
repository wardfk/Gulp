
const {create} = require("browser-sync");
const {series, parallel, src, dest, watch} = require("gulp");
const sass = require("gulp-sass") (require("node-sass"));
const htmlmin = require("gulp-htmlmin");
const inlinecss = require("gulp-inline-css");
const browserSync = require("browser-sync").create();


function compile(){
    return src("scss/*.*", {sourcemaps:true})
    .pipe(sass())
    .pipe(sass({
        outputStyle:"compressed"
    }))
    .pipe(dest("css", {sourcemaps:"."}))
}

function cssLine(){
    return src("*.css")
    .pipe(inlinecss())
    .pipe(dest("mailing"))
}

function htmlMin(){
    return src("*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(dest("destino"))
}

function servidor(cb) {
    browserSync.init({
        server: {
            baseDir : "./"
        }
    });
    cb();
}

function abrirBrowser(cb) {
    browserSync.reload();
    cb();
}

function vigilar () {
    watch("scss/*.scss", series(abrirBrowser, compile));
    watch("/*.html", abrirBrowser)
}

exports.compile = compile;
exports.cssLine = cssLine;
exports.htmlmin = htmlMin;
exports.default = series(servidor, abrirBrowser, vigilar);
exports.servider = servidor;
