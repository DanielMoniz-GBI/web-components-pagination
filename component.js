
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
      const pageNum = this.getCurrentPageNumber()
      console.log('In connectedCallback');
      let numPages = this.getAttribute('num-pages') || 1
      numPages = parseInt(numPages)
      this.innerHTML = `<span class="links"><< < ${this.getPageNumbers(pageNum, numPages)} > >></span>`
    }

    attributeChangedCallback(name, oldValue, newValue) {
      console.log('in attributeChangedCallback');
      if (name === 'page-num') {
        let numPages = this.getAttribute('num-pages') || 1
        const pageNum = this.getCurrentPageNumber()
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
        const url = new URL(window.location)
        // @TODO Take 'page' or 'pg' from attributes if possible
        url.searchParams.set('page', i)
        nums.push(`<a href="${url.href}">${i}</a>`)
      }
      return nums.join(" ")
    }

    getCurrentPageNumber() {
      let pageNum = this.getAttribute('page-num')
      if (pageNum !== undefined && pageNum !== null) return parseInt(pageNum)
      const url = new URL(window.location)
      if (url.searchParams.has('page')) {
        return parseInt(url.searchParams.get('page'))
      } else if(url.searchParams.has('pg')) {
        return parseInt(url.searchParams.get('pg'));
      }
      return 1;
    }
  })
}

defineComponents()
