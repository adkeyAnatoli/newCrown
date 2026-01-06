import { qs, createEl } from '../utils/dom.js';

export function renderInfoBlock(targetId, payload, opts) {
  const mount = qs(targetId);
  if (!mount || !payload) return;
  
  // const section = createEl("section", {
  //   className: opts && opts.variant === "secondary" ? "redSectionSecond" : "redSection",
  // });
  
  const container = createEl("div", { className: "container wrapper" });
  
  if (payload.title) {
    const h2 = createEl("h2", {
      className: opts && opts.titleColor === "black" ? "title-black" : "title-white",
      text: payload.title,
    });
    container.appendChild(h2);
  }
  
  if (payload.content && Array.isArray(payload.content)) {
    payload.content.forEach((block) => {
      if (block.type === "paragraph") {
        const p = createEl("p", { className: "text" });
        p.textContent = block.text;
        container.appendChild(p);
      } else if (block.type === "list-dotted" && Array.isArray(block.items)) {
        const ul = createEl("ul");
        block.items.forEach((item) => {
          const li = createEl("li");
          li.textContent = `• ${item}`;
          ul.appendChild(li);
        });
        container.appendChild(ul);
      } else if (block.type === "list-number" && Array.isArray(block.items)) {
        const ol = createEl("ol");
        block.items.forEach((item, index) => {
          const li = createEl("li");
          li.textContent = item;
          ol.appendChild(li);
        });
        container.appendChild(ol);
      }
    });
  }
  
  if (payload.sections && Array.isArray(payload.sections)) {
    const listBlock = createEl('div', {className: 'listBlock gap-64'})
    payload.sections.forEach((sec) => {
      const lastBlock = createEl('div', {className: 'lastBlockElement'})
      const h3 = createEl("h3", {
        className: opts && opts.titleColor === "black" ? "title-black title-small" : "title-white title-small",
        text: sec.heading,
      });
      lastBlock.appendChild(h3);
      
      if (sec.content) {
        sec.content.forEach((block) => {
          if (block.type === "paragraph") {
            const p = createEl("p", { className: "text" });
            p.textContent = block.text;
            lastBlock.appendChild(p);
          }
        });
      }
    listBlock.appendChild(lastBlock)

    });
    container.appendChild(listBlock)
  }
  
  mount.appendChild(container);
}
