// LOGIN-WINDOW::START
const loginButton = document.getElementById("login-button");
const loginWindow = document.getElementById("login-window");
const closeButton = document.getElementById("login-close-button");
const loginOverlay = document.getElementById("login-overlay");
const scrollArrow = document.getElementById("scrollToTop");

loginButton.addEventListener("click", () => {
  loginWindow.style.display = "flex";
  loginOverlay.classList.add("active");
  scrollArrow.style.display = "none";
});

closeButton.addEventListener("click", () => {
  closeLoginWindow();
});

// Clicking outside of the login window closes it.
loginOverlay.addEventListener("click", () => {
  closeLoginWindow();
});

function closeLoginWindow() {
  loginWindow.style.display = "none";
  loginOverlay.classList.remove("active");
}

// Closes the login window if 'esc' is pressed.
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeLoginWindow();
  }
});

// Closes the login window on page refresh (F5)
document.addEventListener("DOMContentLoaded", () => {
  closeLoginWindow();
});

// Stops email & pass from showing up in the site URL.
const displayForm = document.getElementById("display-form");

displayForm.addEventListener("submit", (event) => {
  event.preventDefault();
  window.location.href = "#";
  closeLoginWindow();
});
// LOGIN-WINDOW::END

// HEADER::START
const menuOverlay = document.getElementById("menu-overlay");
const menuBars = document.getElementById("menu-bars");
const sideMenu = document.getElementById("side-menu");
const menuCloseButton = document.getElementById("menu-close-button");
const htmlElement = document.querySelector('html');

menuBars.addEventListener("click", function() {
  // Disable scrolling outside the side menu 
  htmlElement.style.overflowY = "hidden";

  sideMenu.classList.add("show");
  menuOverlay.style.display = "block";
});

menuOverlay.addEventListener("click", function() {
  sideMenu.classList.remove("show");
  sideMenu.classList.toggle("menu-active");
  htmlElement.style.overflowY = "auto";
  menuOverlay.style.display = "none";
});

menuCloseButton.addEventListener("click", function() {
  sideMenu.classList.remove("show");
  sideMenu.classList.toggle("menu-active");
  menuOverlay.style.display = "none";
  htmlElement.style.overflowY = "auto";
});

// Makes the header blur the background if the page is scrolled down.
// Only in screens with witdh greater than 1300px.
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0 && window.innerWidth > 1300) {
    header.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.backgroundColor = "";
    header.style.backdropFilter = "";
  }
});
// HEADER::END

// SCROW-TO-TOP-ARROW::START
document.addEventListener("DOMContentLoaded", function() {
  var scrollToTopButton = document.getElementById("scrollToTop");

  // Show the button when the user scrolls down 20px
  window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollToTopButton.style.display = "block";
    } else {
      scrollToTopButton.style.display = "none";
    }
  };

  // Scroll to top when the button is clicked
  scrollToTopButton.addEventListener("click", function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
});
// SCROW-TO-TOP-ARROW::END

// MAIN-CATEGORIES::START
document.addEventListener("DOMContentLoaded", function() {
  const viewMoreButtons = document.querySelectorAll(".view-more");

  viewMoreButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      const additionalShows = this.parentElement.querySelectorAll(".show-additional");
      additionalShows.forEach(function(show) {
        show.classList.toggle("hidden");
      });

      if (this.innerText === "+ View More") {
        this.innerText = "- View Less";
      } else {
        this.innerText = "+ View More";
      }
    });
  });
});
// MAIN-CATEGORIES::END

// IMAGE-SLIDERS::START
var swiper = new Swiper(".home-slider", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 0,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiper = new Swiper(".trending-slider", {
  loop: false,
  slidesPerView: 2,
  spaceBetween: 0,
  centeredSlides: false,

  navigation: {
    nextEl: "#popular-button-next",
    prevEl: "#popular-button-prev",
  },

  breakpoints: {
    1368: {
      slidesPerView: 6,
      spaceBetween: 0,
    },
    991: {
      slidesPerView: 4,
      spaceBetween: 0,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 0,
    },
  },
});
// IMAGE-SLIDERS::END


// search system 

async function searchAnime() {
  const query = document.getElementById("anime-search").value.toLowerCase();
  const resultsContainer = document.getElementById("search-results");

  if (query === "") {
    resultsContainer.innerHTML = "";
    return;
  }

  try {
    const response = await fetch(`/anime`);
    const animeList = await response.json();

    const filteredAnimes = animeList.filter(anime => 
      anime.name.toLowerCase().includes(query)
    );

    resultsContainer.innerHTML = filteredAnimes.map(anime => 
      `<li onclick="goToAnime('${anime._id}')">${anime.name}</li>`
    ).join("");
  } catch (error) {
    console.error("Error fetching anime list:", error);
  }
}

function goToAnime(animeId) {
  window.location.href = `/anime/${animeId}`;
}
const searchIcon = document.getElementById("search-icon");
const searchContainer = document.querySelector(".search-container");

// عند النقر على أيقونة البحث
searchIcon.addEventListener("click", () => {
  if (searchContainer.style.display === "none" || !searchContainer.style.display) {
    searchContainer.style.display = "block"; // عرض شريط البحث
  } else {
    searchContainer.style.display = "none"; // إخفاء شريط البحث
  }
});
