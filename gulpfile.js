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
			del = require('del')

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
	// return src(`${srcPath}/sass/**/*.sass`)
	// 	.pipe(sourcemaps.init())
	// 	.pipe(sass())
	// 	.pipe(autoprefixer({
  //     cascade: false
  //   }))
	// 	.pipe(mincss({
  //     compatibility: "ie8", level: {
  //       1: {
  //         specialComments: 0,
  //         removeEmpty: true,
  //         removeWhitespace: true
  //       },
  //       2: {
  //         mergeMedia: true,
  //         removeEmpty: true,
  //         removeDuplicateFontRules: true,
  //         removeDuplicateMediaBlocks: true,
  //         removeDuplicateRules: true,
  //         removeUnusedAtRules: false
  //       }
  //     }
  //   }))
	// 	.pipe(concat('main.min.css'))
	// 	.pipe(sourcemaps.write('./maps'))
	// 	.pipe(dest(`${destPath}/css/`))
	// 	.pipe(browserSync.reload({
  //     stream: true
  //   }))
}

const scripts = () => {
	src(`${srcPath}/js/main.js`)
		.pipe(include())
		.pipe(sourcemaps.init())
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
		.pipe(include())
		.pipe(sourcemaps.init())
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
	// return src(`${srcPath}/js/main.js`)
	// 	.pipe(include())
	// 	.pipe(sourcemaps.init())
	// 	.pipe(concat('main.min.js'))
	// 	.pipe(uglify())
	// 	.pipe(sourcemaps.write('./maps'))
	// 	.pipe(dest(`${destPath}/js/`))
	// 	.pipe(browserSync.reload({
  //     stream: true
  //   }))
}

const watchFile = () => {
  browserSync.init({
    server: {
      baseDir: destPath
    },
  })

	watch([`${srcPath}/sass/**/*.sass`], series(style))
	watch([`${srcPath}/js/**/*.js`], series(scripts))
}

const clean = () => {
  return del(destPath)
}

exports.default = series(clean, style, scripts, watchFile)