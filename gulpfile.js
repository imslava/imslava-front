const srcPath = './src',
			destPath = './app'

const {src, dest, parallel, series, watch} = require('gulp')

const browserSync = require('browser-sync').create(),
			sass = require('gulp-sass')(require('sass')),
			concat = require('gulp-concat'),
			plumber = require('gulp-plumber'),
			autoprefixer = require('gulp-autoprefixer'),
			mincss = require('gulp-clean-css'),
			sourcemaps = require('gulp-sourcemaps'),
			notify = require('gulp-notify'),
			uglify = require('gulp-uglify-es').default,
			include = require('gulp-include'),
			del = require('del'),
			rename = require('gulp-rename'),
			nunjucksRender = require('gulp-nunjucks-render'),
			replace = require('gulp-replace'),
			cryptoRandomString = require('crypto-random-string'),
			generateHash = cryptoRandomString({ length: 8 }),
			zip = require('gulp-zip')

const style = () => {
	return src(`${srcPath}/sass/**/*.sass`)
		.pipe(sourcemaps.init())
		.pipe(plumber({
			errorHandler: notify.onError(error => ({
				title: 'SASS',
				message: error.message
			}))
		}))
		.pipe(sass())
		.pipe(autoprefixer({
      cascade: false
    }))
		.pipe(concat('main.css'))
		.pipe(sourcemaps.write('./maps'))
		.pipe(dest(`${destPath}/css/`))
		.pipe(browserSync.reload({
      stream: true
    }))
}

const script = () => {
	src(`${srcPath}/js/main.js`)
		.pipe(sourcemaps.init())
		.pipe(include())
		.pipe(plumber({
			errorHandler: notify.onError(error => ({
				title: 'JavaScript',
				message: error.message
			}))
		}))
		.pipe(sourcemaps.write('./maps'))
		.pipe(dest(`${destPath}/js/`))
		.pipe(browserSync.reload({
      stream: true
    }))

	return src(`${srcPath}/js/vendor.js`)
		.pipe(sourcemaps.init())
		.pipe(include())
		.pipe(plumber({
			errorHandler: notify.onError(error => ({
				title: 'JavaScript',
				message: error.message
			}))
		}))
		.pipe(sourcemaps.write('./maps'))
		.pipe(dest(`${destPath}/js/`))
		.pipe(browserSync.reload({
      stream: true
    }))
}

const html = () => {
  return src(`${srcPath}/pages/*.html`)
    .pipe(nunjucksRender({
      path: [`${srcPath}/pages/`]
    }))
    .pipe(dest(`${destPath}/`))
		.pipe(browserSync.reload({
      stream: true
    }))
}

const minify = () => {
	src(`${srcPath}/js/main.js`)
		.pipe(include())
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(dest(`${destPath}/js/`))

	src(`${srcPath}/js/vendor.js`)
		.pipe(include())
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(dest(`${destPath}/js/`))

	return src(`${srcPath}/sass/**/*.sass`)
		.pipe(sass())
		.pipe(autoprefixer({
      cascade: false
    }))
		.pipe(mincss({
      compatibility: "ie8", level: {
        1: {
          specialComments: 0,
          removeEmpty: true,
          removeWhitespace: true
        },
        2: {
          mergeMedia: true,
          removeEmpty: true,
          removeDuplicateFontRules: true,
          removeDuplicateMediaBlocks: true,
          removeDuplicateRules: true,
          removeUnusedAtRules: false
        }
      }
    }))
		.pipe(concat('main.min.css'))
		.pipe(dest(`${destPath}/css/`))
}

const watchFile = () => {
  browserSync.init({
    server: {
      baseDir: destPath
    },
  })

	watch([`${srcPath}/sass/**/*.sass`], style)
	watch([`${srcPath}/js/**/*.js`], script)
	watch([`${srcPath}/pages/**/*.html`], html)
}

const clean = () => {
  return del(destPath)
}

const hash = () => {
	return src(`${destPath}/*.html`)
		.pipe(replace('?v=hash', '?v=' + generateHash))
		.pipe(dest(destPath))
}

const suffix = () => {
	return src(`${destPath}/*.html`)
		.pipe(replace('vendor.js', 'vendor.min.js'))
		.pipe(replace('main.js', 'main.min.js'))
		.pipe(replace('main.css', 'main.min.css'))
		.pipe(dest(destPath))
}

const archive = () => {
	let now = new Date();
	let year = now.getFullYear().toString().padStart(2, '0');
	let month = (now.getMonth() + 1).toString().padStart(2, '0');
	let day = now.getDate().toString().padStart(2, '0');
	let hours = now.getHours().toString().padStart(2, '0');
	let minutes = now.getMinutes().toString().padStart(2, '0');

	return src(`${destPath}/**/*.*`)
		.pipe(zip(`build_${year}-${month}-${day}_${hours}-${minutes}.zip`))
		.pipe(dest('zip'))
}

exports.default = series(clean, html, style, script, watchFile)
exports.build = series(clean, html, style, script, hash)
exports.minify = series(minify, suffix)
exports.clean = clean

exports.deploy = series(exports.minify, archive)