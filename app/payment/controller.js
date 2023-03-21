const Bank = require("../bank/model");
const Payment = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const payment = await Payment.find().populate("banks");

      res.render("admin/payment/view_payment", {
        payment,
        alert,
        name: req.session.user.name,
        title: "Halaman Pembayaran",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/payment");
    }
  },
  viewCreate: async (req, res) => {
    try {
      const banks = await Bank.find();
      res.render("admin/payment/create", {
        banks,
        name: req.session.user.name,
        title: "Halaman Tambah Pembayaran",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/payment");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { type, banks } = req.body;

      let payment = await Payment({ type, banks });
      await payment.save();

      req.flash("alertMessage", "Berhasil tambah payment");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/payment");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const payment = await Payment.findOne({ _id: id }).populate("banks");
      const banks = await Bank.find();
      res.render("admin/payment/edit", {
        payment,
        banks,
        name: req.session.user.name,
        title: "Halaman Edit Pembayaran",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/payment");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { banks, type } = req.body;

      await Payment.findOneAndUpdate({ _id: id }, { banks, type });

      req.flash("alertMessage", "Berhasil ubah payment");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/payment");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Payment.findOneAndRemove({ _id: id });

      req.flash("alertMessage", "Berhasil hapus payment");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/payment");
    }
  },
};
