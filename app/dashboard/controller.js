const Category = require("../category/model");
const Transaction = require("../transaction/model");
const Voucher = require("../voucher/model");
const Player = require("../player/model");

module.exports = {
  index: async (req, res) => {
    try {
      const transaction = await Transaction.countDocuments();
      const voucher = await Voucher.countDocuments();
      const player = await Player.countDocuments();
      const category = await Category.countDocuments();
      res.render("admin/dashboard/view_dashboard.ejs", {
        name: req.session.user.name,
        title: "Halaman Dashboard",
        count: {
          transaction,
          voucher,
          player,
          category,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
