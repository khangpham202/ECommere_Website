const token1 = window.localStorage.getItem("token");
document.title = "Giỏ Hàng";
document.addEventListener("DOMContentLoaded", () => {
  const order = $("#Cart");
  const coverOrder = $("#Order");
  (async () => {
    if (token1) {
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
        order.append(`
          <div class="title">
            <div class="row">
                <div class="col"><h4><b>Giỏ Hàng</b></h4></div>
                <div class="col align-self-center text-right text-muted">${listCartItems.length} sản phẩm</div>
            </div>
           </div>
        `);
        let orderList = "";
        let summary = 0;
        for (let i of listCartItems) {
          summary += Number(i.total_money);
          orderList += `
            <div class="row border-top cartItem">
              <div class="row main align-items-center">
                  <div class="col-2"><img class="img-fluid" src="${i.image2}"></div>
                  <div class="col">
                      <div class="row text-muted">Shirt</div>
                      <div class="row productName">${i.title}</div>
                  </div>
                  <div class="col">
                      <div class="qty-container">
                      <button class="qty-btn-minus btn-light" type="button" onclick="subCartItemQuantity(${i.id_cart})">
                          -
                      </button>
                      <input type="text" id="${i.id_cart}" name="qty" value="${i.quantity}"  class="input-qty"/>
                      <button class="qty-btn-plus btn-light" type="button" onclick="addCartItemQuantity(${i.id_cart})">
                          +
                      </button>
                  </div>
                  </div>
                  <div class="col"><span>${i.price}</span>
                    <span class="ml-5" style="cursor:pointer;" data-toggle="tooltip" data-placement="bottom" title="Remove" onclick="removeCartItem(${i.id_cart})">&#10005;</span>
                  </div>
                </div>
              </div>
                      `;
        }
        order.append(orderList);
        order.append(`
         <div class="back-to-shop mt-2"><a href="/">&leftarrow;<span class="text-muted ml-1">Quay lại</span></a></div>
        `);
        summary = summary.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        });
        let total = Number(summary.match(/\d/g).join("")) + Number(40000);
        total = total.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        });
        coverOrder.append(`
          <div class="col-md-4 summary">
            <div><h5><b>Tóm tắt đơn hàng</b></h5></div>
            <hr>
            <div class="row">
                <div class="col" style="padding-left:0;">${listCartItems.length} SẢN PHẨM</div>
                <div id="summaryCartPrice" class="col text-right">${summary}</div>
            </div>
            <form>
                <p>GIAO HÀNG</p>
                <select><option class="text-muted">Giao hàng nhanh - 40.000&#8363</option></select>
                <p>MÃ GIẢM GIÁ</p>
                <input id="code" placeholder="Nhập mã">
            </form>
            <div class="row" style="border-top: 1px solid rgba(0,0,0,.1); padding: 2vh 0;">
                <div class="col">TỔNG</div>
                <div id="totalWithShipping" class="col text-right">${total}</div>
            </div>
            <a href="/shoppingCart/checkout"><button class="btn">THANH TOÁN</button></a>
          </div>
        `);
      } catch (err) {
        alert("Vui lòng đăng nhập !");
      }
    }
    var buttonPlus = $(".qty-btn-plus");
    var buttonMinus = $(".qty-btn-minus");

    var incrementPlus = buttonPlus.click(function () {
      var $n = $(this).parent(".qty-container").find(".input-qty");
      $n.val(Number($n.val()) + 1);
    });

    var incrementMinus = buttonMinus.click(function () {
      var $n = $(this).parent(".qty-container").find(".input-qty");
      var amount = Number($n.val());
      if (amount > 0) {
        $n.val(amount - 1);
      }
    });
  })();
})();

async function removeCartItem(cart_id) {
  try {
    await (
      await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token1,
        },
        body: JSON.stringify({ cart_id }),
      })
    ).json();
    swal("Xoá thành công !!", "", "success").then(() => {
      location.reload();
    });
  } catch (e) {
    console.log(e);
  }
}

async function addCartItemQuantity(cart_id) {
  try {
    var inp_qty = await $(`#${cart_id}`).val();
    inp_qty = Number(inp_qty) + 1;

    await (
      await fetch("/api/cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: token1,
        },
        body: JSON.stringify({ quantity: inp_qty, id: cart_id }),
      })
    ).json();
    const cartSummary = await (
      await fetch("/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token1,
        },
      })
    ).json();
    total_moneyy = 0;
    for (let i of cartSummary) {
      total_moneyy += Number(i.total_money);
    }
    total_moneyyWithShip = total_moneyy + Number(40000);
    total_moneyy = total_moneyy.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    total_moneyyWithShip = total_moneyyWithShip.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });

    $("#summaryCartPrice").text(`${total_moneyy}`);
    $("#totalWithShipping").text(`${total_moneyyWithShip}`);
  } catch (e) {
    console.log(e);
  }
}
async function subCartItemQuantity(cart_id) {
  try {
    var inp_qty = await $("input").data("id", cart_id).val();
    inp_qty = Number(inp_qty) - 1;

    await (
      await fetch("/api/cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: token1,
        },
        body: JSON.stringify({ quantity: inp_qty, id: cart_id }),
      })
    ).json();
    const cartSummaryy = await (
      await fetch("/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token1,
        },
      })
    ).json();
    total_moneyyy = 0;
    for (let i of cartSummaryy) {
      total_moneyyy += Number(i.total_money);
    }
    total_moneyyyWithShip = total_moneyyy + Number(40000);
    total_moneyyy = total_moneyyy.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    total_moneyyyWithShip = total_moneyyyWithShip.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    $("#summaryCartPrice").text(`${total_moneyyy}`);
    $("#totalWithShipping").text(`${total_moneyyyWithShip}`);
  } catch (e) {
    console.log(e);
  }
}
