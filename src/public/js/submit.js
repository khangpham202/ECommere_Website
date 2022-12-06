async function confirmOrder() {
  let fullName = $("#fullName").val();
  let phoneNumber = $("#phoneNumber").val();
  let email = $("#email").val();
  let address = $("#address").val();
  let note = $("#notes").val();
  let total = $("#price").text();
  if (fullName && email && phoneNumber && address && note && total) {
    try {
      let orderDatas = await fetch("api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token1,
        },
        body: JSON.stringify({
          fullName,
          email,
          phoneNumber,
          address,
          note,
          total,
        }), // body data type must match "Content-Type" header
      });
      orderDatas = await orderDatas.json();
      if (orderDatas.message) {
        swal(`${orderDatas.message}`, "", "error");
      } else {
        swal("Đặt hàng thành công !!", "", "success").then(() => {
          window.location.href = "/";
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
}
