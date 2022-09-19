const selectElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw new Error(`Cannot find the element ${selector}`);
};
const form = selectElement("form");
const input = selectElement("input");
const dangerP = selectElement(".shorten .container .input-container p");
let divResult = selectElement(".shorten .container .result");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = input.value;

  if (url == "") {
    input.classList.add("danger");
    dangerP.classList.add("danger");
  } else {
    input.classList.remove("danger");
    dangerP.classList.remove("danger");
    shortenUrl(url);
  }
});
async function shortenUrl(url) {
  try {
    const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
    const data = await res.json();
    const newUrl = document.createElement("div");
    newUrl.innerHTML = `<p> ${url}</p> <p> ${data.result.short_link}</p>
   <button class="newUrl-btn btn" >Copy</button>
   `;
    divResult.prepend(newUrl);
    const copyBtns = divResult.querySelectorAll(".newUrl-btn");
    copyBtns.forEach((e) => {
      e.onclick = (e) => {
        console.log(e.previousElementSibling);
        // console.log(ele.previousElementSibling.textContent);
        // navigator.clipboard.writeText(ele.previousElementSibling.textContent);
      };
    });
    input.value = "";
  } catch (err) {
    console.log(err);
  }
}
