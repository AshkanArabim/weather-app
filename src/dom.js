// DOM
// job: renders the data provided by data.js by writing to the dom

import data from './data';

export default function render() {
  data('el paso').then((resp) => console.log(resp));

  // utilities for dom manipulation
  function cr(element) {
    return document.createElement(element);
  }

  function qs(query) {
    return document.querySelector(query);
  }

  function appChildren(parent) {
    for (let i = 1; i <= arguments.length - 1; i++) {
      parent.appendChild(arguments[i]);
    }
  }

  function etc(element, text) {
    const product = cr(element);
    product.textContent = text;
    if (arguments[2]) {
      for (let i = 2; i < arguments.length; i++) {
        product.classList.add(arguments[i]);
      }
    }
    return product;
  }
}
