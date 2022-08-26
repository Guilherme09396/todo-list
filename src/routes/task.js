const express = require("express");
const Checklist = require("../models/Checklist");
const router = express.Router();
const Task = require("../models/Task");

router.get("/checklist/:id/task", (req, res) => {
  res.status(200).render("task/new", {check_id: req.params.id})
})

router.post("/checklist/:id/task", (req, res) => {
  const {name} = req.body;

  Task.create({name: name, checklist: req.params.id}).then((task) => {
    Checklist.findById(req.params.id).then((check) => {
      check.task.push(task)
      check.save().then(() => {
        res.redirect(`/checklist/${check._id}`)
      })
    }).catch((err) => {
      res.status(400).json({err: "Houve um erro interno"})
    })
  }).catch((err) => {
    res.status(400).json({err: "Houve um erro ao salvar task"})
  })
})

router.delete("/task/:id", (req, res) => {

  Task.findByIdAndRemove(req.params.id).then((task) => {

    Checklist.findById(task.checklist).then((check) => {
      const indexTask = check.task.indexOf(task._id);
      check.task.splice(indexTask, 1);
      check.save();
    }).catch((err) => {
      res.status(400).json({err: "Houve um erro ao remover task do checklist"})
    })
    res.status(200).redirect(`/checklist/${task.checklist}`)
  }).catch((err) => {
    res.status(400).json({err: "Houve um erro ao remover task"})
  })
})

module.exports = router;