document.addEventListener("DOMContentLoaded", () => {
  const token1 = window.localStorage.getItem("token");
  let headerCart = $("#header__icon--link--cart");
  if (!token1) {
    headerCart.append(`
    <div class="header__cart-no-cart">
      <img
        src="/img/no_cart.png"
        alt=""
        class="header__cart-no-cart-img"
      />
      <span class="header__cart-list-msg"> Chưa có sản phẩm </span>
    </div>`);
  } else {
    headerCart.append(`
    <div class="header__cart-has-cart">
       <h3>Sản phẩm mới thêm</h3>
       <hr>
       <ul class="productCart__list" id="productCart__list">
  
       </ul>
       <button type="button"  onclick="window.location.href='/shoppingCart';" class="btn btn-danger float-right">Xem giỏ hàng</button>
     </div>
     <div class="header_cart__count">
       <h3 id="header_cart__count--value"></h3>
     </div> `);
  }

  window.onscroll = function () {
    var header = document.getElementById("myHeader");
    var sticky = header.offsetTop;
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };

  // header button at mobile
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
  (async () => {
    const fullName = await localStorage.getItem("fullname");
    const headerList = document.getElementById("login");
    if (token1) {
      headerList.innerHTML = "";
      headerList.innerHTML = `
    <div class="d-flex justify-content-end">
        <div class="col l-4 dropdown d-flex ">
          <img src="/img/profile.jpg" alt="" class="user_img">
          <h4 href=""class="dropdown-toggle header__welcome" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           ${fullName}
          </h4> 
          <div class="dropdown-menu ml-4" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="/profile"><h3><small>Tài Khoản Của Tôi</small></h3></a>
          <a class="dropdown-item" href="/order"><h3><small>Đơn mua</small></h3></a>
          <a id="signOut" class="dropdown-item" href="#"><h3><small>Đăng Xuất</small></h3></a>
        </div>
    </div>
     `;
    }
    const signOut = document.getElementById("signOut");
    signOut.addEventListener("click", function (e) {
      localStorage.clear();
      location.reload();
    });
  })();

  async function productCartList1() {
    if (!token1) {
      productCartList([]);
    } else {
      try {
        const listCartItems = await (
          await fetch("/api/cart", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token1,
            },
          })
        ).json();
        productCartList(listCartItems);
      } catch (err) {
        alert("Vui lòng đăng nhập !");
      }
    }
  }

  productCartList1();
  function productCartList(cards) {
    let CartListItem = "";
    const productCartList = document.getElementById("productCart__list");
    productCartList.innerHTML = CartListItem;
    cards.forEach((card) => {
      CartListItem += `
      <li class="productCart__list--item">
        <img class="productCart__list--item-img" src="${card.image1}" alt="">
        <span class="productCart__list--item-name">${card.title}</span>
        <span class="productCart__list--item-price">${card.price}</span>
      </li>`;
    });
    productCartList.innerHTML += CartListItem;
    const productCartListItemCount = document.querySelectorAll(
      ".productCart__list--item"
    ).length;
    document.getElementById("header_cart__count--value").innerText =
      productCartListItemCount;
    if (productCartListItemCount == 0) {
      $(".header_cart__count").hide();
      $(".header__cart-has-cart").hide();
      headerCart.append(`
      <div class="header__cart-no-cart">
        <img
          src="/img/no_cart.png"
          alt=""
          class="header__cart-no-cart-img"
        />
        <span class="header__cart-list-msg"> Chưa có sản phẩm </span>
      </div>`);
    }
  }
});
