
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
      let numPages = this.getAttribute('num-pages')
      if (!numPages) { numPages = 1 }
      numPages = parseInt(numPages)
      console.log(numPages);
      this.innerHTML = `<span class="links"><< < ${this.getPageNumbers(numPages)} > >></span>`

    }

    attributeChangedCallback(name, oldValue, newValue) {
      console.log('in attributeChangedCallback');
    }

    getPageNumbers(numPages) {
      if (numPages === 0) {
        return ''
      }
      const nums = []
      for (let i = 1; i <= numPages; i++) {
        nums.push(i)
      }
      return nums.join(" ")
    }
  })
}

defineComponents()
