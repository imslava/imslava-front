const srcPath = './src',
			destPath = './app'

const {src, dest, parallel, series, watch} = require('gulp')

const browserSync = require('browser-sync').create()

const sass = require('gulp-sass')(require('sass')),
			concat = require('gulp-concat'),
			plumber = require('gulp-plumber'),
			autoprefixer = require('gulp-autoprefixer'),
			mincss = require('gulp-clean-css'),
			sourcemaps = require('gulp-sourcemaps'),
			notify = require('gulp-notify'),
			uglify = require('gulp-uglify-es').default,
			include = require('gulp-include'),
			del = require('del'),
			rename = require('gulp-rename')

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
}

const clean = () => {
  return del(destPath)
}

exports.default = series(clean, style, script, watchFile)
exports.minify = minify
exports.clean = clean