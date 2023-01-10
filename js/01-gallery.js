import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryListDivEl = document.querySelector(".gallery");

const makeGalleryCard = ({ preview, original, description } = {}) => {
  return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
};

const galleryCardsAll = galleryItems.map((el) => makeGalleryCard(el)).join("");
galleryListDivEl.insertAdjacentHTML("beforeend", galleryCardsAll);

const onGalleryCardClick = (event) => {
  event.preventDefault();

  const { target } = event;

  if (target.nodeName !== "IMG") {
    return;
  }

  const largeImgUrl = target.dataset.source;

  const instance = basicLightbox.create(`
    <img src="${largeImgUrl}" width="800" height="600">
`);

  instance.show();

  const onEscapeClick = (event) => {
    if (event.code === "Escape") {
      instance.close();
      galleryListDivEl.removeEventListener("keydown", onEscapeClick);
    }
  };

  galleryListDivEl.addEventListener("keydown", onEscapeClick);
};

galleryListDivEl.addEventListener("click", onGalleryCardClick);

console.log(galleryItems);
