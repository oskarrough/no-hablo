/* global $, data */

const {hyper, wire} = hyperHTML

function List(items) {
	return wire(items)`
		<div class="Container">
			${items.map(ReleaseTemplate)}
		</div>`
}

function ReleaseTemplate(release) {
	return wire(release)`
		<div class="flex flex-wrap">
			${release.map(TrackTemplate)}
		</div>`
}

function TrackTemplate(track) {
	const href = `https://www.youtube.com/watch?v=${
		track.youtubeId
	}&autoplay=1&rel=0&controls=1&showinfo=0&list=PLGXSVM0qM_LqHgm0N99p4g9z1G6GCEu2z"`

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

	return wire(track)`
		<a class="Track" href="${href}" data-fancybox="gallery">
			${
				track.giphyId
					? wire()`<video muted autoplay loop class="lazyload" src="${giphy.video}"></video>`
					: wire()`<img src="${thumb.maxres}" alt="${track.title}">`
			}
			<h2>
				<span class="opacity-50">${track.trackNumber}</span> ${track.title}
			</h2>
			<svg class="PlayButton" viewBox="0 0 200 200" alt="Play video">
				<circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="antiquewhite" />
				<polygon points="70, 55 70, 145 145, 100" fill="antiquewhite" />
			</svg>
		</a>`
}

function init() {
	// Template with video grid. Also see data.js file.
	hyper(document.querySelector('.VideoGrid'))`${new List(data.releases)}`

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
