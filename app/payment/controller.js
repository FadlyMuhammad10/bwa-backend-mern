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
  // viewEdit: async (req, res) => {
  //   try {
  //     const { id } = req.params;

  //     const bank = await Bank.findOne({ _id: id });
  //     res.render("admin/bank/edit", {
  //       bank,
  //     });
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`);
  //     req.flash("alertStatus", `danger`);
  //     res.redirect("/bank");
  //   }
  // },
  // actionEdit: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { name, nameBank, noRekening } = req.body;

  //     await Bank.findOneAndUpdate({ _id: id }, { name, nameBank, noRekening });

  //     req.flash("alertMessage", "Berhasil ubah bank");
  //     req.flash("alertStatus", "success");

  //     res.redirect("/bank");
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`);
  //     req.flash("alertStatus", `danger`);
  //     res.redirect("/bank");
  //   }
  // },
  // actionDelete: async (req, res) => {
  //   try {
  //     const { id } = req.params;

  //     await Bank.findOneAndRemove({ _id: id });

  //     req.flash("alertMessage", "Berhasil hapus bank");
  //     req.flash("alertStatus", "success");

  //     res.redirect("/bank");
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`);
  //     req.flash("alertStatus", `danger`);
  //     res.redirect("/bank");
  //   }
  // },
};
