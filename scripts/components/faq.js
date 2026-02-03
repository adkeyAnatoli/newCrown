export function renderFAQ() {
  const allFaq = document.querySelectorAll(".faqElement");
  if (allFaq) {
    allFaq.forEach((item) => {
      item.addEventListener("click", () => {
        const faqText = item.nextElementSibling;
        const isOpen = faqText.style.display !== "none";
        faqText.style.display = isOpen ? "none" : "block";
        const icon = item.querySelector("img");
        if (icon) {
          icon.src = isOpen ? "/public/svg/plus.svg" : "/public/svg/minus.svg";
        }
      });
    });
  }
}
