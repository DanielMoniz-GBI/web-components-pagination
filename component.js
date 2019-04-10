
function defineComponents() {
  const paginationTemplate = document.createElement('template')
  paginationTemplate.innerHTML = `
    <style></style>

  `
  const pagination = customElements.define('gbi-pagination', class Pagination extends HTMLElement {
    constructor() {
      super()
      console.log('In constructor');
    }

    connectedCallback() {
      console.log('In connectedCallback');
      this.innerHTML = `<span class="links"><< < 1 2 3 4 5 > >></span>`
      console.log(this.numpages);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      console.log('in attributeChangedCallback');
    }
  })
}

defineComponents()
