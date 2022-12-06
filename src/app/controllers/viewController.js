class SiteController {
  // [GET] /
  index(req, res) {
    res.render("home");
  }
  //  [GET] / authentication
  authentication(req, res) {
    res.render("auth/login", { layout: false });
  }
  //  [GET] / shoppingCart
  shoppingCart(req, res) {
    res.render("individual/shoppingCart", { layout: false });
  }
  //  [GET] / checkOut
  checkOut(req, res) {
    res.render("individual/checkout", { layout: false });
  }
  //  [GET] / profile
  profile(req, res) {
    res.render("individual/profile");
  }
  //  [GET] / order
  order(req, res) {
    res.render("individual/order");
  }
  //  [GET] / order / : id
  orderDetail(req, res) {
    res.render("individual/myOrderDetail");
  }
  // [GET] / man
  man(req, res) {
    res.render("product/man");
  }
  // [GET] / woman
  woman(req, res) {
    res.render("product/woman");
  }

  // [GET] / children
  children(req, res) {
    res.render("product/children");
  }
  // [GET] / accessory
  accessory(req, res) {
    res.render("product/accessory");
  }
  // [GET] / contact
  contact(req, res) {
    res.render("contact");
  }
  // [GET] / product / :id
  product_detail(req, res) {
    res.render("product/product_detail");
  }
}

module.exports = new SiteController();
