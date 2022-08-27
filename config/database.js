const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb+srv://guilherme09396:<>@cluster0.32zfjqo.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Conectado ao mongodb")
}).catch((err) => {
  console.log(`Houve um erro: ${err}`)
})
