// import data from './data.js'
// console.log({data})

const {hyper, Component} = hyperHTML
// const {bind: hyper, wire} = hyperHTML

class VideoGrid extends Component {
  get defaultState() {
    return {
      tracks: data.tracks,
      releases: data.releases
    }
  }
  render() {
    var fallback = 'https://media.giphy.com/media/X6kSlteTQtIdWeYO6Y/giphy.gif'

    return this.html`
			${this.state.releases.map(
        (release, index) => `
				<div class="Release">
					<div class="flex flex-wrap">
				${release
          .map(
            track => `
					<a class="Track" href="https://www.youtube.com/watch?v=${
            track.youtubeId
          }&amp;autoplay=1&amp;rel=0&amp;controls=1&amp;showinfo=0" data-fancybox="gallery" data-caption="${
              track.trackNumber
            } ${track.title}">
						<img src="${track.gif ? track.gif : fallback}" alt="${track.title}">
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

  $('.Order-gallery > a').fancybox({
    type: 'image',
    hash: false,
    buttons: ['zoom', 'close']
  })

  $('.VideoGrid [data-fancybox]').fancybox({
    animationDuration: 200,
    hash: 'video',
    buttons: [
      // "zoom",
      // "share",
      // "fullScreen",
      // "download",
      // "thumbs",
      'close'
    ],
    infobar: false,
    caption: function(instance, item) {
      var caption = this.querySelector('h2').outerHTML
      var count = '<span data-fancybox-index></span> of <span data-fancybox-count></span>'
      return count + caption
    }
  })

  var $overlay = $('.Order')
  var $overlayButtons = $('.js-toggleOrder')

  function toggleOverlay() {
    $overlay.toggleClass('is-open')
    $('body').toggleClass('is-fadedOut')
  }

  function closeOverlay() {
    $overlay.removeClass('is-open')
    $('body').removeClass('is-fadedOut')
  }

  $overlayButtons.on('click', toggleOverlay)
  $('.Overlay').on('click', closeOverlay)

  $('body').keydown(event => {
    if (event.key === 'Escape' && $overlay.hasClass('is-open')) {
      closeOverlay()
    }
  })
}

document.addEventListener('DOMContentLoaded', init)
