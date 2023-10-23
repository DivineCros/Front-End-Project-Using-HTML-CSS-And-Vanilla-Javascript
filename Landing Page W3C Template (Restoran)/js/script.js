// Start Header

class headerMethod {
  constructor(
    hamburger,
    primaryNav,
    secondaryNav,
    primaryAnchor,
    navAnchor,
    imageList,
    indicators,
    nextImage,
    previousImage
  ) {
    this.hamburger = hamburger;
    this.primaryNav = primaryNav;
    this.secondaryNav = secondaryNav;
    this.primaryAnchor = primaryAnchor;
    this.navAnchor = navAnchor;
    this.imageList = imageList;
    this.indicators = indicators;
    this.nextImage = nextImage;
    this.previousImage = previousImage;
  }
  // Start Small Navigation

  smallNav() {
    this.hamburger.addEventListener(`click`, () => {
      this.hamburger.classList.toggle(`fa-x`);
      this.primaryNav.classList.toggle(`no-shadow`);
      this.secondaryNav.classList.toggle(`show-nav`);
    });

    document.addEventListener(`click`, (e) => {
      if (
        !this.hamburger.contains(e.target) &&
        !this.secondaryNav.contains(e.target)
      ) {
        this.hamburger.classList.remove(`fa-x`);
        this.primaryNav.classList.remove(`no-shadow`);
        this.secondaryNav.classList.remove(`show-nav`);
      }
    });

    this.navAnchor.forEach((anchor) => {
      anchor.addEventListener(`click`, () => {
        this.hamburger.classList.remove(`fa-x`);
        this.primaryNav.classList.remove(`no-shadow`);
        this.secondaryNav.classList.remove(`show-nav`);
      });
    });

    let tablet = window.matchMedia(`(width > 768px)`);
    tablet.addEventListener(`change`, () => {
      if (tablet.matches) {
        this.hamburger.classList.remove(`fa-x`);
        this.primaryNav.classList.remove(`no-shadow`);
        this.secondaryNav.classList.remove(`show-nav`);
      }
    });

    let mobile = window.matchMedia(`(width > 425px)`);
    mobile.addEventListener(`change`, () => {
      if (mobile.matches) {
        this.hamburger.classList.remove(`fa-x`);
        this.primaryNav.classList.remove(`no-shadow`);
        this.secondaryNav.classList.remove(`show-nav`);
      }
    });

    this.primaryAnchor.forEach((anchor) => {
      anchor.addEventListener(`click`, () => {
        document.documentElement.style.scrollBehavior = `smooth`;
      });
    });

    this.navAnchor.forEach((anchor) => {
      anchor.addEventListener(`click`, () => {
        document.documentElement.style.scrollBehavior = `smooth`;
      });
    });
  }

  // End Small Navigation

  // Start Image Carousel

  imageCarousel() {
    let direction = 0;

    const loadIndicator = () => {
      this.imageList.forEach((list, index) => {
        if (index === 0) {
          this.indicators.innerHTML += `<span data-indicator = "${index}" class = "turnOn"></span>`;
        } else {
          this.indicators.innerHTML += `<span data-indicator = "${index}"></span>`;
        }
      });
    };
    loadIndicator();

    let indicatorButton = document.querySelectorAll(`.indicators span`);

    const next = () => {
      if (direction === this.imageList.length - 1) {
        direction = -1;
      }

      for (let i = 0; i < this.imageList.length; i++) {
        this.imageList[i].classList.add(`hide-img`);
      }

      indicatorButton.forEach((button) => {
        button.classList.remove(`turnOn`);
      });

      direction++;
      this.imageList[direction].classList.remove(`hide-img`);
      indicatorButton[direction].classList.add(`turnOn`);
    };

    const previous = () => {
      if (direction === 0) {
        direction = this.imageList.length;
      }
      for (let i = 0; i < this.imageList.length; i++) {
        this.imageList[i].classList.add(`hide-img`);
      }

      indicatorButton.forEach((button) => {
        button.classList.remove(`turnOn`);
      });

      direction--;
      this.imageList[direction].classList.remove(`hide-img`);
      indicatorButton[direction].classList.add(`turnOn`);
    };
    let autoplay = setInterval(next, 12000);
    const indicatorClick = () => {
      indicatorButton.forEach((button) => {
        button.addEventListener(`click`, (e) => {
          let slideOn = Number(e.target.dataset.indicator);
          if (slideOn - direction > 1) {
            direction = slideOn - 1;
            next();
          } else if (slideOn - direction === 1) {
            next();
          } else if (slideOn - direction < 0) {
            direction = slideOn + 1;
            previous();
          } else if (slideOn - direction === -1) {
            previous();
          }
        });

        button.addEventListener(`mouseenter`, () => {
          clearInterval(autoplay);
        });
        button.addEventListener(`mouseleave`, () => {
          autoplay = setInterval(next, 12000);
        });
      });
    };
    indicatorClick();

    this.nextImage.addEventListener(`click`, next);
    this.previousImage.addEventListener(`click`, previous);
    this.nextImage.addEventListener(`mouseenter`, () => {
      clearInterval(autoplay);
    });
    this.nextImage.addEventListener(`mouseleave`, () => {
      autoplay = setInterval(next, 12000);
    });
    this.previousImage.addEventListener(`mouseenter`, () => {
      clearInterval(autoplay);
    });
    this.previousImage.addEventListener(`mouseleave`, () => {
      autoplay = setInterval(next, 12000);
    });

    document.addEventListener(`mouseleave`, () => {
      this.nextImage.classList.add(`next-previous-hide`);
      this.previousImage.classList.add(`next-previous-hide`);
    });

    this.primaryNav.addEventListener(`mouseenter`, () => {
      this.nextImage.classList.add(`next-previous-hide`);
      this.previousImage.classList.add(`next-previous-hide`);
    });

    document
      .querySelector(`.image-container`)
      .addEventListener(`mouseenter`, () => {
        this.nextImage.classList.remove(`next-previous-hide`);
        this.previousImage.classList.remove(`next-previous-hide`);
      });
  }

  // End Image Carousel
}

const header = new headerMethod(
  document.getElementById(`hamburger`),
  document.getElementById(`primary-nav`),
  document.getElementById(`secondary-nav`),
  document.querySelectorAll(`header #primary-nav .navbar ul li a`),
  document.querySelectorAll(`header #secondary-nav ul li a`),
  document.querySelectorAll(`.slide`),
  document.querySelector(`.indicators`),
  document.querySelector(`.next-image`),
  document.querySelector(`.previous-image`)
);

header.smallNav();
header.imageCarousel();

// End Header

// Start Main

class mainMethod {
  constructor(
    mainContainer,
    aboutArticleH2,
    articleDiffText,
    articleText,
    aboutImg,
    tablet,
    mobile,
    menuImg,
    menuH2,
    menuH4,
    menuList,
    contactH2,
    contactText,
    contactAdress,
    contactInput,
    contactButton,
    goToTop
  ) {
    this.mainContainer = mainContainer;
    this.aboutArticleH2 = aboutArticleH2;
    this.articleDiffText = articleDiffText;
    this.articleText = articleText;
    this.aboutImg = aboutImg;
    this.tablet = tablet;
    this.mobile = mobile;
    this.menuImg = menuImg;
    this.menuH2 = menuH2;
    this.menuH4 = menuH4;
    this.menuList = menuList;
    this.contactH2 = contactH2;
    this.contactText = contactText;
    this.contactAdress = contactAdress;
    this.contactInput = contactInput;
    this.contactButton = contactButton;
    this.goToTop = goToTop;
  }
  // Start About Section

  about() {
    this.mainContainer.addEventListener(`mouseenter`, () => {
      document.querySelector(`.next-image`).classList.add(`next-previous-hide`);
      document
        .querySelector(`.previous-image`)
        .classList.add(`next-previous-hide`);
    });

    if (this.mobile.matches) {
      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 280) {
          this.aboutArticleH2.classList.add(`article-h2-animation`);
          this.articleDiffText.classList.add(`article-diff-style-animation`);
          this.articleText.forEach((text) => {
            text.classList.add(`about-text-animation`);
          });
        }
      });
      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 780) {
          this.aboutImg.classList.add(`about-figure-animation`);
        }
      });
    } else if (this.tablet.matches) {
      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 350) {
          this.aboutArticleH2.classList.add(`article-h2-animation`);
          this.articleDiffText.classList.add(`article-diff-style-animation`);
          this.articleText.forEach((text) => {
            text.classList.add(`about-text-animation`);
          });
        }
      });
      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 850) {
          this.aboutImg.classList.add(`about-figure-animation`);
        }
      });
    } else {
      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 300) {
          this.aboutArticleH2.classList.add(`article-h2-animation`);
          this.articleDiffText.classList.add(`article-diff-style-animation`);
          this.articleText.forEach((text) => {
            text.classList.add(`about-text-animation`);
          });
          this.aboutImg.classList.add(`about-figure-animation`);
        }
      });
    }
  }

  // End About Section

  // Start Menu Section
  menu() {
    if (this.mobile.matches) {
      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 1300) {
          this.menuH2.classList.add(`article-h2-animation`);
          this.menuH4.forEach((h4) => {
            h4.classList.add(`about-text-animation`);
          });
          this.menuList.forEach((list) => {
            list.classList.add(`about-text-animation`);
          });
        }
      });

      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 1800) {
          this.menuImg.classList.add(`about-figure-animation`);
        }
      });
    } else if (this.tablet.matches) {
      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 1800) {
          this.menuH2.classList.add(`article-h2-animation`);
          this.menuH4.forEach((h4) => {
            h4.classList.add(`about-text-animation`);
          });
          this.menuList.forEach((list) => {
            list.classList.add(`about-text-animation`);
          });
        }
      });

      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 2600) {
          this.menuImg.classList.add(`about-figure-animation`);
        }
      });
    } else {
      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 1300) {
          this.menuH2.classList.add(`article-h2-animation`);
          this.menuH4.forEach((h4) => {
            h4.classList.add(`about-text-animation`);
          });
          this.menuList.forEach((list) => {
            list.classList.add(`about-text-animation`);
          });
          this.menuImg.classList.add(`about-figure-animation`);
        }
      });
    }
  }
  // End Menu Section

  // Start Contact Section
  contact() {
    if (this.mobile.matches) {
      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 2400) {
          this.contactH2.classList.add(`article-h2-animation`);
          this.contactText.forEach((text) => {
            text.classList.add(`about-text-animation`);
            this.contactAdress.classList.add(`about-text-animation`);
          });
        }
      });

      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 2900) {
          this.contactInput.forEach((input) => {
            input.classList.add(`form-animation`);
          });

          this.contactButton.classList.add(`about-text-animation`);
        }
      });

      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 800) {
          this.goToTop.classList.add(`show-animation-button`);
        } else {
          this.goToTop.classList.remove(`show-animation-button`);
        }
      });
    } else if (this.tablet.matches) {
      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 3600) {
          this.contactH2.classList.add(`article-h2-animation`);
          this.contactText.forEach((text) => {
            text.classList.add(`about-text-animation`);
            this.contactAdress.classList.add(`about-text-animation`);
          });
        }
      });

      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 4000) {
          this.contactInput.forEach((input) => {
            input.classList.add(`form-animation`);
          });

          this.contactButton.classList.add(`about-text-animation`);
        }
      });

      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 900) {
          this.goToTop.classList.add(`show-animation-button`);
        } else {
          this.goToTop.classList.remove(`show-animation-button`);
        }
      });
    } else {
      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 2100) {
          this.contactH2.classList.add(`article-h2-animation`);
          this.contactText.forEach((text) => {
            text.classList.add(`about-text-animation`);
            this.contactAdress.classList.add(`about-text-animation`);
          });
        }
      });

      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 2400) {
          this.contactInput.forEach((input) => {
            input.classList.add(`form-animation`);
          });

          this.contactButton.classList.add(`about-text-animation`);
        }
      });
      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 800) {
          this.goToTop.classList.add(`show-animation-button`);
        } else {
          this.goToTop.classList.remove(`show-animation-button`);
        }
      });
    }

    this.contactInput[2].value = formatDate();
    function padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    }

    function formatDate(date = new Date()) {
      return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join("-");
    }

    this.goToTop.addEventListener(`click`, () => {
      document.documentElement.style.scrollBehavior = `smooth`;
    });
  }
  // End Contact Section
}

const main = new mainMethod(
  document.querySelector(`main`),
  document.querySelector(`main #about article h2`),
  document.querySelector(`main #about article .different-style`),
  document.querySelectorAll(`main #about article .about-text`),
  document.querySelector(`main #about figure`),
  window.matchMedia(`(width <= 920px)`),
  window.matchMedia(`(width <= 425px)`),
  document.querySelector(`main #menu figure`),
  document.querySelector(`main #menu article h2`),
  document.querySelectorAll(`main #menu article h4`),
  document.querySelectorAll(`main #menu article .menu-list`),
  document.querySelector(`main #contact h2`),
  document.querySelectorAll(`main #contact .contact-text`),
  document.querySelector(`main #contact address`),
  document.querySelectorAll(`main #contact form input`),
  document.querySelector(`main #contact form button`),
  document.querySelector(`main .back-to-top a`)
);

main.about();
main.menu();
main.contact();

// End Main
