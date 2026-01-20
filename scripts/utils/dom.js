export function qs(sel) {
  return document.querySelector(sel);
}

export function createEl(tag, opts) {
  const el = document.createElement(tag);
  if (opts) {
    if (opts.className) el.className = opts.className;
    if (opts.text) el.textContent = opts.text;
    if (opts.html) el.innerHTML = opts.html;
    if (opts.attrs) {
      for (const [key, value] of Object.entries(opts.attrs)) {
        if (value == null) continue;
        el.setAttribute(key, String(value));
      }
    }
  }
  return el;
}
