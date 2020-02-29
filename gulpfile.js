const { src, dest, watch } = require("gulp");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");


function convert_sass() {
    return src('src/scss/*.scss').pipe(sass()).pipe(dest('src/css')).pipe(browserSync.stream());
}

function serve() {
    browserSync.init({
        server: "./src",
        online: true
    });
    
    watch('src/scss/*.scss').on("change", convert_sass);
    watch(['src/*.html', 'src/*.js']).on("change", browserSync.reload);
}

exports.convert_sass = convert_sass;
exports.default = serve;