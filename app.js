const express = require("express");
const app = express();
const path = require("path");
require("./config/database");
const checklistRouter = require("./src/routes/checklist");
const methodOverride = require("method-override");
const taskRouter = require("./src/routes/task");

//Config
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(methodOverride("_method", {methods: ["POST", "GET"]}))


app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Rotas
app.get("/", (req, res) => {
  res.render("pages/index")
})
app.use("/", checklistRouter)
app.use("/", taskRouter)

app.listen(2000, () => {
  console.log("Servidor rodando")
})