import browser from 'browser-sync'

export default function(err) {
  if (err && err.formatted) {
    browser.notify(
      `<div style="color: red; text-align: left;">
        ${err.formatted.replace(/\n/g, '<br>')}
      </div>`,
    20000)
  }
}