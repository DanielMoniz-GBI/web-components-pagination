
// fill results grid with tiles

// const productResults = fetch("https://my.api.mockaroo.com/fake_products.json", {
//     headers: {
//       "X-API-Key": "44f77fe0"
//     }
//   })
document.addEventListener('DOMContentLoaded', function() {
  window.getProducts = getProducts
  getProducts(5)
  // .then(getProducts.bind(null, 2))
  // .then(getProducts.bind(null, 3))

  document.addEventListener('gbi:pagination-update', (pageNum) => {
    getProducts(pageNum)
  })



  function getProducts(page = 1, maxPageSize = 10) {
    waitForResults()
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(window.mockData)
      }, 1000)
    })
    // .then(resp => resp.json())
    .then(results => {
      clearResults()
      setPagination(results, page)
      updateResults(results, page, maxPageSize)
    })
  }

  function setPagination(results, pageNum) {
    let pagination = document.querySelector('nav.pagination gbi-pagination')
    if (pagination) {
      pagination.setAttribute('num-items', results.length)
      pagination.setAttribute('page-num', pageNum)
      return
    }

    const container = document.querySelector('nav.pagination')
    pagination = document.createElement('gbi-pagination')
    // pagination.setAttribute('num-items', 0)
    pagination.setAttribute('num-items', results.length)
    console.log(pageNum);
    pagination.setAttribute('page-num', pageNum)
    container.innerHTML = ''
    container.append(pagination)
    // container.innerHTML = `<gbi-pagination num-items="${results.length}" />`
  }

  function updateResults(results, pageNum, maxPageSize) {
    const pageMin = (pageNum - 1) * maxPageSize
    const pageMax = pageNum * maxPageSize
    // console.log(results.slice(pageMin, pageMax));
    results.slice(pageMin, pageMax).forEach(product => {
      const tile = createTile(product)
      addTile(tile)
    })
  }

  function createTile(product) {
    const tile = document.createElement('div')
    tile.classList.add('tile')

    const image = document.createElement('img')
    image.src = product.image
    tile.append(image)
    const name = document.createElement('div')
    name.innerText = product.name
    tile.append(name)
    const price = document.createElement('div')
    price.innerText = 'For only: ' + product.price
    tile.append(price)

    return tile
  }

  function addTile(tile) {
    const results = document.querySelector('main .results')
    results.append(tile)
  }

  function clearResults() {
    const results = document.querySelector('main .results')
    results.innerHTML = ''
  }

  function waitForResults() {
    const results = document.querySelector('main .results')
    const spinner = document.createElement('img')
    spinner.src = 'spinner.jpg'
    spinner.classList.add('spinner')
    results.prepend(spinner)
  }
})
