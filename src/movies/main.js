import {Displayer} from './displayer.js'
import cardArray from './data.js'

/* eslint-disable */
const d1 = new Displayer(document.querySelector('.d1'),cardArray)
/* eslint-enable */

/* global XMLHttpRequest */
var xhttp = new XMLHttpRequest()
xhttp.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    console.log(JSON.parse(this.response))
    const seriesArray = JSON.parse(this.response).map((value) => {
      return {
        title: value.name,
        imageurl: value.image.medium,
        content: value.summary,
        fullcontent: value.summary,
        category: value.genres
      }
    })
    /* eslint-disable */
    const d2 = new Displayer(document.querySelector('.d2'),seriesArray)
    /* eslint-enable */
  }
}
xhttp.open('GET', 'http://api.tvmaze.com/shows?page=1', true)
xhttp.send()
