const User = require("../models/user");

class ContainerCarts {
  async getCart(userId) {
    try {
      const data = await User.findById(userId);
      return { cart: data.cart };
    } catch (error) {
      throw { message: `Something have gone wrong. ${error}` };
    }
  }

  async updateCart(userId, dataProduct) {
    try {
      const queryUpdate = {
        "$push": {
          cart: dataProduct,
        },
      };
      const data = await User.findByIdAndUpdate(userId, queryUpdate, {
        new: true,
      });
      return { cart: data.cart };
    } catch (error) {
      throw { message: `Something have gone wrong. ${error}` };
    }
  }

  async deleteProductCart(userId, productId) {
    try {
      const queryDelete = {
        "$pull": {
          cart: {
            productId,
          },
        },
      };
      const data = await User.findByIdAndUpdate(userId, queryDelete, {
        new: true,
      });
      return { cart: data.cart };
    } catch (error) {
      throw { message: `Something have gone wrong. ${error}` };
    }
  }
}

module.exports = ContainerCarts;
