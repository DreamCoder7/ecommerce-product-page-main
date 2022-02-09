// SELECTIONS
const cartProfileEl = document.querySelector(".cart-profile");
const userImgEl = document.querySelector(".user-img");
const valueEl = document.querySelector(".value");
const btnsEl = document.querySelector(".btns");
const cartProfileContEl = document.querySelector(".cart-profile-cont");
const emptyCartEl = document.querySelector(".empty-cart");
const amountEl = document.querySelector(".amount");
const totalPrice = document.querySelector(".total-price");
const singlePrice = document.querySelector(".single-price");
const heroBtn = document.querySelector(".hero-btn");
const amountCartEl = document.querySelector(".amount-cart");
const thumbnailImg = document.querySelectorAll(".preview-img");
const popupEl = document.querySelector(".popup");
const overlayEl = document.querySelector(".overlay");
const closeIcon = document.querySelector(".close-icon");
const popupIcon = document.querySelector(".popup-icon-cont");
const popupImg = document.querySelectorAll(".slider");
const preImgCont = document.querySelector(".popup-thumbnail-img");
const mainImg = document.querySelectorAll(".main-slider");
const mainIcon = document.querySelector(".main-icon-cont");
const checkOutBtn = document.querySelector(".btn");
const mainImgCont = document.querySelector(".thumbnail-img");
const mainImge = document.querySelectorAll(".main-img");
const btnOpen = document.querySelector(".btn-open");
const btnClose = document.querySelector(".btn-close");
const navListEl = document.querySelector(".nav-list");

class App {
  #count = 0;
  currSlide = 0;
  maxSlide = popupImg.length;

  constructor(img) {
    this.img = img;

    this._createPreImg();
    this._activatePreImg(0);

    // Event Hundlers
    userImgEl.addEventListener("click", this._removeCartProfile.bind(this));
    // userImgEl.addEventListener("click", this._addCartProfile.bind(this));
    btnsEl.addEventListener("click", this._btnsOperation.bind(this));
    heroBtn.addEventListener("click", this._setPrice.bind(this));
    closeIcon.addEventListener("click", this._popupClose);
    // thumbnailImg.forEach((img) =>
    //   img.addEventListener("click", this._mainSlide.bind(this))
    // );
    checkOutBtn.addEventListener("click", this._popupOpen);
    popupIcon.addEventListener("click", this._popupSlide.bind(this));
    mainIcon.addEventListener("click", this._mainSlideM.bind(this));
    mainImgCont.addEventListener("click", this._mainSlideD.bind(this));
    preImgCont.addEventListener("click", this._preImgSlide.bind(this));
    document.addEventListener("DOMContentLoaded", this._goToSlide);

    btnOpen.addEventListener("click", this._btnOpen);
    btnClose.addEventListener("click", this._btnClose);
  }

  _removeCartProfile() {
    cartProfileEl.classList.toggle("hidden");
  }

  _addCartProfile() {
    cartProfileEl.classList.add("hidden");
  }

  _cartOperation() {
    valueEl.textContent = this.#count;
    amountCartEl.classList.remove("hidden");
    amountCartEl.textContent = valueEl.textContent;
  }

  _btnsOperation(e) {
    const btn = e.target;

    if (btn.classList.contains("btn-low")) {
      if (!this.#count) return;
      this.#count--;
      this._cartOperation();
    } else if (btn.classList.contains("btn-high")) {
      this.#count++;
      this._cartOperation();
    }
  }

  _setPrice() {
    // RE-FACTORIZING
    //   Calculate
    amountEl.textContent = +valueEl.textContent;
    totalPrice.textContent = +singlePrice.textContent * +amountEl.textContent;
    totalPrice.textContent = totalPrice.textContent.padStart(
      totalPrice.textContent.length + 1,
      "$"
    );

    // Re-set
    cartProfileContEl.style.display = "flex";
    emptyCartEl.style.display = "none";
    valueEl.textContent = 0;
    this.#count = 0;
    // RE-FACTORIZING
  }

  _popupOpen() {
    popupEl.classList.remove("hidden");
    overlayEl.classList.remove("hidden");
    cartProfileEl.classList.add("hidden");
  }

  _popupClose() {
    popupEl.classList.add("hidden");
    overlayEl.classList.add("hidden");
  }

  // Burger Menu
  _btnOpen() {
    navListEl.classList.add("open");
    overlayEl.classList.remove("hidden");
  }

  _btnClose() {
    navListEl.classList.remove("open");
    overlayEl.classList.add("hidden");
  }

  // Slider
  _activatePreImg(slide) {
    document
      .querySelectorAll(".popup-preview-img")
      .forEach((img) => img.classList.remove("popup-preview-img-active"));

    document
      .querySelector(`.popup-preview-img[data-slide="${slide}"]`)
      .classList.add("popup-preview-img-active");
  }

  _goToSlide(slide) {
    popupImg.forEach((img, i) => {
      img.style.transform = `translateX(${(i - slide) * 100}%)`;
    });

    let query = window.matchMedia("(max-width: 600px)");

    if (query.matches) {
      mainImg.forEach((img, i) => {
        img.style.transform = `translateX(${(i - slide) * 100}%)`;
      });
    } else {
      mainImg.forEach((img) => (img.style.transform = `translateX(0)`));
    }
  }

  _nextSlide(btn, className) {
    if (btn.classList.contains(`${className}-icon-left`)) {
      if (this.currSlide === this.maxSlide - 1) {
        this.currSlide = 0;
      } else {
        this.currSlide++;
      }
      this._goToSlide(this.currSlide);
      this._activatePreImg(this.currSlide);
    }
  }

  _previousSlide(btn, className) {
    if (btn.classList.contains(`${className}-icon-right`)) {
      if (this.currSlide === 0) {
        this.currSlide = this.maxSlide - 1;
      } else {
        this.currSlide--;
      }
    }
    this._goToSlide(this.currSlide);
    this._activatePreImg(this.currSlide);
  }

  _popupSlide(e) {
    const btn = e.target;

    this._nextSlide(btn, "popup");
    this._previousSlide(btn, "popup");
  }

  _mainSlideM(e) {
    const btn = e.target;

    this._nextSlide(btn, "main");
    this._previousSlide(btn, "main");
  }

  _mainSlideD(e) {
    const { img } = e.target.dataset;
    const preImg = e.target;
    console.log(preImg);

    if (!img) return;

    // Remove classes
    mainImge.forEach((img) => img.classList.remove("active-img"));
    thumbnailImg.forEach((img) => img.classList.remove("thumbnail-active-img"));

    // Add classes
    document.querySelector(`.main-img-${img}`).classList.add("active-img");
    preImg.classList.add("thumbnail-active-img");
  }

  _createPreImg() {
    popupImg.forEach((_, i) => {
      preImgCont.insertAdjacentHTML(
        "beforeend",
        `<img
      src="images/image-product-${i + 1}-thumbnail.jpg"
      alt="shoes img"
      class="popup-preview-img"
      data-slide="${i}"
    />`
      );
    });
  }

  _preImgSlide(e) {
    if (e.target.classList.contains("popup-preview-img")) {
      const { slide } = e.target.dataset;
      this._goToSlide(slide);
      this._activatePreImg(slide);
    }
  }
}

const app = new App();
