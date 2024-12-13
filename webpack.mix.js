const mix = require('laravel-mix');
const path = require("path");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    resolve: {
        alias: {
            $: 'jquery/dist/jquery.min.js',
            jQuery: 'jquery/dist/jquery.min.js',
            jquery: 'jquery/dist/jquery.min.js',
            '@': path.resolve(__dirname, 'resources/assets/js')
        }
    }
}).autoload({
    jquery: ['$', 'jQuery', 'jquery', 'window.jQuery']
    // Add support of older browsers. Browser list parsed from package.json
});

let fs = require('fs');

let getFiles = function (dir) {
    // get all 'files' in this directory
    // filter directories
    return fs.readdirSync(dir).filter(file => {
        return fs.statSync(`${dir}/${file}`).isFile();
    });
};

const loadDir = function (dir, output) {
    getFiles(dir).forEach(function (filepath) {
        mix.js(dir + '/' + filepath, output);
    });
};

// load scripts by directory
loadDir('resources/js', 'public/js');

mix.react()
    .sass('resources/sass/app.scss', 'public/css')
    .sass('resources/sass/home.scss', 'public/css');
