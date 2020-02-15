const { src, dest, watch, series} = require("gulp");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");


function convert_sass() {
    return src('src/scss/*.scss').pipe(sass()).pipe(dest('src/css')) .pipe(browserSync.stream());;
}

function serve() {
    browserSync.init({
        server: "./src"
    });

    watch('src/scss/*.scss', series(convert_sass));
    watch(['src/*.html', 'src/*.js']).on("change", browserSync.reload);
}

exports.convert_sass = convert_sass;
exports.default = serve;