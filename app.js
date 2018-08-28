// import data from './data.js'
console.log({data})

const {hyper, Component} = hyperHTML
// const {bind: hyper, wire} = hyperHTML

class VideoGrid extends Component {
  get defaultState() {
    return {tracks: data.tracks}
  }
  render() {
    var fallback = 'https://media.giphy.com/media/X6kSlteTQtIdWeYO6Y/giphy.gif'
    return this.html`
			${this.state.tracks.map(
        (item, index) => `
				<a href="https://www.youtube.com/watch?v=${
          item.youtubeId
        }&amp;autoplay=1&amp;rel=0&amp;controls=1&amp;showinfo=0" data-fancybox="gallery" data-caption="${
          item.trackNumber
        } ${item.title}">
					<img src="${item.gif ? item.gif : fallback}" alt="${item.title}">
					<h2 class="font-normal">
						<span class="opacity-50">${item.trackNumber}</span> ${item.title}
					</h2>
					<svg class="PlayButton" viewBox="0 0 200 200" alt="Play video">
						<circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="#fff" />
						<polygon points="70, 55 70, 145 145, 100" fill="#fff" />
					</svg>
				</a>
			`
      )}
		`
  }
}

function init() {
  hyper(document.querySelector('.VideoGrid'))`${new VideoGrid()}`

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
  $overlayButtons.on('click', () => {
    $overlay.toggleClass('is-open')
  })
  $('body').keydown((event) => {
    if (event.key === 'Escape' && $overlay.hasClass('is-open')) {
      $overlay.removeClass('is-open')
    }
  })
}

document.addEventListener('DOMContentLoaded', init)
