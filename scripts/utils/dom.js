export function qs(sel) {
  return document.querySelector(sel);
}

export function createEl(tag, opts) {
  const el = document.createElement(tag);
  if (opts) {
    if (opts.className) el.className = opts.className;
    if (opts.text) el.textContent = opts.text;
    if (opts.html) el.innerHTML = opts.html;
  }
  return el;
}
