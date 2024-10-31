// HEADER
function activeHeader() {
  const linksMenu = document.querySelectorAll(
    ".header .header__left .header__left-menu li a"
  );
  linksMenu.forEach(function (link) {
    link.classList.remove("--show");
    if (link.href == window.location.href) {
      link.classList.add("--show");
    }
  });
}
activeHeader();

// BACK TO TOP
function clickBackToTop() {
  const btn = document.querySelector(".backtotop");
  let bodyHeight = document.querySelector("body").offsetHeight;

  function showBackToTop() {
    window.addEventListener("scroll", function () {
      let scrollY = window.scrollY;
      if (scrollY > bodyHeight / 3) {
        btn.classList.add("--show");
      } else {
        btn.classList.remove("--show");
      }
    });
  }
  window.addEventListener("scroll", showBackToTop());

  btn?.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
}
clickBackToTop();

//  Modal Video
function handleModalVideo() {
  let videos = document.querySelectorAll("[data-btn-video]"),
    modalVideo = document.querySelector(".popupvideo"),
    iframeModalVideo = document.querySelector(
      ".popupvideo .popupvideo__inner .popupvideo__inner-iframe iframe "
    ),
    btnClose = document.querySelector(".popupvideo__inner-close"),
    body = document.querySelector("body");
  // show modal
  videos.forEach(function (video) {
    video?.addEventListener("click", function () {
      modalVideo.classList.add("active");
      body.classList.add("--disable-scroll");
      // check
      // set dataID
      let dataID = video.getAttribute("data-video-src");
      // set ID iframe
      iframeModalVideo.setAttribute(
        "src",
        `https://www.youtube.com/embed/${dataID}?autoplay=1`
      );
    });
  });
  function closeModal() {
    modalVideo.classList.remove("active");
    iframeModalVideo.setAttribute("src", "");
    body.classList.remove("--disable-scroll");
  }
  // close modal clicked
  btnClose?.addEventListener("click", function () {
    closeModal();
  });
  modalVideo?.addEventListener("click", function () {
    closeModal();
  });
}
handleModalVideo();

// change background header color
function changeBgHeader() {
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function () {
    let scrolly = window.scrollY;
    if (scrolly < header.clientHeight) {
      header.classList.remove("bgheader");
    } else {
      header.classList.add("bgheader");
    }
  });
}
window.addEventListener("scroll", changeBgHeader());

// SHOW MENU ACTIVE MENU
function menuMobile() {
  const btnMenu = document.querySelector(
      ".header .header__right .header__right-btnmenu"
    ),
    menuMobile = document.querySelector(".menumobile "),
    header = document.querySelector(".header"),
    progressbar = document.querySelector(".progressbar"),
    body = document.querySelector("body"),
    linksMenu = document.querySelectorAll(".menumobile .header__menu li a");

  // hide nav
  function hideMenuMob() {
    btnMenu.classList.remove("--active");
    menuMobile.classList.remove("--show");
    header.classList.remove("bgtransparent");
    body.classList.remove("--disable-scroll");
    progressbar.classList.remove("--hide");
  }

  btnMenu.addEventListener("click", function () {
    if (header.classList.contains("bgheader")) {
      header.classList.toggle("bgheader");
    }
    this.classList.toggle("--active");
    menuMobile.classList.toggle("--show");
    body.classList.toggle("--disable-scroll");
    header.classList.toggle("bgtransparent");
    progressbar?.classList.add("--hide");
  });

  menuMobile.addEventListener("click", () => {
    hideMenuMob();
  });

  // resize window
  window.addEventListener("resize", function () {
    let wwindow = window.innerWidth;
    if (wwindow > 992) {
      hideMenuMob();
    }
  });

  linksMenu.forEach(function (link) {
    link.classList.remove("--show");
    if (link.href == window.location.href) {
      link.classList.add("--show");
    }
  });
}
menuMobile();

// //  MENU
// function activeMenu() {
//   const linksMenu = document.querySelectorAll(".menumobile .header__menu li a");
//   // linksFooter = document.querySelectorAll(
//   //   ".footer .footer__middle .footer__middle-left .list li a"
//   // );
//   linksMenu.forEach(function (link) {
//     link.classList.remove("--show");
//     if (link.href == window.location.href) {
//       link.classList.add("--show");
//     }
//   });
// }
// activeMenu();

// PROGRESSBAR
const progressbarBody = () => {
  let progress = document.querySelector(".progressbar");
  window.addEventListener("scroll", function () {
    let scrolly = window.scrollY;
    let percent =
      (scrolly / (document.body.offsetHeight - window.innerHeight)) * 100;
    progress.style.width = `${percent}%`;
  });
};
window.addEventListener("load", function () {
  progressbarBody();
});

// USER SAY
function handleSliderUser() {
  const listItem = document.querySelector(".carousel__lists");
  if (listItem) {
    let item = new FlickityResponsive(listItem, {
      cellAlign: "center",
      contain: true,
      prevNextButtons: false,
      pageDots: true,
      wrapAround: true,
      draggable: true,
      groupCells: 2,
      on: {
        ready: function () {
          setHeightSlider();
        },
      },
      responsive: [
        {
          breakpoint: 768,
          settings: {
            groupCells: 1,
          },
        },
      ],
    });

    // USER SAY - SET HEiGHT
    // height = desc + margin desc + author + pd của item
    function setHeightSlider() {
      const items = document.querySelectorAll(
        ".carousel__lists .carousel__lists-item"
      );

      let height = 0;
      items.forEach(function (item) {
        const desc = item.querySelector(".desc");

        let heightDesc = desc.scrollHeight;
        let marginBottomDesc = parseInt(
          window.getComputedStyle(desc).getPropertyValue("margin-bottom")
        );
        let heightAuthor = document.querySelector(
          ".carousel__lists .carousel__lists-item .author"
        ).scrollHeight;
        let pdItem =
          parseInt(
            window.getComputedStyle(item).getPropertyValue("padding-top")
          ) * 2;

        let heightItem = heightDesc + marginBottomDesc + heightAuthor + pdItem;
        if (heightItem > height) {
          height = heightItem;
        }
      });

      items.forEach(function (item) {
        item.style.height = `${height}px`;
      });
    }
  }
}
handleSliderUser();

// USER SAY -SET WIDTH
// width = container/2 - margin giữa các item - padding container
function setWidthSlider() {
  let container = document.querySelector(".container");
  const items = document.querySelectorAll(
    ".carousel__lists .carousel__lists-item"
  );

  let pdLeftContainer = parseInt(
    window.getComputedStyle(container).getPropertyValue("padding-left")
  );

  let marginItem =
    parseInt(
      window
        .getComputedStyle(
          document.querySelector(".carousel__lists .carousel__lists-item")
        )
        .getPropertyValue("margin-left")
    ) * 2;

  let widthSlider = (container.clientWidth - marginItem) / 2 - pdLeftContainer;

  items.forEach(function (item) {
    item.style.width = `${widthSlider}px`;
  });
}

window.addEventListener("load", function () {
  const carousel = this.document.querySelector(".carousel .carousel__lists ");
  if (carousel != null) {
    setWidthSlider();
    handleSliderUser();
  }
});

window.addEventListener("resize", function () {
  const carousel = this.document.querySelector(".carousel .carousel__lists ");
  if (carousel != null) {
    setWidthSlider();
    handleSliderUser();
  }
});

// LOADING
function inItLoading() {
  let loadedCount = 0,
    imgs = document.querySelectorAll("img").length,
    container = document.querySelector("body");

  function handleLoading(percent) {
    const progress = document.querySelector(".loading__inner-progress"),
      textPercent = document.querySelector(".loading__precent");
    progress.style.width = `${percent}%`;
    textPercent.textContent = `${percent}%`;
  }

  function hideLoading() {
    const body = document.querySelector("body");
    body.classList.add("--is-loaded");
  }
  new imagesLoaded(container)

    .on("progress", (instance) => {
      loadedCount++;
      percent = Math.floor((loadedCount / imgs) * 100);
      handleLoading(percent);
    })
    .on("always", (instance) => {
      console.log("always");
    })
    .on("fail", (instance) => {
      console.log("fail");
    })
    .on("done", (instance) => {
      console.log("done");
      hideLoading();
    });
}
inItLoading();

// POST LIST
function handleTabPostList() {
  let tabs = document.querySelectorAll(".post__tabs-item"),
    newLists = document.querySelectorAll(".post .post__wrap .post__lists");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (tab) {
        tab.classList.remove("--selected");
      });

      this.classList.add("--selected");

      newLists.forEach(function (newList) {
        newList.classList.remove("--active");
      });

      let id = this.dataset.tab;
      document.querySelector(".post__lists-" + id).classList.add("--active");
    });
  });
}
handleTabPostList();

// ACCORDION
function handleAccordion() {
  const accordions = document.querySelectorAll(".accordion__list-item");

  function removeActive(index1) {
    accordions.forEach((item2, index2) => {
      if (index1 != index2) {
        item2.classList.remove("--show");
        let answer = item2.querySelector(".answer");
        answer.style.maxHeight = null;
      }
    });
  }

  accordions.forEach(function (item, index) {
    item.addEventListener("click", () => {
      item.classList.toggle("--show");
      let answer = item.querySelector(".answer");
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
      removeActive(index);
    });
  });
}
handleAccordion();

// FORM VALIDATE
function Validator(options) {
  function valiate(inputElement, rule) {
    var errorMessage = rule.test(inputElement.value);
    var errorElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("--invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("--invalid");
    }
  }

  // lấy element của form cần validate
  var formElement = document.querySelector(options.form);

  if (formElement) {
    //khi submit form
    formElement.onsubmit = function (e) {
      e.preventDefault();

      // lặp qua từn rule và validate
      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        valiate(inputElement, rule);
      });
    };

    // lặp qua và xử lí
    options.rules.forEach(function (rule) {
      var inputElement = formElement.querySelector(rule.selector);
      var errorElement = inputElement.parentElement.querySelector(
        options.errorSelector
      );

      if (inputElement) {
        // xử lí trường hợp blur khỏi input
        inputElement.onblur = function () {
          valiate(inputElement, rule);
        };
        // Xử lí khi người dùng nhập
        inputElement.oninput = function () {
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("--invalid");
        };
      }
    });
  }
}
// Nguyên tắc của rules:
// 1. khi có lỗi -> trả ra mess lỗi
// 2. khi hợp lệ -> ko trả tra gì cả ( undefined)
Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "Please fill out this field";
    },
  };
};

Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "This field must be email !";
    },
  };
};

Validator({
  form: "#formgroupjs",
  formGroupSelector: ".formgroup__input",
  errorSelector: ".form-error",
  rules: [
    Validator.isRequired("#name"),
    Validator.isEmail("#email"),
    Validator.isRequired("#subject"),
    Validator.isRequired("#message"),
  ],
});

Validator({
  form: "#formsubjs",
  formGroupSelector: ".formsub",
  errorSelector: ".form-error",
  rules: [Validator.isEmail("#subscribe")],
});
