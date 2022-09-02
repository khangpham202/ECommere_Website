var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.setAttribute("style", "transform:translateX(0)");
};

span.onclick = function () {
  modal.setAttribute("style", "transform: translateX(-100%);");
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Toggle
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function myFuntion(event) {
  const parent = event.target.parentNode.parentNode;
  var dropdowns = parent.querySelector(".dropdown-content");
  const dropdownAll = document.querySelectorAll(".dropdown");

  if (dropdowns.classList.contains("show")) {
    dropdowns.classList.remove("show");
  } else {
    for (var i = 0; i < dropdownAll.length; i++) {
      dropdownAll[i]
        .querySelector(".dropdown-content")
        .classList.remove("show");
    }
    dropdowns.classList.add("show");
  }
}

document
  .querySelector(".header__icon--link--search")
  .addEventListener("click", (event) => {
    event.preventDefault();
  });
