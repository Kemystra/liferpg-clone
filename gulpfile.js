const { src, dest, parallel, series, watch } = require("gulp");
const stream = require('stream');
const source = require("vinyl-source-stream");
const rename = require("gulp-rename");

const browserify = require("browserify");
const { transformFileSync } = require("@babel/core");

const dartSass = require("sass");
const gulpSass = require("gulp-sass");
const sassPlugin = gulpSass(dartSass);

// Params specific to this project
const buildFolder = "./build";

// Gulp always passes a callback function as 1st argument in a task
// This can be used to mark end of task.

function babelTransform(fileContent) {
    // objectMode must be True
    // Gulp work with Vinyl stream, which are JS objects
    // Normal NodeJS streams only allow strings as data
    var compiledCodeStream = new stream.Transform({ objectMode: true });

    compiledCodeStream._transform = (chunk, encoding, callback) => {
        var compiledCode = transformFileSync(fileContent).code;

        compiledCodeStream.push(compiledCode);
        callback();
    };

    return compiledCodeStream;
}

function jsx(cb) {
    
    return browserify("./src/jsx/main.jsx")
        .transform(babelTransform)
        .bundle()
        .pipe(source("main.js"))
        .pipe(dest(buildFolder));
}

function cleanJSX(cb) {
    var b = browserify("./src/jsx/main.jsx");
    b.plugin("tinyify");

    return b.transform(babelTransform)
        .bundle()
        .pipe(source("main.js"))
        .pipe(dest(buildFolder));
}

function scss(cb) {

    return src("./src/scss/*.scss")
        .pipe(sassPlugin.sync().on("error", sassPlugin.logError))
        .pipe(rename("style.css"))
        .pipe(dest(buildFolder));
}

exports.watch = parallel(
    function watchJSX() { watch("./src/scss/*.scss", scss) },
    function watchSCSS() { watch("./src/jsx/*.jsx", jsx) } 
    );
exports.dev = parallel(scss, jsx);
exports.build = cleanJSX;