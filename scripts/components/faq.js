import { qs } from "../utils/dom.js";

export function renderFAQ() {
  const mount = qs("#faq");
  if (!mount) {
    // console.warn("FAQ element not found");
    return;
  }

  const allFaq = document.querySelectorAll(".faqElement");

  allFaq.forEach((item) => {
    item.addEventListener("click", () => {
      const faqText = item.nextElementSibling;
      const isOpen = faqText.style.display !== "none";
      faqText.style.display = isOpen ? "none" : "block";
      const icon = item.querySelector("img");
      if (icon) {
        icon.src = isOpen ? "./public/svg/plus.svg" : "./public/svg/minus.svg";
      }
    });
  });
}
