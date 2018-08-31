/* global $, data */

const {hyper, Component} = hyperHTML

class VideoGrid extends Component {
	get defaultState() {
		return {
			releases: data.releases
		}
	}
	render() {
		return this.html`
			${this.state.releases.map(
				(release, index) => `
				<div class="Container">
					<div class="flex flex-wrap">
				${release
					.map(
						track => `
					<a class="Track" href="https://www.youtube.com/watch?v=${
						track.youtubeId
					}&amp;autoplay=1&amp;rel=0&amp;controls=1&amp;showinfo=0" data-fancybox="gallery" data-caption="${
							track.trackNumber
						} ${track.title}">

						<!-- <img class="lazyload" data-src="${track.gif}" alt=""> -->
						<video muted autoplay loop class="lazyload" data-src="${track.video}"></video>

						<h2 class="font-normal">
							<span class="opacity-50">${track.trackNumber}</span> ${track.title}
						</h2>
						<svg class="PlayButton" viewBox="0 0 200 200" alt="Play video">
							<circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="#fff" />
							<polygon points="70, 55 70, 145 145, 100" fill="#fff" />
						</svg>
					</a>
				`
					)
					.join('')}</div>
				</div>
			`
			)}
		`
	}
}

function init() {
	hyper(document.querySelector('.VideoGrid'))`${new VideoGrid()}`

	$('.VideoGrid [data-fancybox]').fancybox({
		animationDuration: 200,
		hash: false,
		buttons: [
			'close'
		],
		infobar: false,
		caption: function(instance, item) {
			var caption = this.querySelector('h2').outerHTML
			var count = '<span data-fancybox-index></span> of <span data-fancybox-count></span>'
			return count + caption
		}
	})

	$('.Order-gallery > a').fancybox({
    animationDuration: 200,
		type: 'image',
		hash: false,
		buttons: ['zoom', 'close']
	})
}

document.addEventListener('DOMContentLoaded', init)
