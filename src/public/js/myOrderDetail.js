const token1 = window.localStorage.getItem("token");
document.addEventListener("DOMContentLoaded", () => {
  (async () => {
    const urlId = window.location.href.split("/").at(-1);
    if (!Number(urlId)) {
      window.location.href = "/";
    }
    if (token1) {
      try {
        const myOrderDetails = await (
          await fetch(`/api/order/${urlId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token1,
            },
          })
        ).json();
        document.title =
          "Chi Tiết Đơn Hàng - Mã Đơn Hàng: " + myOrderDetails[0].orderId;

        $("#orderDetail_header--address").append(`
          <h3>Địa Chỉ Nhận Hàng</h3>
          <div class="address_detail">
              <p>${myOrderDetails[0].fullname}</p>
              <p>${myOrderDetails[0].phone_number}</p>
              <p>${myOrderDetails[0].address}</p>
          </div>
        `);
        $("#orderDetail_content").append(`
          <h3>Mã Đơn Hàng : ${myOrderDetails[0].orderId}</h3>
          <hr>
        `);
        let totalProductPrice = 0;
        let orderDetailProductList = "";
        let a = myOrderDetails[0].total_money;
        var total_money = Number(a.match(/\d/g).join(""));
        total_money = total_money.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        });
        for (let i of myOrderDetails) {
          let a = i.price;
          var price = Number(a.match(/\d/g).join(""));
          totalProductPrice += price * i.sum;
          console.log(price);
          orderDetailProductList += `
            <ul class="order__content--list">
              <li class="order__content--item row">
                  <div class="col-md-2">
                      <img src="${i.image2}" alt="" class="product_image">
                  </div>
                  <div class="col-md-8 product_detail">
                      <span >${i.title}</span>
                      <span class="product_count">Số lượng: ${i.sum}</span>
                  </div>
                  <div class="col-md-2">
                      <span class="product_price">${i.price}</span>
                  </div>
              </li>
            </ul>
          `;
        }
        totalProductPrice = totalProductPrice.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        });
        $("#orderDetail_content").append(orderDetailProductList);
        $("#orderDetail_price").append(`
          <table>
            <tr>
                <th>Tổng tiền hàng</th>
                <td>${totalProductPrice}</td>
            </tr>
            <tr>
                <th>Phí vận chuyển</th>
                <td>40.000 VND</td>
            </tr>
            <tr>
                <th>Tổng số tiền</th>
                <td class="total_money">${total_money}</td>
            </tr>
            <tr>
                <th>Phương thức thanh toán</th>
                <td>Thanh toán khi nhận hàng</td>
            </tr>    
          </table>
        `);
      } catch (err) {
        console.log(err);
      }
    }
  })();
});

async function deleteOrder(id) {
  const urlId = window.location.href.split("/").at(-1);
  try {
    await (
      await fetch(`/api/order/${urlId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token1,
        },
      })
    ).json();
    swal("Huỷ thành công !!", "", "success").then(() => {
      window.location.href = "/order";
    });
  } catch (e) {
    console.log(e);
  }
}
