D "Nữ";
(async () => {
  const womanProductdatas = await (await fetch("/api/woman")).json();
  let womanProduct = "";
  for (let i of womanProductdatas) {
    womanProduct =
      womanProduct +
      `
        <div class="col l-3 m-6 c-6 product__list--item">
        <a href="/product/${i.id}">
          <img src="${i.image1}" alt="" class="product__list--img"/>
        </a>
        <div class="product__text">
          <a href="/product/${i.id}">${i.title}</a>
          <span>${i.price}</span>
        </div>
        <div class="product__list--details">
          <img
            class="product__list--img"
            src="${i.image2}"
            alt=""
          />
        </div>
      </div>
        `;
  }
  $("#womanProductList").append(womanProduct);
})();
