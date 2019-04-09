
// fill results grid with tiles


const productResults = fetch("https://my.api.mockaroo.com/fake_products.json", {
    headers: {
      "X-API-Key": "44f77fe0"
    }
  })
  .then(resp => resp.json())
  .then(results => {
    console.log(results);
    clearResults()
    results.forEach(product => {
      const tile = createTile(product)
      addTile(tile)
    })
  })

function createTile(product) {
  const tile = document.createElement('div')
  tile.classList.add('tile')

  const name = document.createElement('div')
  name.innerText = product.name
  tile.append(name)
  const price = document.createElement('div')
  price.innerText = 'For only: $' + product.price
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
