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
				<article>
					<video-placeholder>
						<button is="video-placeholder-front">
							<img src="${item.gif ? item.gif : fallback}" alt="${item.title}">
							<h2>
								<span class="opacity-50">${item.trackNumber}</span> ${item.title}
							</h2>
							<svg class="PlayButton" viewBox="0 0 200 200" alt="Play video">
								<circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="#fff" />
								<polygon points="70, 55 70, 145 145, 100" fill="#fff" />
							</svg>
						</button>
						<template>
							<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${
                item.youtubeId
              }?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
						</template>
					</video-placeholder>
				</article>
			`
      )}
		`
  }
}

function init() {
  hyper(document.querySelector('.VideoGrid'))`${new VideoGrid()}`
}

document.addEventListener('DOMContentLoaded', init)
