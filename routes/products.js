const express = require("express");
const router = express.Router();
const ContainerProducts = require("../containers/ContainerProducts");
const ContainerAuthentication  = require("../containers/ContainerAuth");
const ContainerProduct = new ContainerProducts();
const ContainerAuth = new ContainerAuthentication();

router.get("/all", (req, res) => {
  ContainerProduct.getAll()
    .then((data) => res.json(data))
    .catch((error) => console.log("Ocurrio un error", error));
});

router.get("/getById/:id", (req, res) => {
  ContainerProduct.getById(req.params.id)
    .then((data) => {
      let visits = req.session.visits || [];
      req.session.visits = ContainerProduct.saveSessionProducts(visits, req.params.id);
      res.json(data);
    })
    .catch((error) => console.log("Ocurrio un error", error));
});

router.get("/getSeveralIds", (req,res)=>{
  const { q } = req.query;
  ContainerProduct.getSeveralIds(q)
    .then((data)=> res.json(data))
    .catch((error) => console.log("Ocurrio un error", error));
})

router.get("/getByDiscount/:discount", (req, res) => {
  ContainerProduct.getByDiscount(req.params.discount)
    .then((data) => res.json(data))
    .catch((error) => console.log("Ha ocurrido un error"));
});

router.get("/getByCategory/:category", (req, res) => {
  const { category } = req.params;
  const { orderBy } = req.query;
  const brandType = req.query.brandType || [/^/];
  ContainerProduct.getByCategory(category, orderBy, brandType)
    .then((data) => res.json(data))
    .catch((error) => console.log(`Ha ocurrido un error`));
});

router.get("/generalSearch", (req, res) => {
  const { q, limit } = req.query;
  if (!q || !q.length || !q[0].length) {
    return res
      .status(400)
      .json({ error: "No ha introducido parametros de búsqueda" });
  }
  ContainerProduct.generalSearch(q, limit)
    .then((data) => res.json(data))
    .catch((error) => console.log("Ocurrio un error", error));
});

router.get("/getVisits", (req, res)=>{
  if(!req.session.visits) return res.json({ message:"No recently visited products" });
  ContainerProduct.getVisitedProducts(req.session.visits)
    .then((data)=> res.json(data))
    .catch((error)=> console.log("Ocurrio un error"))
})

router.get("/getComparison", (req, res)=>{
  ContainerProduct.getComparison(req.query.q)
    .then((data)=> res.json(data))
    .catch((error)=> res.status(400).json(error))
  
})
router.get("/getFavorites", ContainerAuth.auth, (req, res)=>{
  const { id:userId } = req.user;
  ContainerProduct.getFavorites(userId)
    .then((data) => res.json(data))
    .catch((error)=> res.status(404).json(error))
})
router.put("/setFavorites", ContainerAuth.auth, (req,res)=>{
  const { productId } = req.body;
  const { id:userId } = req.user;
  if(!userId || !productId) return res.status(400).json({ message:"Bad request. Insert an userId and a productId" });
  ContainerProduct.setFavorites(userId, productId)
    .then((data) => res.json(data))
    .catch((error)=> res.status(404).json(error))
})

module.exports = router;
