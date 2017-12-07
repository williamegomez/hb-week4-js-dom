export class Displayer {
  constructor (node, data) {
    console.log(node)
    this.node = node
    this.data = data
    this.inflateHTML()
    this.categoriesContainer = node.querySelector('.Displayer__list')
    this.resultsContainer = node.querySelector('.Displayer__results')
    this.OrganizeCategories()
    this.setCards()
    this.itemCategory = this.categoriesContainer.querySelectorAll('.Displayer__radio-text')
    this.itemRadio = this.categoriesContainer.querySelectorAll('.Displayer__radio-category')
    this.carditems = this.resultsContainer.querySelectorAll('.Movie-card')
    this.frontcarditems = this.resultsContainer.querySelectorAll('.Movie-card__front')
    this.backcarditems = this.resultsContainer.querySelectorAll('.Movie-card__back')
    this.currentRotated = -1
    this.setEvents()
  }

  static get states () {
    return {
      cardDeactivated: 'Movie-card--deactivated',
      cardActivated: 'Movie-card--activated',
      cardRotate: 'Movie-card--rotated',
      cardRotateFront: 'Movie-card__front--rotated',
      cardRotateBack: 'Movie-card__back--rotated'
    }
  }

  inflateHTML () {
    const html = (`<div class="Displayer__filterbar">
                      <span class="Displayer__title">Categories: </span>
                      <ul class="Displayer__list">    
                      </ul>
                    </div>
                    <div class="Displayer__results">
                    </div>`)
    this.node.innerHTML = html
  }

  static get templates () {
    return {
      listitem: `<li class="Displayer__list-item">
                  <label class="Displayer__radio-text">
                  <input type="radio" class="Displayer__radio-category" name="category">{category}</label>
                </li>`,
      carditem: `<section class="Movie-card">
                  <div class="Movie-card__front">
                    <div class="Movie-card__titlebar"><h2 class="Movie-card__title">{title}</h2></div>
                    <img class="Movie-card__image" src={imageurl}></img>
                    <p class="Movie-card__briefcontent">({year})</p>
                  </div>
                  <div class="Movie-card__back">
                    <p class="Movie-card__largecontent">{fullcontent}</p>
                  </div>
                </section>`
    }
  }

  OrganizeCategories () {
    const categories = this.data.map(function (value, index, array) {
      return value.category
    })
    // Concat array of arrays
    var fullcategories = [].concat.apply([], categories)
    // Unique categories
    this.unicategories = fullcategories.filter(function (value, index, array) {
      return array.indexOf(value) === index
    })
    const htmlCategories = this.unicategories.map(function (value) {
      return Displayer.templates.listitem.replace(/{category}/gi, value)
    }).join('')
    this.categoriesContainer.innerHTML = htmlCategories
  }

  setCards () {
    this.htmlCards = this.data.map(function (value) {
      return Displayer.templates.carditem.replace('{title}', value.title).replace('{imageurl}', value.imageurl).replace('{year}', value.year).replace('{fullcontent}', value.fullcontent)
    }).join('')
    this.resultsContainer.innerHTML = this.htmlCards
  }

  setEvents () {
    this.categoriesContainer.addEventListener('click', (event) => {
      if (event.target.classList[0] === 'Displayer__radio-text') {
        let index = Array.from(this.itemCategory).indexOf(event.target)
        this.setDisplayCards(index)
      }
      if (event.target.classList[0] === 'Displayer__radio-category') {
        let index = Array.from(this.itemRadio).indexOf(event.target)
        this.setDisplayCards(index)
      }
    })

    this.carditems.forEach((value, newtorotate) => {
      value.addEventListener('click', () => {
        this.RotateAndUnrotated(newtorotate, this.currentRotated)
        this.currentRotated = newtorotate
      })
    })
  }

  setDisplayCards (index) {
    this.data.forEach((value, i) => {
      if (value.category.indexOf(this.unicategories[index]) !== -1) {
        this.carditems[i].classList.remove(Displayer.states.cardDeactivated)
        this.carditems[i].classList.add(Displayer.states.cardActivated)
      } else {
        this.carditems[i].classList.remove(Displayer.states.cardActivated)
        this.carditems[i].classList.add(Displayer.states.cardDeactivated)
      }
    })
  }

  RotateAndUnrotated (newtorotate, currentIndex) {
    console.log(newtorotate)
    if (Array.from(this.carditems[newtorotate].classList).indexOf(Displayer.states.cardRotate) === -1) {
      console.log('Not rotated')
      this.carditems[newtorotate].classList.add(Displayer.states.cardRotate)
      this.frontcarditems[newtorotate].classList.add(Displayer.states.cardRotateFront)
      this.backcarditems[newtorotate].classList.add(Displayer.states.cardRotateBack)
      if (currentIndex !== -1 && currentIndex !== newtorotate) {
        this.carditems[currentIndex].classList.remove(Displayer.states.cardRotate)
        this.frontcarditems[currentIndex].classList.remove(Displayer.states.cardRotateFront)
        this.backcarditems[currentIndex].classList.remove(Displayer.states.cardRotateBack)
      }
    } else {
      console.log('Rotated')
      this.carditems[newtorotate].classList.remove(Displayer.states.cardRotate)
      this.frontcarditems[newtorotate].classList.remove(Displayer.states.cardRotateFront)
      this.backcarditems[newtorotate].classList.remove(Displayer.states.cardRotateBack)
    }
  }
}
