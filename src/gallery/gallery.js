export class Gallery {
  constructor (galleryreference, imagesArray) {
    // Inflating data
    this.imagesArray = imagesArray
    this.galleryreference = galleryreference
    this.inflateHTML(galleryreference)
    // After inflated, get image container
    this.imagecontainer = this.galleryreference.querySelector('.Gallery__images-container')
    this.pointscontainer = this.galleryreference.querySelector('.Gallery__points-container')
    this.arrowscontainer = this.galleryreference.querySelector('.Gallery__arrows-container')
    this.arrowleft = this.arrowscontainer.querySelector('.Gallery__button-left')
    this.arrowright = this.arrowscontainer.querySelector('.Gallery__button-right')
    this.currentIndex = 0
    this.imagecount = imagesArray.length
    this.setImages()
    this.images = this.imagecontainer.querySelectorAll('.Gallery__image-item')
    this.items = this.pointscontainer.querySelectorAll('.Gallery__button-point')
    this.setEvents()
  }

  inflateHTML () {
    console.log('Inflating gallery')
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

  setImages () {
    var htmlimagecontainer = ''
    var htmlpointscontainer = ''
    for (let i = 0; i < this.imagecount; i++) {
      if (i === 0) {
        htmlimagecontainer += `<img class="Gallery__image-item Gallery__image-item--selected" src=${this.imagesArray[i]}></img>`
        htmlpointscontainer += '<button class="Gallery__button Gallery__button-point Gallery__button-point--selected"></button>'
      } else {
        htmlimagecontainer += `<img class="Gallery__image-item" src=${this.imagesArray[i]}></img>`
        htmlpointscontainer += '<button class="Gallery__button Gallery__button-point"></button>'
      }
    }
    this.pointscontainer.innerHTML = htmlpointscontainer
    this.imagecontainer.innerHTML = htmlimagecontainer
  }

  setEvents () {
    // Dot-events
    const items = this.pointscontainer.querySelectorAll('.Gallery__button-point')
    items.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.changeState(index)
      })
    })
    // Arrows-events
    this.arrowleft.addEventListener('click', () => {
      let index = this.currentIndex - 1
      this.changeState(index)
    })
    this.arrowright.addEventListener('click', () => {
      let index = this.currentIndex + 1
      this.changeState(index)
    })
    // Keys-Events
    this.galleryreference.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        let index = this.currentIndex - 1
        this.changeState(index)
      } else if (event.key === 'ArrowRight') {
        let index = this.currentIndex + 1
        this.changeState(index)
      }
    })
  }

  changeState (index) {
    this.checkArrows(index)
    this.enableNewdisablePrevious(index, this.currentIndex)
  }

  checkArrows (index) {
    if (index <= 0) {
      this.arrowleft.classList.add('Gallery__button-left--disabled')
    } else {
      this.arrowleft.classList.remove('Gallery__button-left--disabled')
    }
    if (index >= this.imagecount - 1) {
      this.arrowright.classList.add('Gallery__button-right--disabled')
    } else {
      this.arrowright.classList.remove('Gallery__button-right--disabled')
    }
  }

  enableNewdisablePrevious (indexnew, currentIndex) {
    const isTheSamePrevious = currentIndex === indexnew
    const isLowerThanZero = indexnew < 0
    const isGreaterThanCount = indexnew > this.imagecount - 1
    if (!isTheSamePrevious && !isLowerThanZero && !isGreaterThanCount) {
      this.items[currentIndex].classList.remove('Gallery__button-point--selected')
      this.items[indexnew].classList.add('Gallery__button-point--selected')
      this.images[currentIndex].classList.remove('Gallery__image-item--selected')
      this.images[indexnew].classList.add('Gallery__image-item--selected')
      this.items[indexnew].focus()
    }
    this.currentIndex = indexnew
    if (isGreaterThanCount) {
      this.currentIndex = this.imagecount - 1
    }
    if (isLowerThanZero) {
      this.currentIndex = 0
    }
  }
}
