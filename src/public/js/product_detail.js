let quantity = 0;
let product_id = "";
const token = window.localStorage.getItem("token");
(async () => {
  const urlId = window.location.href.split("/").at(-1);
  if (!Number(urlId)) {
    window.location.href = "/";
  }
  product_id = urlId;
  const data = await (await fetch(`/api/product_detail/${urlId}`)).json();
  if (!data.id) {
    window.location.href = "/";
  }
  document.title = data.title;
  $("#super_container").append(`
  <div class="single_product">
  <div class="container-fluid" style=" background-color: #fff; padding: 11px;">
      <div class="row">
          <div class="col-lg-2 order-lg-1 order-2 d-flex align-items-center">
              <ul class="image_list" >
                  <li class="image_list--item">
                    <img class="small_img" src="${data.image1}" alt="">
                  </li>
                  <li class="image_list--item">
                    <img class="small_img" src="${data.image2}" alt="">
                  </li>
              </ul>
          </div>
          <div class="col-lg-4 order-lg-2 order-1">
              <div class="image_selected">
                <img class="big__image" src="${data.image1}" alt="" ">
              </div>
          </div>
          <div class="col-lg-6 order-3 d-flex align-items-center">
              <div class="product_description">
                  <div class="product_name mb-3">${data.title}</div>
                  <div class="product-rating mb-3"><span class="badge badge-success"><i class="fa fa-star"></i> 4.5 Star</span> <span class="rating-review">35 Ratings & 45 Reviews</span></div>
                  <div> <span class="product_price mb-3">${data.price}</span> </div>
                  <hr>
                  <h3>${data.description}</h3>
                  <hr>
                  <div class="row mt-4">
                      <div class="col-xs-6 " style="margin-left: 13px;">
                          <div class="product_quantity"> <span>Số lượng: </span> <input id="quantity_input" value="0" type="text">
                              <div class="quantity_buttons">
                                  <div id="quantity_inc_button" class="quantity_inc quantity_control"><i class="fas fa-chevron-up"></i></div>
                                  <div id="quantity_dec_button" class="quantity_dec quantity_control"><i class="fas fa-chevron-down"></i></div>
                              </div>
                          </div>
                      </div>
                      <div class="col-xs-6 ml-0"> 
                        <button type="button" onclick="addToCart()" class="btn btn-primary shop-button">Thêm Vào Giỏ Hàng</button> 
                        <button type="button" class="btn btn-success shop-button">Mua Ngay</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
     
  </div>
</div>
  `);

  const imgList = document.querySelectorAll(".small_img");
  imgList.forEach((value) => {
    value.addEventListener("click", function handleClick() {
      const bigImage = document.querySelector(".big__image");
      const imgList_src = value.getAttribute("src");
      bigImage.setAttribute("src", imgList_src);
    });
  });

  $("#quantity_inc_button").click(function () {
    const newQty = +$("#quantity_input").val() + 1;
    quantity = newQty;
    $("#quantity_input").val(newQty);
  });

  $("#quantity_dec_button").click(function () {
    const newQty = +$("#quantity_input").val() - 1;
    quantity = newQty;
    if (newQty < 0) newQty = 0;
    $("#quantity_input").val(newQty);
  });
  const productDatas = await (await fetch("/api/products")).json();
  const relatedProduct1 = $("#relatedProduct1");
  let relatedProduct1List = [];
  let relatedProduct1template = "";
  for (let i = 0; i < 4; i++) {
    var item = productDatas[Math.floor(Math.random() * productDatas.length)];
    relatedProduct1List.push(item);
  }
  for (let i of relatedProduct1List) {
    relatedProduct1template += `
      <div class="col-sm-3">
        <div class="thumb-wrapper">
          <div class="img-box">
            <a href="/product/${i.id}">
                <img src="${i.image2}" class="img-fluid" alt="">
            </a>
          </div>
          <div class="thumb-content">
            <a href="/product/${i.id}"><h4>${i.title}</h4></a>
            <p class="item-price"><span>${i.price}</span></p>
            <div class="star-rating">
              <ul class="list-inline">
                <li class="list-inline-item"><i class="fa fa-star"></i></li>
                <li class="list-inline-item"><i class="fa fa-star"></i></li>
                <li class="list-inline-item"><i class="fa fa-star"></i></li>
                <li class="list-inline-item"><i class="fa fa-star"></i></li>
                <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
              </ul>
            </div>
            <a href="#" class="btn btn-primary mt-2">Thêm vào giỏ hàng</a>
          </div>						
        </div>
      </div>
    `;
  }
  relatedProduct1.append(relatedProduct1template);
})();

async function addProductToCart() {
  if (!token) {
    alert("Vui lòng đăng nhập!!!");
    return;
  }
  try {
    const cartDatas = await (
      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ quantity, product_id }),
      })
    ).json();
    if (cartDatas.message) {
      throw cartDatas.message;
    } else {
      return cartDatas;
    }
  } catch (e) {
    alert(e.message);
  }
}

async function addToCart() {
  if (quantity > 0) {
    const cartList = await addProductToCart();
    productCartList(cartList);
    swal("Thêm vào giỏ hàng thành công!", "", "success").then(() => {
      location.reload();
    });
  } else {
    swal("Vui lòng chọn số lượng lớn hơn 0 !!", "", "error");
  }
}

// Product Cart
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
}

$(document).ready(function () {
  if ($(".bbb_viewed_slider").length) {
    var viewedSlider = $(".bbb_viewed_slider");

    viewedSlider.owlCarousel({
      loop: true,
      margin: 30,
      autoplay: true,
      autoplayTimeout: 6000,
      nav: false,
      dots: false,
      responsive: {
        0: { items: 1 },
        575: { items: 2 },
        768: { items: 3 },
        991: { items: 4 },
        1199: { items: 6 },
      },
    });

    if ($(".bbb_viewed_prev").length) {
      var prev = $(".bbb_viewed_prev");
      prev.on("click", function () {
        viewedSlider.trigger("prev.owl.carousel");
      });
    }

    if ($(".bbb_viewed_next").length) {
      var next = $(".bbb_viewed_next");
      next.on("click", function () {
        viewedSlider.trigger("next.owl.carousel");
      });
    }
  }
});
