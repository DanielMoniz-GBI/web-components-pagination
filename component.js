
function defineComponents() {
  const paginationTemplate = document.createElement('template')
  paginationTemplate.innerHTML = `
    <style>
      .selected {
        color: red;
      }
    </style>
    <span class="links">
      <span class="left-buttons"><< <</span> <span class="page-numbers"><span class="selected">1</span> 2 3 4 5</span> <span class="right-buttons">> >></span>
    </span>
  `

  const pagination = customElements.define('gbi-pagination', class Pagination extends HTMLElement {
    constructor() {
      super()
      console.log('In constructor');
    }

    static get observedAttributes() {
      return ['page-num', 'num-items', 'num-pages', 'use-callback']
    }

    connectedCallback() {
      const pageNum = this.currentPageNumber
      console.log('In connectedCallback');
      const pageNumbers = this.getPageNumbers(pageNum, this.numPages)
      // this.appendChild(paginationTemplate.content.cloneNode())
      this.innerHTML = `<span class="links"><< < ${pageNumbers} > >></span>`
    }

    attributeChangedCallback(name, oldValue, newValue) {
      console.time('pagination:attr-changed')
      console.log('in attributeChangedCallback:', name, oldValue, newValue);
      const pageNumbers = this.getPageNumbers(this.currentPageNumber, this.numPages)
      this.innerHTML = `<span class="links"><< < ${pageNumbers} > >></span>`
      // this.appendChild(paginationTemplate.content.cloneNode())
      // const content = paginationTemplate.content.cloneNode()
      // const numbers = content.querySelector('.page-numbers')
      // numbers.in
      console.timeEnd('pagination:attr-changed')
    }

    getPageNumbers(pageNum, numPages) {
      const nums = []
      let startNumber = Math.max(1, pageNum - 2)
      let endNumber = Math.min(pageNum + 2, numPages)
      let attributes = ""
      console.log(this.getAttribute('click-number-callback'));
      let useCallback = this.getAttribute('use-callback')
      window.gbiHandlePaginationClick = (event) => {
        console.log('in gbiHandlePaginationClick');
        event.preventDefault()
        const clickedEvent = new CustomEvent('gbi:pagination-clicked', { detail: { selection: -5 } })
        document.dispatchEvent(clickedEvent)
      }
      console.log('useCallback:', useCallback);
      if (useCallback) {
        attributes += ` onclick="window.gbiHandlePaginationClick(event)"`
      }
      // this.getAttribute('click-number-callback')}
      for (let i = startNumber; i <= endNumber; i++) {
        if (i === pageNum) {
          nums.push(`<span class='selected'>${i}</span>`)
          continue
        }
        const url = new URL(window.location)
        url.searchParams.set(this.pageKey, i)
        nums.push(`<a href="${url.href}"${attributes}>${i}</a>`)
      }
      return nums.join(" ")
    }

    get currentPageNumber() {
      let pageNum = this.getAttribute('page-num')
      if (pageNum) return parseInt(pageNum)
      const url = new URL(window.location)
      if (url.searchParams.has('page')) {
        return parseInt(url.searchParams.get('page'))
      } else if(url.searchParams.has('pg')) {
        return parseInt(url.searchParams.get('pg'));
      }
      return 1;
    }

    get numPages() {
      return parseInt(this.getAttribute('num-pages'))
        || Math.ceil(this.numItems / this.pageSize)
    }

    get numItems() {
      return parseInt(this.getAttribute('num-items')) || 1
    }

    get pageSize() {
      return parseInt(this.getAttribute('page-size')) || 12
    }

    get pageKey() {
      return this.getAttribute('page-key') || 'page'
    }

    set clickCallback(callback) {
      console.log('Click callback being set!');
      this.clickNumberCallback = (event) => {
        event.preventDefault()
        clickCallback(-7)
      }
    }
  })
}

defineComponents()
