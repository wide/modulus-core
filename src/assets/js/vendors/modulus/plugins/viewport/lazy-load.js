/**
 * Automatically lazy load img with `data-lazysrc` attribute when entering the viewport
 */
export default function(viewport) {
  viewport.observe({
    target: document.querySelectorAll(`img[data-lazysrc]`),
    once: true, // destroy observer after callback
    callback: el => el.src = el.dataset.lazysrc
  })
}