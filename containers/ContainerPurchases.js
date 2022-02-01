const User = require("../models/user");
const Purchase = require("../models/purchases");
class ContainerPurchases {
  async getPurchases(userId) {
    try {
      const dataUser = await User.findById(userId);
      if (!dataUser.purchases.length) return { message: "No purchases yet" };
      const dataPurchases = await Purchase.find({
        _id: { $in: [...dataUser.purchases] },
      });
      return { dataPurchases };
    } catch (error) {
      throw { message: `Something have gone wrong. ${error}` };
    }
  }

  async confirmPurchase(userId) {
    try {
      const dataUser = await User.findById(userId);
      const total = dataUser.cart.reduce(
        (ac, item) => ac + item.unites * item.price,
        0
      );
      const newPurchase = new Purchase({
        products: dataUser.cart,
        total,
      });
      const dataPurchase = await newPurchase.save();
      console.log(dataPurchase.id);
      const addPurchaseUser = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            purchases: dataPurchase.id,
          },
          $set:{
              cart:[]
          }
        },
        { new: true }
      );
      return {
        message: "Purchase successfully finished",
        purchasesId: addPurchaseUser.purchases,
      };
    } catch (error) {
      throw { message: `Something have gone wrong. ${error}` };
    }
  }
}

module.exports = ContainerPurchases;
