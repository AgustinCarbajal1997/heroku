const express = require("express");
const router = express.Router();
const ContainerAuth = require("../containers/ContainerAuth");
const ContainerUsers = require("../containers/ContainerUsers");
const Auth = new ContainerAuth();
const Users = new ContainerUsers()


router.post("/signup", (req, res) => {
    const { mail, name, lastname, address, cellphone, password } = req.body;
    const newUser = { mail, name, lastname, address, cellphone, password };
    Auth.signup(newUser)
        .then((data)=> res.json(data))
        .catch((error)=> res.status(404).json(error))
})

router.post("/login", (req, res)=>{
    const { mail, password } = req.body;
    const dataUser = { mail, password };
    Auth.login(dataUser)
        .then((data)=> res.json(data))
        .catch((error)=> console.log("Ha ocurrido un error", error))
})

router.get("/dataUser", Auth.auth, (req, res)=>{
    Users.getDataUser(req.user.id)
        .then((data)=> res.json(data))
        .catch((error)=> console.log("Ha ocurrido un error", error))
})





module.exports = router;