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
    this.previousindex = 0
    this.imagecount = imagesArray.length
    this.setImages()
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
    for (let i = 0; i < this.imagecount; i++) {
      if (i === 0) {
        this.imagecontainer.innerHTML = this.imagecontainer.innerHTML + '<img class="Gallery__image-item Gallery__image-item--selected" src=' + this.imagesArray[i] + '></img>'
        this.pointscontainer.innerHTML = this.pointscontainer.innerHTML + '<button class="Gallery__button Gallery__button-point Gallery__button-point--selected"></button>'
      } else {
        this.imagecontainer.innerHTML = this.imagecontainer.innerHTML + '<img class="Gallery__image-item" src=' + this.imagesArray[i] + '></img>'
        this.pointscontainer.innerHTML = this.pointscontainer.innerHTML + '<button class="Gallery__button Gallery__button-point"></button>'
      }
    }
  }

  setEvents () {
    // Dot-events
    const items = this.pointscontainer.querySelectorAll('.Gallery__button-point')
    items.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.enableNewdisablePrevious(index)
        this.previousindex = index
      })
    })
    const arrowleft = this.arrowscontainer.querySelector('.Gallery__button-left')
    const arrowright = this.arrowscontainer.querySelector('.Gallery__button-right')

    // Arrows-events
    arrowleft.addEventListener('click', () => {
      let index = this.previousindex - 1
      const isTheSamePrevious = this.previousindex === index
      const isLowerThanZero = index < 0
      const isGreaterThanCount = index > this.imagecount - 1
      arrowright.classList.remove('Gallery__button-right--disabled')
      if (index <= 0) {
        arrowleft.classList.add('Gallery__button-left--disabled')
      } else {
        arrowleft.classList.remove('Gallery__button-left--disabled')
      }
      if (!isTheSamePrevious && !isLowerThanZero && !isGreaterThanCount) {
        this.enableNewdisablePrevious(index)
      }
      this.previousindex = index
    })

    arrowright.addEventListener('click', () => {
      let index = this.previousindex + 1
      const isTheSamePrevious = this.previousindex === index
      const isLowerThanZero = index < 0
      const isGreaterThanCount = index > this.imagecount - 1
      arrowleft.classList.remove('Gallery__button-left--disabled')
      if (index >= this.imagecount - 1) {
        arrowright.classList.add('Gallery__button-right--disabled')
      } else {
        arrowright.classList.remove('Gallery__button-right--disabled')
      }
      if (!isTheSamePrevious && !isLowerThanZero && !isGreaterThanCount) {
        this.enableNewdisablePrevious(index)
      }
      this.previousindex = index
    })

    this.galleryreference.addEventListener('keydown', (event) => {
      console.log('teclas')
      if (event.keyCode === 37) {
        let index = this.previousindex - 1
        const isTheSamePrevious = this.previousindex === index
        const isLowerThanZero = index < 0
        const isGreaterThanCount = index > this.imagecount - 1
        arrowright.classList.remove('Gallery__button-right--disabled')
        if (index <= 1) {
          arrowleft.classList.add('Gallery__button-left--disabled')
        } else {
          arrowleft.classList.remove('Gallery__button-left--disabled')
        }
        if (!isTheSamePrevious && !isLowerThanZero && !isGreaterThanCount) {
          this.enableNewdisablePrevious(index)
        }
        this.previousindex = index

        if (isGreaterThanCount) {
          this.previousindex = this.imagecount - 1
        }
        if (isLowerThanZero) {
          this.previousindex = 0
        }
      } else if (event.keyCode === 39) {
        let index = this.previousindex + 1
        const isTheSamePrevious = this.previousindex === index
        const isLowerThanZero = index < 0
        const isGreaterThanCount = index > this.imagecount - 1
        arrowleft.classList.remove('Gallery__button-left--disabled')
        if (index >= this.imagecount - 1) {
          arrowright.classList.add('Gallery__button-right--disabled')
        } else {
          arrowright.classList.remove('Gallery__button-right--disabled')
        }
        if (!isTheSamePrevious && !isLowerThanZero && !isGreaterThanCount) {
          this.enableNewdisablePrevious(index)
        }
        this.previousindex = index
        if (isGreaterThanCount) {
          this.previousindex = this.imagecount - 1
        }
        if (isLowerThanZero) {
          this.previousindex = 0
        }
      }
    }, true)
  }

  enableNewdisablePrevious (indexnew) {
    const images = this.imagecontainer.querySelectorAll('.Gallery__image-item')
    const items = this.pointscontainer.querySelectorAll('.Gallery__button-point')
    items[this.previousindex].classList.remove('Gallery__button-point--selected')
    items[indexnew].classList.add('Gallery__button-point--selected')
    images[this.previousindex].classList.remove('Gallery__image-item--selected')
    images[indexnew].classList.add('Gallery__image-item--selected')
    items[indexnew].focus()
  }
}
