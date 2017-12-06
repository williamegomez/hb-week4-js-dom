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
    this.itemRadio = this.categoriesContainer.querySelectorAll('.Displayer_radio-category')
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
                  <input type="radio" class="Displayer_radio-category" id="{category}" name="category">
                  <label class="Displayer_radio-text" for="{category}">{category}</label>
                </li>`,
      carditem: `<section class="Movie-card">
                  <div class="Movie-card__titlebar"><h2 class="Movie-card__title">{title}</h2></div>
                  <img class="Movie-card__image" src={imageurl}></img>
                  <p class="Movie-card__briefcontent">{content}</p>
                </section>`
    }
  }

  setCategories () {
    const categories = this.data.map(function (value) {
      return value.category
    })
    // Unique categories
    this.unicategories = categories.filter(function (value, index, array) {
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
      return Displayer.templates.carditem.replace('{title}', value.title).replace('{imageurl}', value.imageurl).replace('{content}', value.content)
    }).join('')
    this.resultsContainer.innerHTML = this.htmlCards
  }

  setEvents () {
    this.categoriesContainer.addEventListener('click', (event) => {
      // const index = Array.from(this.itemRadio).indexOf(event.target)
      console.log('hola')
    })
  }
}
