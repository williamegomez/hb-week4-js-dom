class Gallery {
  constructor (galleryreference) {
    // Inflating data
    this.isDatacomplete = false
    this.galleryreference = galleryreference
    this.inflateHTML(galleryreference)
    // Getting data
    this.getDataFromFirebase()
    this.imagecount = 0
    // After inflated, get image container
    this.imagecontainer = this.galleryreference.querySelector('.Gallery__images-container')
    this.pointscontainer = this.galleryreference.querySelector('.Gallery__points-container')
    this.arrowscontainer = this.galleryreference.querySelector('.Gallery__arrows-container')
    this.previousindex = 0
  }

  inflateHTML () {
    console.log('Inflating gallery')
    const html = (`<div class="Gallery__arrows-container">
                    <button class="Gallery__button Gallery__button-left Gallery__button-left--disabled"><i class="icon-triangle-left"></i></button>
                    <button class="Gallery__button Gallery__button-right"><i class="icon-triangle-right"></i></button>
                </div>
                <div class="Gallery__points-container">
                </div>
                <div class="Gallery__images-container">
                </div>`)
    this.galleryreference.innerHTML = html
  }

  getDataFromFirebase () {
    let config = {
      apiKey: 'AIzaSyCofVBmEIKV9V2tBFwk_7YfOt4-Ydo9iIE',
      authDomain: 'hb-week4-js-dom.firebaseapp.com',
      databaseURL: 'https://hb-week4-js-dom.firebaseio.com',
      projectId: 'hb-week4-js-dom',
      storageBucket: 'hb-week4-js-dom.appspot.com',
      messagingSenderId: '108226223693'
    }
    /* global firebase */
    firebase.initializeApp(config)
    this.database = firebase.database()
    this.storage = firebase.storage()
    let GalleryRef = this.database.ref('images/Gallery')

    this.urlArray = []

    GalleryRef.on('value', (snapshot) => {
      let storageRef = this.storage.ref()

      snapshot.forEach((childSnapshot) => {
        storageRef.child('Gallery/' + childSnapshot.val().name).getDownloadURL().then((url) => {
          this.urlArray.push(url)
          this.setImage(url)
          this.imagecount++
          if (this.imagecount === snapshot.numChildren()) {
            console.log('Finished')
            this.setEvents()
          }
        })
      })
    })
  }

  setImage (url) {
    if (this.imagecount === 0) {
      this.imagecontainer.innerHTML = this.imagecontainer.innerHTML + '<img class="Gallery__image-item Gallery__image-item--selected" src=' + url + '></img>'
      this.pointscontainer.innerHTML = this.pointscontainer.innerHTML + '<button class="Gallery__button Gallery__button-point Gallery__button-point--selected"></button>'
    } else {
      this.imagecontainer.innerHTML = this.imagecontainer.innerHTML + '<img class="Gallery__image-item" src=' + url + '></img>'
      this.pointscontainer.innerHTML = this.pointscontainer.innerHTML + '<button class="Gallery__button Gallery__button-point"></button>'
    }
  }

  setEvents () {
    // Dot-events
    const items = this.pointscontainer.querySelectorAll('.Gallery__button-point')
    items.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.enableNewdisablePrevious(index, this.previousindex)
        this.previousindex = index
      })
    })

    // Arrows-events
    const arrowleft = this.arrowscontainer.querySelector('.Gallery__button-left')
    arrowleft.addEventListener('click', () => {
      if (this.previousindex === 1) {
        arrowleft.classList.add('Gallery__button-left--disabled')
      } else {
        arrowleft.classList.remove('Gallery__button-left--disabled')
        arrowright.classList.remove('Gallery__button-right--disabled')
      }
      let index = this.previousindex - 1
      this.enableNewdisablePrevious(index, this.previousindex)
      this.previousindex = index
    })

    const arrowright = this.arrowscontainer.querySelector('.Gallery__button-right')
    arrowright.addEventListener('click', () => {
      if (this.previousindex === this.imagecount - 2) {
        arrowright.classList.add('Gallery__button-right--disabled')
      } else {
        arrowleft.classList.remove('Gallery__button-left--disabled')
        arrowright.classList.remove('Gallery__button-right--disabled')
      }

      let index = this.previousindex + 1
      this.enableNewdisablePrevious(index, this.previousindex)
      this.previousindex = index
    })

    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 37) {
        if (this.previousindex === 1) {
          arrowleft.classList.add('Gallery__button-left--disabled')
        } else {
          arrowleft.classList.remove('Gallery__button-left--disabled')
          arrowright.classList.remove('Gallery__button-right--disabled')
        }
        let index = this.previousindex - 1
        this.enableNewdisablePrevious(index, this.previousindex)
        this.previousindex = index
      } else if (event.keyCode === 39) {
        if (this.previousindex === this.imagecount - 2) {
          arrowright.classList.add('Gallery__button-right--disabled')
        } else {
          arrowleft.classList.remove('Gallery__button-left--disabled')
          arrowright.classList.remove('Gallery__button-right--disabled')
        }
        let index = this.previousindex + 1
        this.enableNewdisablePrevious(index, this.previousindex)
        this.previousindex = index
      }
    }, true)
  }

  enableNewdisablePrevious (indexnew, indexprevious) {
    const images = this.imagecontainer.querySelectorAll('.Gallery__image-item')
    const items = this.pointscontainer.querySelectorAll('.Gallery__button-point')

    var isTheSamePrevious = indexprevious === indexnew
    if (!isTheSamePrevious) {
      items[indexprevious].classList.remove('Gallery__button-point--selected')
      items[indexnew].classList.add('Gallery__button-point--selected')
      images[indexprevious].classList.remove('Gallery__image-item--selected')
      images[indexnew].classList.add('Gallery__image-item--selected')
    }
  }
}

/* eslint-disable */
const g1 = new Gallery(document.querySelector(".g1"))
//const g2 = new Gallery(document.querySelector(".g2"))
/* eslint-enable */
