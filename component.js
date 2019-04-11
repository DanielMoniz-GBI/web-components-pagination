
function defineComponents() {
  const paginationTemplate = document.createElement('template')
  paginationTemplate.innerHTML = `
    <style></style>
    << < 1 2 3 4 5 > >>
  `
  const pagination = customElements.define('gbi-pagination', class Pagination extends HTMLElement {
    constructor() {
      super()
      console.log('In constructor');
    }

    static get observedAttributes() {
      return ['page-num', 'num-items', 'num-pages']
    }

    connectedCallback() {
      const pageNum = this.currentPageNumber
      console.log('In connectedCallback');
      const pageNumbers = this.getPageNumbers(pageNum, this.numPages)
      this.innerHTML = `<span class="links"><< < ${pageNumbers} > >></span>`
    }

    attributeChangedCallback(name, oldValue, newValue) {
      console.time('pagination:attr-changed')
      console.log('in attributeChangedCallback');
      if (name === 'page-num') {
        let numPages = this.getAttribute('num-pages') || 1
        const pageNum = this.currentPageNumber
        const pageNumbers = this.getPageNumbers(pageNum, numPages)
        this.innerHTML = `<span class="links"><< < ${pageNumbers} > >></span>`
      }
      console.timeEnd('pagination:attr-changed')
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
        url.searchParams.set(this.pageKey, i)
        nums.push(`<a href="${url.href}">${i}</a>`)
      }
      return nums.join(" ")
    }

    get currentPageNumber() {
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

    get numPages() {
      let numPages = parseInt(this.getAttribute('num-pages'))
      if (numPages) return numPages
      const numItems = parseInt(this.getAttribute('num-items'))
      return Math.ceil(numItems / this.pageSize)
    }

    get pageSize() {
      return parseInt(this.getAttribute('page-size')) || 12
    }

    get pageKey() {
      return this.getAttribute('page-key') || 'page'
    }
  })
}

defineComponents()
