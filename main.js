const selectElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw new Error(`Cannot find the element ${selector}`);
};
const header = selectElement("header");
const form = selectElement("form");
const input = selectElement("input");
const pError = selectElement(".shorten .container .input-container .error");
const divResult = selectElement(".shorten .container .result");
const links = selectElement(".links");
const menu = selectElement(".menu-icon");
// Menu
menu.onclick = function () {
  menu.classList.toggle("active");
  links.classList.toggle("active");
};

// Header
window.onscroll = () => {
  if (window.scrollY > 86) {
    header.classList.add("shadow");
  } else {
    header.classList.remove("shadow");
  }
};

// Form test url
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = input.value;

  if (url == "") {
    input.classList.add("danger");
    pError.classList.add("danger");
    pError.innerHTML = "please enter link";
  } else {
    input.classList.remove("danger");
    pError.classList.remove("danger");
    shortenUrl(url);
  }
});

// Shortener Url use Api
async function shortenUrl(url) {
  try {
    const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
    const data = await res.json();
    const newUrl = document.createElement("div");
    newUrl.innerHTML = `<p> ${url}</p> <p> ${data.result.short_link}</p>
   <button class="newUrl-btn btn" onclick="copyUrl(this)">Copy</button>
   `;
    divResult.prepend(newUrl);

    input.value = "";
  } catch (err) {
    console.log(err);
    input.classList.add("danger");
    pError.classList.add("danger");
    pError.innerHTML = "please enter a valid link";
  }
}

// Btn Copy Url
function copyUrl(clickedBtn) {
  let copyBtns = document.querySelectorAll(".newUrl-btn");
  copyBtns.forEach((e) => {
    e.classList.remove("active");
    e.innerHTML = "Copy";
  });
  clickedBtn.classList.add("active");
  clickedBtn.innerHTML = "Copied!";
  navigator.clipboard.writeText(clickedBtn.previousElementSibling.textContent);
}
