
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

    static get observedAttributes() {
      return ['page-num']
    }

    connectedCallback() {
      const pageNum = parseInt(this.getAttribute('page-num')) || 1
      console.log('In connectedCallback');
      let numPages = this.getAttribute('num-pages') || 1
      numPages = parseInt(numPages)
      this.innerHTML = `<span class="links"><< < ${this.getPageNumbers(pageNum, numPages)} > >></span>`
    }

    attributeChangedCallback(name, oldValue, newValue) {
      console.log('in attributeChangedCallback');
      if (name === 'page-num') {
        let numPages = this.getAttribute('num-pages') || 1
        const pageNum = parseInt(this.getAttribute('page-num')) || 1
        this.innerHTML = `<span class="links"><< < ${this.getPageNumbers(pageNum, numPages)} > >></span>`
      }
    }

    getPageNumbers(pageNum, numPages) {
      if (numPages === 0) {
        return ''
      }
      const nums = []
      for (let i = 1; i <= numPages; i++) {
        if (i === pageNum) {
          nums.push(`<span class='selected'>${i}</span>`)
          continue
        }
        nums.push(i)
      }
      return nums.join(" ")
    }
  })
}

defineComponents()
