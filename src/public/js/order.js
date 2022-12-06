const token1 = window.localStorage.getItem("token");
document.title = "Thanh Toán";
document.addEventListener("DOMContentLoaded", () => {
  const orderSummary = $(".summary");
  const cartDetail = $(".cartDetail");
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
        let summary = 0;
        for (let i of listCartItems) {
          summary += Number(i.total_money);
        }
        summary = summary.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        });
        let total = Number(summary.match(/\d/g).join("")) + Number(40000);
        total = total.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        });
        orderSummary.append(`
              <div class="item">
                  <span class="title">${listCartItems.length} SẢN PHẨM</span>
                  <span class="price">${summary}</span>
               </div>
              <div class="shipping">
                  <span class="title">GIAO HÀNG</span>
                  <span class="price">40.000 VND</span>
              </div>
              <hr>
              <div class="total">
                  <span class="title">TỔNG</span>
                  <span class="price" id="price">${total}</span>
              </div>
        `);
        let products = "";
        for (let i of listCartItems) {
          products += `
                <div class="product__detail">
                    <img src="${i.image2}" alt="">
                    <div class="product__detail--text">
                        <span>${i.title}</span>
                        <span>Quantity: ${i.quantity}</span>
                        <span>${i.price}</span>
                    </div>
                </div>
            `;
        }
        cartDetail.append(products);
      } catch (err) {
        alert(err.message);
      }
    }
  })();

  $(document).ready(function () {
    //-------------------------------SELECT CASCADING-------------------------//
    var selectedCountry = (selectedRegion = selectedCity = "");
    // This is a demo API key for testing purposes. You should rather request your API key (free) from http://battuta.medunes.net/
    var BATTUTA_KEY = "00000000000000000000000000000000";
    // Populate country select box from battuta API
    url =
      "https://battuta.medunes.net/api/country/all/?key=" +
      BATTUTA_KEY +
      "&callback=?";

    // EXTRACT JSON DATA.
    $.getJSON(url, function (data) {
      $.each(data, function (index, value) {
        // APPEND OR INSERT DATA TO SELECT ELEMENT.
        $("#country").append(
          '<option value="' +
            value.code +
            '" data-country="' +
            value.name +
            '">' +
            value.name +
            "</option>"
        );
      });
    });
    // Country selected --> update region list .
    $("#country").change(function () {
      selectedCountry = this.options[this.selectedIndex].text;
      countryCode = $("#country").val();
      // Populate country select box from battuta API
      url =
        "https://battuta.medunes.net/api/region/" +
        countryCode +
        "/all/?key=" +
        BATTUTA_KEY +
        "&callback=?";
      $.getJSON(url, function (data) {
        $("#region option").remove();
        $("#region").append(
          '<option value="">Please select your region</option>'
        );
        $.each(data, function (index, value) {
          // APPEND OR INSERT DATA TO SELECT ELEMENT.
          $("#region").append(
            '<option value="' +
              value.region +
              '" >' +
              value.region +
              "</option>"
          );
        });
      });
    });

    // Region selected --> updated city list
    $("#region").on("change", function () {
      selectedRegion = this.options[this.selectedIndex].text;
      // Populate country select box from battuta API
      countryCode = $("#country").val();
      region = $("#region").val();
      url =
        "https://battuta.medunes.net/api/city/" +
        countryCode +
        "/search/?region=" +
        region +
        "&key=" +
        BATTUTA_KEY +
        "&callback=?";
      $.getJSON(url, function (data) {
        $("#city option").remove();
        $("#city").append('<option value="">Please select your city</option>');
        $.each(data, function (index, value) {
          // APPEND OR INSERT DATA TO SELECT ELEMENT.
          $("#city").append(
            '<option value="' + value.city + '">' + value.city + "</option>"
          );
        });
      });
    });
    // city selected --> update location string
    $("#city").on("change", function () {
      selectedCity = this.options[this.selectedIndex].text;
      $("#location").html(
        "Locatation: Country: " +
          selectedCountry +
          ", Region: " +
          selectedRegion +
          ", City: " +
          selectedCity
      );
    });
  });

  $("#city").on("change", function () {
    city = this.value;
    $("#address").val(" - " + city + $("#address").val());
  });
  $("#country").on("change", function () {
    const $option = $(this).find(":selected");
    country = $option.data("country");
    $("#address").val($("#address").val() + " - " + country);
  });
  $("#region").on("change", function () {
    let region = this.value;
    $("#address").val(" - " + region + $("#address").val());
  });
});
