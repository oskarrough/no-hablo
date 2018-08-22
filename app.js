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
					<a href="https://www.youtube.com/watch?v=${item.youtubeId}&amp;autoplay=1&amp;rel=0&amp;controls=0&amp;showinfo=0"
						data-fancybox="gallery"
						data-caption="${item.trackNumber} ${item.title}">
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

// Alternative method: using events
// Name of event should start from  `mfp` and the first letter should be uppercase.
// e.g. 'open' becomes 'mfpOpen', 'beforeOpen' becomes 'mfpBeforeOpen'.
	// $('.VideoGrid > a').on('mfpOpen', function(event, params) {
	// 	var instance = $.magnificPopup.instance
	// 	var title = event.currentTarget.outerText
	// 	console.log({title})
	// })

	// $('.VideoGrid > a').magnificPopup({
	// 	type: 'iframe',

	// 	gallery: {
	// 		enabled: true,
	// 		titleSrc: 'title'
	// 	}
	// })
}

document.addEventListener('DOMContentLoaded', init)

