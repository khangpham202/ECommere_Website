document.title = "Nam";
(async () => {
  const manProductdatas = await (await fetch("/api/man")).json();
  let manProduct = "";
  for (let i of manProductdatas) {
    manProduct =
      manProduct +
      `
      <div class="col l-3 m-6 c-6 product__list--item">
      <a href="/product/${i.id}">
        <img
          src="${i.image1}"
          alt=""
          class="product__list--img"
        />
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
  $("#manProductList").append(manProduct);
})();
