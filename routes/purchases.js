const express = require("express");
const router = express.Router();
const ContainerAuthentication = require("../containers/ContainerAuth");
const ContainerPurchases = require("../containers/ContainerPurchases");
const ContainerPurchase = new ContainerPurchases();
const ContainerAuth = new ContainerAuthentication();

router.get("/getPurchases", ContainerAuth.auth, (req, res)=>{
    const { id:userId } = req.user;
    ContainerPurchase.getPurchases(userId)
        .then((data)=>res.json(data))
        .catch((error)=> res.status(404).json(error))
})

router.get("/confirmPurchase", ContainerAuth.auth, (req, res)=>{
    const { id:userId } = req.user;
    ContainerPurchase.confirmPurchase(userId)
        .then((data)=> res.json(data))
        .catch((error)=> res.status(404).json(error))
})



module.exports = router;