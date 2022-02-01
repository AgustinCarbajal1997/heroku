const express = require("express");
const router = express.Router();
const ContainerCarts = require("../containers/ContainerCarts");
const ContainerAuthentication  = require("../containers/ContainerAuth");
const ContainerCart = new ContainerCarts();
const ContainerAuth = new ContainerAuthentication();

router.get("/getCart", ContainerAuth.auth, (req, res)=>{
    const { id:userId } = req.user;
    ContainerCart.getCart(userId)
        .then((data)=> res.json(data))
        .catch((error)=> res.status(404).json(error))
})

// FALTA VER COMO ACTUALIZAR

router.post("/postProductCart", ContainerAuth.auth, (req, res)=>{
    const { dataProduct } = req.body;
    const { id:userId } = req.user;
    ContainerCart.updateCart(userId, dataProduct)
        .then((data)=> res.json(data))
        .catch((error)=> res.status(404).json(error))
})

router.delete("/deleteProductCart", ContainerAuth.auth, (req,res)=>{
    const { productId } = req.body;
    const { id:userId } = req.user;
    ContainerCart.deleteProductCart(userId, productId)
        .then((data)=> res.json(data))
        .catch((error)=> res.status(404).json(error))
})



module.exports = router;