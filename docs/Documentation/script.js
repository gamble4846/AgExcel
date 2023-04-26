window.addEventListener("scroll", highlight);
let hamburgerIcon = document.getElementsByClassName("hamburger");
let mediaQuery = window.matchMedia("(min-width: 1000px)")
mediaQuery.addListener(cleanState);

function cleanState(x) {
  let nav = document.getElementById("navbar");

  if (x.matches) {
    nav.classList.remove("hide");
    hamburgerIcon[0].classList.replace("fa-times", "fa-bars");
  }
}

function hamburger() {
  let nav = document.getElementById("navbar");

  nav.classList.toggle("hide");

  if (hamburgerIcon[0].classList.contains("fa-bars")) {
    hamburgerIcon[0].classList.replace("fa-bars", "fa-times");
  } else {
    hamburgerIcon[0].classList.replace("fa-times", "fa-bars");
  }
}

function highlight() {
  const sections = document.querySelectorAll(".main-section");
  let scrollY = window.pageYOffset;

  sections.forEach(curr => {
    const sectionHeight = curr.offsetHeight;
    const sectionTop = curr.offsetTop - 250;

    let sectionId = curr.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector("#navbar a[href*=" + sectionId + "]").classList.add("active");
    } else {
      document.querySelector("#navbar a[href*=" + sectionId + "]").classList.remove("active");
    }
  });
}

function search() {
  let sections = document.querySelectorAll(".main-section");
  let searchQuery = document.getElementById("searchbar").value;
  let noMatch = document.getElementById("no-match");
  let navItems = document.querySelectorAll(".nav-link");
  let counter = 0;

  for (var i = 0; i < sections.length; i++) {
    if (!sections[i].innerText.toLowerCase().includes(searchQuery.toLowerCase())) {
      sections[i].classList.add("hidden");
      navItems[i].classList.add("hidden");
      counter++;
    } else {
      counter = 0;
      sections[i].classList.remove("hidden");
      navItems[i].classList.remove("hidden");
    }

    if (counter === sections.length) {
      noMatch.classList.remove("hidden");
    } else {
      noMatch.classList.add("hidden");
    }
  }
}