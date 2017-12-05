export class Displayer {
  constructor (node, data) {
    console.log(node)
    this.node = node
    this.data = data

    this.inflateHTML()
  }

  inflateHTML () {
    const html = (`<div class="Gallery__arrows-container">
                      <button class="Gallery__button Gallery__button-left Gallery__button-left--disabled"></button>
                      <button class="Gallery__button Gallery__button-right"></button>
                  </div>
                  <div class="Gallery__points-container">
                  </div>
                  <div class="Gallery__images-container">
                  </div>`)
    this.galleryreference.innerHTML = html
  }
}
