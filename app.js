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
  }&amp;autoplay=1&amp;rel=0&amp;controls=1&amp;showinfo=0"`
  return wire(track)`
		<a class="Track" href="${href}" data-fancybox="gallery">
			<video muted autoplay loop class="lazyload" src="${track.video}"></video>
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
