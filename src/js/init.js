(function($) {

	skel.init({
		reset: 'full',
		breakpoints: {
				global: {
					range: '*',
					href: 'css/main.css',
					containers: 1400,
					grid: {
						gutters: {
							vertical: '4em',
							horizontal: 0
						}
					}
				},
				scaled: {
					range: '-980',
					href: 'css/main-scaled.css',
					containers: '90%',
					grid: {
						collapse: 1
					}
				}
		},
		plugins: {
			layers: {
					config: {
						transform: true
					},
					navPanel: {
						animation: 'pushX',
						breakpoints: 'scaled',
						clickToHide: true,
						height: '100%',
						hidden: true,
						html: '<div data-action="moveElement" style="text-align: center;" data-args="nav"><img style="width: 100px; padding-top: 20px;" src="assets/WEM-text-bigger.png" alt="company-logo"></div>',
						orientation: 'vertical',
						position: 'top-right',
						side: 'right',
						width: 250
					},
					navButton: {
						breakpoints: 'scaled',
						height: '4em',
						html: '<label data-action="toggleLayer" data-args="navPanel" for="check"><input type="checkbox" id="check"/>       <span></span>      <span></span>      <span></span>    </label>',
						position: 'top-right',
						side: 'top',
						width: '6em'
					}

			}
		}
	});

	$(function() {
	});

})(jQuery);