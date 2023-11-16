/* Start Header */

class startHeader {
  constructor() {
    this.primaryNavigation = document.getElementById(`primary-nav`);
    this.primaryNavAnchor = document.querySelectorAll(`#primary-anchor`);
    this.svgLogo = document.querySelector(`#primary-nav .nav-logo svg`);
    this.hamburger = document.getElementById(`hamburger`);
    this.smallNavigation = document.getElementById(`small-nav`);
    this.smallNavAnchor = document.querySelectorAll(`#small-nav-anchor`);
    this.imageWrapper = document.querySelector(`.hero-image-wrapper`);
    this.imageContainer = document.getElementById(`hero-image-container`);
    this.indicators = document.querySelector(`#indicators`);
    this.imageSlide = document.querySelectorAll(`.image-slide`);
    this.next = document.getElementById(`next-image`);
    this.previous = document.getElementById(`previous-image`);
    this.imageTitle = document.querySelectorAll(`.hero-image-title`);
  }

  // Start Primary Navigation

  primaryNav() {
    const svLogoAnimation = () => {
      const svgLogoKeyFrames = [
        { transform: `rotate(0)`, fill: `#ffe6c7` },
        { fill: `#ffa559`, offset: 0.5 },
        { transform: `rotate(360deg)`, fill: `#ffe6c7` },
      ];

      const svgLogoTiming = {
        duration: 7000,
        iterations: Infinity,
      };

      this.svgLogo.animate(svgLogoKeyFrames, svgLogoTiming);
    };

    svLogoAnimation();

    this.primaryNavigation.addEventListener(`click`, (event) => {
      if (event.target.id === `hamburger`) {
        event.target.classList.toggle(`fa-x`);
        this.smallNavigation.classList.toggle(`active`);
      }

      if (event.target.id === `primary-anchor`) {
        document.documentElement.style.scrollBehavior = `smooth`;
      }
    });

    document.addEventListener(`click`, (event) => {
      if (
        !this.hamburger.contains(event.target) &&
        !this.smallNavigation.contains(event.target)
      ) {
        this.hamburger.classList.remove(`fa-x`);
        this.smallNavigation.classList.remove(`active`);
      }

      this.smallNavAnchor.forEach((anchor) => {
        if (event.target === anchor) {
          document.documentElement.style.scrollBehavior = `smooth`;
        }
      });
    });

    let media = window.matchMedia(`(width > 500px)`);
    media.addEventListener(`change`, () => {
      if (media.matches) {
        this.hamburger.classList.remove(`fa-x`);
        this.smallNavigation.classList.remove(`active`);
      }
    });

    this.primaryNavAnchor.forEach((anchor) => {
      anchor.addEventListener(`touchstart`, (e) => {
        anchor.classList.add(`active`);
        setTimeout(() => {
          anchor.classList.remove(`active`);
        }, 1200);
      });
    });

    for (let anchor of this.smallNavAnchor) {
      anchor.addEventListener(`touchstart`, () => {
        anchor.classList.add(`active`);

        setTimeout(() => {
          anchor.classList.remove(`active`);
        }, 1200);
      });

      anchor.addEventListener(`click`, () => {
        setTimeout(() => {
          this.hamburger.classList.remove(`fa-x`);
          this.smallNavigation.classList.remove(`active`);
        }, 500);
      });
    }
  }

  // End Primary Nav

  // Start image carousel

  imageCarousel() {
    let direction = -1;
    let slide = this.imageSlide.length;
    let step = 100 / slide;
    let indicatorIndex = 0;
    let jump = 0;

    const loadIndicators = () => {
      this.imageSlide.forEach((image, index) => {
        index === 0
          ? (this.indicators.innerHTML += `<span id ="button-indicator" data-indicator = "${index}" class="turn-on"></span>`)
          : (this.indicators.innerHTML += `<span id = "button-indicator" data-indicator = "${index}"></span>`);
      });
    };
    loadIndicators();

    const activeIndicator = () => {
      if (indicatorIndex > slide - 1) {
        indicatorIndex = 0;
      } else if (indicatorIndex < 0) {
        indicatorIndex = slide - 1;
      }
      const indicatorButton = document.querySelectorAll(`#button-indicator`);

      indicatorButton.forEach((button) => button.classList.remove(`turn-on`));

      indicatorButton[indicatorIndex].classList.add(`turn-on`);
    };

    const nextImage = () => {
      if (direction === 1) {
        direction = -1;
        this.imageContainer.prepend(this.imageContainer.lastElementChild);
      }
      this.imageWrapper.style.justifyContent = `flex-start`;
      this.imageContainer.style.transform = `translate(-${step}%)`;
      this.imageContainer.style.transition = `0.4s linear`;
      this.imageTitle.forEach((title) => title.classList.add(`active`));
    };

    const previousImage = () => {
      if (direction === -1) {
        direction = 1;
        this.imageContainer.append(this.imageContainer.firstElementChild);
      }
      this.imageContainer.style.transform = `translate(${step}%)`;
      this.imageWrapper.style.justifyContent = `flex-end`;
      this.imageContainer.style.transition = `0.4s linear`;
      this.imageTitle.forEach((title) => title.classList.add(`active`));
    };

    const clickIndicator = (e) => {
      let slideOn = parseInt(e.target.dataset.indicator);
      if (slideOn - indicatorIndex > 1) {
        jump = slideOn;
        step = step * jump;
        nextImage();
      } else if (slideOn - indicatorIndex === 1) {
        nextImage();
      } else if (slideOn - indicatorIndex < 0) {
        jump = Math.abs(slideOn - indicatorIndex);
        step = step * jump;
        previousImage();
      } else if (slideOn - indicatorIndex === -1) {
        previousImage();
      }
      step = 100 / slide;
    };

    const imageTransitionend = () => {
      if (direction === 1) {
        if (jump > 1) {
          for (let i = 0; i < jump; i++) {
            this.imageContainer.prepend(this.imageContainer.lastElementChild);
            indicatorIndex--;
          }
        } else {
          this.imageContainer.prepend(this.imageContainer.lastElementChild);
          indicatorIndex--;
        }
      } else if (direction === -1) {
        if (jump > 1) {
          for (let i = 0; i < jump; i++) {
            this.imageContainer.append(this.imageContainer.firstElementChild);
            indicatorIndex++;
          }
        } else {
          this.imageContainer.append(this.imageContainer.firstElementChild);
          indicatorIndex++;
        }
      }
      this.imageContainer.style.transform = `translate(0%)`;
      this.imageContainer.style.transition = `none`;
      activeIndicator();
      jump = 0;
      setTimeout(() => {
        this.imageTitle.forEach((title) => title.classList.remove(`active`));
      }, 300);
    };

    this.imageWrapper.addEventListener(`click`, (event) => {
      let target = event.target;
      while (target !== this.imageWrapper) {
        if (target.id === `next-image`) nextImage();
        if (target.id === `previous-image`) previousImage();
        if (target.id === `button-indicator`) clickIndicator(event);

        target = target.parentElement;
      }
    });

    this.imageWrapper.addEventListener(`transitionend`, (event) => {
      if (event.target === this.imageContainer) imageTransitionend();
    });

    let autoScroll = setInterval(() => {
      nextImage();
    }, 10000);

    this.imageWrapper.addEventListener(
      `mouseenter`,
      (event) => {
        if (
          event.target === this.imageContainer ||
          event.target === this.next ||
          event.target === this.previous
        ) {
          this.next.classList.remove(`active`);
          this.previous.classList.remove(`active`);
        }

        if (
          event.target === this.previous ||
          event.target === this.next ||
          event.target.id === `button-indicator`
        ) {
          clearInterval(autoScroll);
        }
      },
      true
    );

    this.imageWrapper.addEventListener(
      `mouseleave`,
      (event) => {
        if (event.target === this.imageContainer) {
          this.next.classList.add(`active`);
          this.previous.classList.add(`active`);
        }

        if (
          event.target === this.previous ||
          event.target === this.next ||
          event.target.id === `button-indicator`
        ) {
          autoScroll = setInterval(() => {
            nextImage();
          }, 10000);
        }
      },
      true
    );
  }
  // End Image Carousel
}

const header = new startHeader();
header.primaryNav();
header.imageCarousel();

// End Header

// Start Main

class startMain {
  constructor() {
    this.mainH2 = document.querySelectorAll(`#main-h2`);
    this.mainHr = document.querySelectorAll(`#main-hr`);
    this.projectImgContainer = document.getElementById(
      `project-image-container`
    );
    this.projectInner = document.querySelectorAll(`.project-inner`);
    this.projectImgText = document.querySelectorAll(`#card-image-text`);
    this.mainP = document.querySelectorAll(`#main-p`);
    this.contactAnchor = document.querySelectorAll(
      `#staff-container .staff-inner button a`
    );
    this.staffInner = document.querySelectorAll(`.staff-inner`);

    this.form = document.querySelector(`form`);
    this.formImg = document.querySelector(`#contact  picture img`);
    this.backToTop = document.getElementById(`back-to-top`);
    this.backToTopAnchor = document.querySelector(`#back-to-top a`);
  }

  // Start Project Section

  projectSection() {
    window.addEventListener(`scroll`, () => {
      if (window.scrollY > 150) {
        this.mainH2[0].classList.add(`active`);
        this.mainHr[0].classList.add(`active`);
      }

      if (window.scrollY > 200) {
        this.projectImgContainer.classList.add(`active`);
      }
    });

    this.projectInner.forEach((inner, index) => {
      inner.addEventListener(`touchstart`, () => {
        if (index === 0) {
          this.projectImgText[index].classList.add(`active`);
          setTimeout(() => {
            this.projectImgText[index].classList.remove(`active`);
          }, 2500);
        } else if (index === 1) {
          this.projectImgText[index].classList.add(`active`);
          setTimeout(() => {
            this.projectImgText[index].classList.remove(`active`);
          }, 2500);
        } else if (index === 2) {
          this.projectImgText[index].classList.add(`active`);
          setTimeout(() => {
            this.projectImgText[index].classList.remove(`active`);
          }, 2500);
        } else if (index === 3) {
          this.projectImgText[index].classList.add(`active`);
          setTimeout(() => {
            this.projectImgText[index].classList.remove(`active`);
          }, 2500);
        } else if (index === 4) {
          this.projectImgText[index].classList.add(`active`);
          setTimeout(() => {
            this.projectImgText[index].classList.remove(`active`);
          }, 2500);
        } else if (index === 5) {
          this.projectImgText[index].classList.add(`active`);
          setTimeout(() => {
            this.projectImgText[index].classList.remove(`active`);
          }, 2500);
        } else if (index === 6) {
          this.projectImgText[index].classList.add(`active`);
          setTimeout(() => {
            this.projectImgText[index].classList.remove(`active`);
          }, 2500);
        } else if (index === 7) {
          this.projectImgText[index].classList.add(`active`);
          setTimeout(() => {
            this.projectImgText[index].classList.remove(`active`);
          }, 2500);
        }
      });
    }, true);
  }

  // End Project Section

  // Start About Section

  aboutSection() {
    const tablet = window.matchMedia(`(width <= 850px)`);
    const mobile = window.matchMedia(`(width <= 450px)`);

    if (mobile.matches) {
      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 2100) {
          this.mainH2[1].classList.add(`active`);
          this.mainHr[1].classList.add(`active`);
          this.mainP[0].classList.add(`active`);
          this.backToTop.classList.remove(`none`);
          this.backToTop.classList.add(`show`);
          this.backToTop.classList.remove(`hide`);
        } else {
          this.backToTop.classList.remove(`show`);
          this.backToTop.classList.add(`hide`);
        }

        if (window.scrollY >= 2500) {
          this.staffInner.forEach((staff) => {
            staff.classList.add(`staff-anim`);
          });
        }

        if (window.scrollY > 1) {
          this.staffInner.forEach((staff) => {
            staff.classList.remove(`active`);
            staff.firstElementChild.firstElementChild.classList.remove(
              `active`
            );
            staff.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
              `active`
            );
            staff.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
              `active`
            );
          });
        }

        if (window.scrollY >= 4000) {
          this.mainH2[2].classList.add(`active`);
          this.mainHr[2].classList.add(`active`);
          this.mainP[1].classList.add(`active`);
        }

        if (window.scrollY >= 4300) {
          this.form.classList.add(`active`);
          this.formImg.classList.add(`active`);
        }
      });
    } else if (tablet.matches) {
      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 1000) {
          this.mainH2[1].classList.add(`active`);
          this.mainHr[1].classList.add(`active`);
          this.mainP[0].classList.add(`active`);
          this.backToTop.classList.remove(`none`);
          this.backToTop.classList.add(`show`);
          this.backToTop.classList.remove(`hide`);
        } else {
          this.backToTop.classList.add(`hide`);
          this.backToTop.classList.remove(`show`);
        }
        if (window.scrollY >= 1300) {
          this.staffInner.forEach((staff) => {
            staff.classList.add(`staff-anim`);
          });
        }

        if (window.scrollY > 1) {
          this.staffInner.forEach((staff) => {
            staff.classList.remove(`active`);
            staff.firstElementChild.firstElementChild.classList.remove(
              `active`
            );
            staff.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
              `active`
            );
            staff.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
              `active`
            );
          });
        }

        if (window.scrollY >= 2000) {
          this.mainH2[2].classList.add(`active`);
          this.mainHr[2].classList.add(`active`);
          this.mainP[1].classList.add(`active`);
        }

        if (window.scrollY >= 2300) {
          this.form.classList.add(`active`);
          this.formImg.classList.add(`active`);
        }
      });
    } else {
      window.addEventListener(`scroll`, () => {
        if (window.scrollY >= 950) {
          this.mainH2[1].classList.add(`active`);
          this.mainHr[1].classList.add(`active`);
          this.mainP[0].classList.add(`active`);
          this.backToTop.classList.remove(`none`);
          this.backToTop.classList.add(`show`);
          this.backToTop.classList.remove(`hide`);
        } else {
          this.backToTop.classList.remove(`show`);
          this.backToTop.classList.add(`hide`);
        }

        if (window.scrollY > 1) {
          this.staffInner.forEach((staff) => {
            staff.classList.remove(`active`);
            staff.firstElementChild.firstElementChild.classList.remove(
              `active`
            );
            staff.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
              `active`
            );
            staff.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
              `active`
            );
          });
        }

        if (window.scrollY >= 1050) {
          this.staffInner.forEach((staff) => {
            staff.classList.add(`staff-anim`);
          });
        }

        if (window.scrollY >= 1600) {
          this.mainH2[2].classList.add(`active`);
          this.mainHr[2].classList.add(`active`);
          this.mainP[1].classList.add(`active`);
        }

        if (window.scrollY >= 1900) {
          this.form.classList.add(`active`);
          this.formImg.classList.add(`active`);
        }
      });
    }

    for (let staff of this.staffInner) {
      staff.addEventListener(`touchstart`, (event) => {
        staff.classList.add(`active`);

        staff.firstElementChild.firstElementChild.classList.add(`active`);

        staff.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.classList.add(
          `active`
        );

        staff.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.add(
          `active`
        );
      });
    }

    document.addEventListener(`click`, (event) => {
      this.contactAnchor.forEach((anchor) => {
        if (event.target === anchor)
          document.documentElement.style.scrollBehavior = `smooth`;
      });
    });

    this.backToTopAnchor.addEventListener(`click`, () => {
      document.documentElement.style.scrollBehavior = `smooth`;
    });
  }

  // End About Section

  // Start Contact Section

  // End Contact Section
}

const main = new startMain();
main.projectSection();
main.aboutSection();
