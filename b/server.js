const express = require("express");
const cors = require("cors"); 
const app = express();
const db = require("./models");
const user = require("./Controller/UserController");
const auth = require("./Controller/AuthController");
const admin = require("./Controller/AdminController");
const chat = require("./Controller/ChatController");


var corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/user', user);
app.use('/auth', auth);
app.use('/admin', admin);
app.use("/api", chat);


// db.sequelize
//   .sync({alter: true})
//   .then(() => { 
//   console.log("Synced db.");
//   })

//   .catch((err) => {
//   console.log("Failed to sync.db:" + err.message);
//   });


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
