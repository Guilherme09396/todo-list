const express = require("express");
const router = express.Router();
const Checklist = require("../models/Checklist");

router.get("/checklists", (req, res) => {
  Checklist.find({}).then((checks) => {
    res.status(200).render("checklist/index", {checks: checks})
  }).catch((err) => {
    res.sendStatus(400)
  })
})

router.get("/checklist/new", (req, res) => {
  const check = new Checklist();
  res.status(200).render("checklist/new", {check: check})
})

router.get("/checklist/:id", (req, res) => {
  Checklist.findById(req.params.id).populate("task").then((check) => {
    if(check != undefined) {
      res.status(200).render("checklist/show", {check: check})
    } else {
      res.sendStatus(404);
    }

  }).catch((err) => {
    res.status(400).json({err: "Houve um erro inesperado"})
  })
})



router.post("/checklist", (req, res) => {
  const {name} = req.body;

  Checklist.create({name}).then(() => {
    res.status(201).redirect("/checklists")
  }).catch((err) => {
    res.status(400).json({err: `Houve um erro ao salvar checklist`})
  })
})

router.get("/checklist/edit/:id", (req, res) => {
  Checklist.findById(req.params.id).then((check) => {
    res.status(200).render("checklist/edit", {check: check})
  })
})


router.put("/checklist/:id", (req, res) => {
  const {name} = req.body;
  Checklist.findByIdAndUpdate(req.params.id, {name}).then(() => {
    res.status(200).redirect("/checklists")
  }).catch((err) => {
    res.status(400).json({err: "Houve um erro ao editar checklist"})
  })
})

router.delete("/checklist/:id", (req, res) => {
  Checklist.findByIdAndRemove(req.params.id).then(() => {
    res.status(200).redirect("/checklists")
  }).catch((err) => {
    res.status(400).json({err: "Houve um erro ao remover checklist"})
  })
})

module.exports = router;