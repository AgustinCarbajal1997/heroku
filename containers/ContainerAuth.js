const User = require("../models/user");
const config = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const REGULAR_EXPRESSIONS = require("../constants/regex");
class ContainerAuth {
  generateToken(dataUser) {
    const token = jwt.sign({ data: dataUser }, config.jwt.PRIVATE_KEY, {
      expiresIn: "24h",
    });
    return token;
  }

  auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        error: "No autenticado",
      });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, config.jwt.PRIVATE_KEY, (error, decoded) => {
      if (error) {
        return res.status(403).json({
          error: "No autorizado",
        });
      }
      req.user = decoded.data;
      next();
    });
  }

  formValidation(dataUser) {
    let validationErrors = 0;
    const validationFields = Object.keys(dataUser).reduce((ac, item) => {
      const regex = dataUser[item]
        ? REGULAR_EXPRESSIONS[item][0].test(dataUser[item])
        : false;
      if (!regex) validationErrors++;
      return {
        ...ac,
        [item]: [
          regex,
          regex ? "Successful validation." : REGULAR_EXPRESSIONS[item][1],
        ],
      };
    }, {});
    return { validationErrors, validationFields };
  }

  async signup(dataUser) {
    try {
      let validation = this.formValidation(dataUser);
      if (validation.validationErrors) {
        let validation_info = Object.keys(validation.validationFields).reduce(
          (ac, item) => {
            return validation.validationFields[item][0]
              ? { ...ac }
              : { ...ac, [item]: validation.validationFields[item] };
          },
          {}
        );
        return validation_info;
      }
      const existUser = await User.find({ mail:dataUser.mail });
      if(existUser.length) return { message: "Mail already exists" }
      const newUser = new User(dataUser);
      await newUser.save();
      return { message: "Successfully registered" };
    } catch (error) {
      throw { message: `Something have gone wrong. ${error}` };
    }
  }

  async login(dataUser) {
    try {
      let data = await User.findOne({ mail: dataUser.mail });
      const match = await bcrypt.compare(dataUser.password, data.password);
      if (!match) return { message: "Usuario o contraseña incorrecto" };
      return {
        message: "Successful login",
        access_token: this.generateToken({ user: data.userName, id: data.id }),
      };
    } catch (error) {
      throw { message: `Something have gone wrong. ${error}` };
    }
  }
}
module.exports = ContainerAuth;
