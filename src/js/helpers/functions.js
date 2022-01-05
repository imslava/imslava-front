/*
 *
 *
 * FUNCTIONS
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

$('.js-scroll').on('click', function() {
	let id = $(this).attr('href')
	$('html, body').animate({ scrollTop: $(id).offset().top }, 1500)
})