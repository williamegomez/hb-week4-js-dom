export class Displayer {
  constructor (node, data) {
    console.log(node)
    this.node = node
    this.data = data
    this.inflateHTML()
    this.categoriesContainer = node.querySelector('.Displayer__list')
    this.resultsContainer = node.querySelector('.Displayer__results')
    this.setCategories()
    this.setCards()
    this.itemCategory = this.categoriesContainer.querySelectorAll('.Displayer__radio-text')
    this.itemRadio = this.categoriesContainer.querySelectorAll('.Displayer__radio-category')
    this.carditems = this.resultsContainer.querySelectorAll('.Movie-card')
    this.frontcarditems = this.resultsContainer.querySelectorAll('.Movie-card__front')
    this.backcarditems = this.resultsContainer.querySelectorAll('.Movie-card__back')
    this.currentRotated = -1
    this.setEvents()
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

  setCategories () {
    const categories = this.data.map(function (value, index, array) {
      return value.category
    })
    var fullcategories = [].concat.apply([], categories)
    // Unique categories
    this.unicategories = fullcategories.filter(function (value, index, array) {
      return array.indexOf(value) === index
    })
    const htmlCategories = this.unicategories.map(function (value) {
      var re = /{category}/gi
      return Displayer.templates.listitem.replace(re, value)
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
      // Para evitar pedir al dom en cada ocasion los items
      // const index = Array.from(this.categoriesContainer.querySelectorAll(`.${event.target.classList[0]}`)).indexOf(event.target))
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
        this.carditems[i].classList.remove('Movie-card--deactivated')
        this.carditems[i].classList.add('Movie-card--activated')
      } else {
        this.carditems[i].classList.remove('Movie-card--activated')
        this.carditems[i].classList.add('Movie-card--deactivated')
      }
    })
  }

  RotateAndUnrotated (newtorotate, currentIndex) {
    console.log(newtorotate)
    if (Array.from(this.carditems[newtorotate].classList).indexOf('Movie-card--rotated') === -1) {
      console.log('No esta rotado')
      this.carditems[newtorotate].classList.add('Movie-card--rotated')
      this.frontcarditems[newtorotate].classList.add('Movie-card__front--rotated')
      this.backcarditems[newtorotate].classList.add('Movie-card__back--rotated')
      if (currentIndex !== -1 && currentIndex !== newtorotate) {
        this.carditems[currentIndex].classList.remove('Movie-card--rotated')
        this.frontcarditems[currentIndex].classList.remove('Movie-card__front--rotated')
        this.backcarditems[currentIndex].classList.remove('Movie-card__back--rotated')
      }
    } else {
      console.log('Rotado')
      this.carditems[newtorotate].classList.remove('Movie-card--rotated')
      this.frontcarditems[newtorotate].classList.remove('Movie-card__front--rotated')
      this.backcarditems[newtorotate].classList.remove('Movie-card__back--rotated')
    }
  }
}
