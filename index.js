const express = require("express");
const cors = require("cors");
const restaurantRouter = require("./routes/restaurant");
const userRoutes = require("./routes/user");

//Create Server
const app = express();

//Use Middleware
app.use(cors());
app.use(express.json());                                //ให้อ่านjsonได้
app.use(express.urlencoded({ extended: false }));       //ไม่ต้องเข้ารหัสurl

//Router
app.get("/", (req, res) => {
    res.send("<h1>This is Restaurant API</h1>");
});

//User Router
app.use("/apis", userRoutes);

//Restaurant router
app.use("/apis", restaurantRouter);

//Running Server
app.listen(5000, () => {
    console.log("Server listening to port 5000");
});