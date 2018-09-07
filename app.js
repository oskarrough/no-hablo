/* global $, data */

const {hyper, wire} = hyperHTML

const tracks = [].concat(...data.releases)
const realTracks = tracks.filter(track => track.youtubeId)

function List(items) {
	return wire(items)`${items.map(ReleaseTemplate)}`
}

function ReleaseTemplate(release) {
	return wire(release)`
		<div class="flex flex-wrap">
			${release.map(TrackTemplate)}
		</div>`
}

function TrackTemplate(track) {
	const youtubeLink = `https://www.youtube.com/watch?v=${
		track.youtubeId
	}&autoplay=1&rel=0&controls=1&list=PLGXSVM0qM_LqHgm0N99p4g9z1G6GCEu2z`

	const thumb = {
		hq: `http://img.youtube.com/vi/${track.youtubeId}/hqdefault.jpg`,
		maxres: `https://img.youtube.com/vi/${track.youtubeId}/maxresdefault.jpg`,
		webp: `https://img.youtube.com/vi_webp/${track.youtubeId}/maxresdefault.webp`
	}

	const giphy = {
		page: `https://giphy.com/gifs/${track.giphyId}/media`,
		small: `https://media.giphy.com/media/${track.giphyId}/200w_d.gif`,
		social: `https://media.giphy.com/media/${track.giphyId}/giphy.gif`,
		video: `https://media.giphy.com/media/${track.giphyId}/giphy.mp4`
	}

	// Fallback for tracks without video.
	if (!track.youtubeId) {
		return wire(track)`
			<div class="Track no-focus">
				<h2>${track.title}</h2>
			</div>
		`
	}

	return wire(track)`
		<a class="Track Ratio" href="${youtubeLink}" data-fancybox="gallery">
			${
				track.giphyId
					? wire()`<video playsinline muted autoplay loop class="lazyload" data-src="${
							giphy.video
					  }"></video>`
					: wire()`<img class="lazyload" data-src="${thumb.maxres}" alt="${track.title}">`
			}
			<h2>${track.title}</h2>
			<svg class="PlayButton" viewBox="0 0 200 200" alt="Play video">
				<circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="antiquewhite" />
				<polygon points="70, 55 70, 145 145, 100" fill="antiquewhite" />
			</svg>
		</a>`
}

function init() {
	// Template with video grid. Also see data.js file.
	// hyper(document.querySelector('.VideoGrid'))`${new List(data.releases)}`
	const gridContainer = document.querySelector('.VideoGrid')
	hyper(gridContainer)`${new ReleaseTemplate(realTracks)}`

	// Firefox doesn't mute videos when they are added dynamically (via js), so…
	for (let video of gridContainer.querySelectorAll('video')) {
		video.muted = true
	}

	// Video gallery.
	$('.VideoGrid [data-fancybox]').fancybox({
		animationDuration: 200,
		hash: false,
		buttons: ['close'],
		infobar: false,
		caption: function(instance, item) {
			var caption = this.querySelector('h2').outerHTML
			var count = '<span data-fancybox-index></span> of <span data-fancybox-count></span>'
			return count + caption
		},
		i18n: {
			en: {
				ERROR: 'COMING SOON'
			}
		}
	})

	// Image gallery.
	$('.Order-gallery > a').fancybox({
		animationDuration: 200,
		type: 'image',
		hash: false,
		buttons: ['zoom', 'close']
	})

	// Smooth scrolling.
	$('.js-scroll').on('click', function(event) {
		event.preventDefault()
		document.querySelector($(this).attr('href')).scrollIntoView({
			behavior: 'smooth'
		})
	})
}

document.addEventListener('DOMContentLoaded', init)
