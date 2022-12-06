document.title = "Floda";
(async () => {
  // womanProduct
  const manProductdatas = await (await fetch("/api/man")).json();
  let manProduct = "";
  for (let i = 0; i < 8; i++) {
    manProduct =
      manProduct +
      `
    <div class="col l-3 m-6 c-6 product__list--item">
    <a href="/product/${manProductdatas[i].id}">
      <img
        src="${manProductdatas[i].image1}"
        alt=""
        class="product__list--img"
      />
    </a>
    <div class="product__text">
    <a href= "/product/${manProductdatas[i].id}">${manProductdatas[i].title}</a>
      <span>${manProductdatas[i].price}</span>
    </div>
    <div class="product__list--details">
     <a href="/product/${manProductdatas[i].id}">
        <img
        class="product__list--img"
        src="${manProductdatas[i].image2}"
        alt=""
        />
     </a>
    </div>
  </div>
    `;
  }
  $("#man__product--list").append(manProduct);

  // Woman product
  const womanProductdatas = await (await fetch("/api/woman")).json();
  let womanProduct = "";
  for (let i = 0; i < 8; i++) {
    womanProduct =
      womanProduct +
      `
    <div class="col l-3 m-6 c-6 product__list--item">
    <a href="/product/${womanProductdatas[i].id}">
      <img
        src="${womanProductdatas[i].image1}"
        alt=""
        class="product__list--img"
      />
    </a>
    <div class="product__text">
    <a href= "/product/${womanProductdatas[i].id}">${womanProductdatas[i].title}</a>
      <span>${womanProductdatas[i].price}</span>
    </div>
    <div class="product__list--details">
     <a href="/product/${womanProductdatas[i].id}">
        <img
        class="product__list--img"
        src="${womanProductdatas[i].image2}"
        alt=""
        />
     </a>
    </div>
  </div>
    `;
  }
  $("#woman__product--list").append(womanProduct);
})();
