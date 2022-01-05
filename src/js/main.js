/*
 *
 *
 * MAIN
 *
 *
 */

$(function () {

	init()

	$('[data-fancybox]').fancybox({
		touch: false,
		autoFocus: false,
		backFocus: false,
		closeExisting: true
	})

})

/*
 *
 *
 * FUNCTION
 *
 *
 */

const init = () => {
	maskPhone()
}

const maskPhone = () => {

	let maskedElements = [],
		el = document.querySelectorAll('.masked')

	if (el.length > 0) {
		const mask = {
			mask: '+7 (000) 000-00-00'
		}
		el.forEach(item => {
			maskedElements.push(new IMask(item, mask))
		});
	}

	$('.masked').click(function () {
		if ($(this).val() == '') $(this).val('+7 ')
	})

}