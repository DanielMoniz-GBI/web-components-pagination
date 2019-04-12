
# Web Component POC: Pagination

A rough proof of concept for a pagination element using web components. It is built entirely in vanilla JS in order to learn whether or not it's reasonable to build/maintain web components without the help of a framework like [LitElement](https://lit-element.polymer-project.org/).

## Usage

As seen in `index.html`, simply add a script tag pointing to `component.js`.

To mount the component, simply add to the HTML:
```html
<gbi-pagination />
  ```

### Base functionality

The `<gbi-pagination />` element provides intelligent defaults for how a pagination element should work. These can be overridden as [seen here](#customization).

Highlights the currently selected Looks for a current page by detecting a `page` attribute in the URL search parameters. If not present, it will look for `pg`. If not present, it will assume the current page is `1`.

The numbers can be clicked to bring the user to the same page, but including a search parameter of `?page=3` (in the case of clicking the `3`). This is a normal synchronous request.

Note: without further information, the component has no idea how many pages there are. The default output therefore _should_ look something like:

```
<< < 1 2 3 > >>
```

(currently it looks as follows without num-pages specified: `<< < > >>`)

### Customization

The component takes a number of attributes for further customization. These will override the base functionality. Note that setting any of these will cause a re-render of the entire component.

* `num-items`
  * Sets the total number of items in the collection for which pagination is wanted. This will combine with a default or custom page size to determine the quantity of pages.
  * Eg: `<gbi-pagination num-items=120 />`
* `page-num`
  * Sets the current page number.
  * Eg: `<gbi-pagination page-num=7 />`
* `num-pages`
  * Specifies how many pages there are. Note that, if passed, `num-items` and `page-size` are not needed.
  * Eg: `<gbi-pagination num-pages=15 />`
* `use-callback`
  * Tells the component to *not* fire a synchronous request to another page on click of a number. Instead, the component will prevent the event default, firing a new event. The client can listen for this event to fire their own page-controlling functionality (eg. within a single page application).
  * Defaults to `false`.
  * Eg: `<gbi-pagination use-callback=true />`
* `pageKey`
  * Tells the component which key to use in the URL search parameters for the current page number.
  * Eg: `<gbi-pagination page-key="curPage" />`  (this will link to, say, `/path?curPage=5`)
  * (exception: this currently does not cause a re-render, but it should)
* `page-size`
  * Sets the page size, to be used for determining how many pages display. Useful only in conjunction with `num-pages`.
  * Eg: `<gbi-pagination page-size=16 />`
  * (exception: this currently does not cause a re-render, but it should)

> There are currently no slots for having the client customize the HTML. This could be useful for, say, overwriting what the forward- and back-page buttons should look like.

## Caveats/todos

This is a work in progress. I focused on proving that certain functionality is possible, and ideally even elegant.

#### Notes:
* It does not yet take advantage of the `<template>`. Usage of it should speed up the rendering of the pagination component significantly.
* The pagination element re-renders for every passed attribute. This does not feel right, but I do not currently see an easy way around that, without perhaps usage of a framework.
* All styles are currently coming from the client's `style.css` file. Once the template is in use, some base styles will come from the component itself. They can be overridden as needed by the client by using the appropriate specificity.

#### To do:
* Ensure base output (eg. without known page number) is either empty, or displays a more intelligent default. Eg. if on page 7, assume there is a page 5 and 6.
* Pass the fired event within the `gbi:pagination-clicked` event. The client may want to do something with it.
* Pass the actual clicked number in the `gbi:pagination-clicked` event. It currently passes `-5` to make it clear that this functionality does not currently exist.
* BUG: although the `page-key` cam be successfully set, which allow for navigating to URLs with the correct page, the logic is not in place to look for that attribute.
