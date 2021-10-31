const express = require('express'); //เรียกใช้ฟังก์ชัน express
const routers = express.Router();   //เรียกใช้ฟังก์ชัน router
const users = require("../databaseuser"); //เก็บไว้ในตัวแปร restaurants

//http://localhost:5000/apis/restaurants    //แบบPOST
routers.post("/user", (req, res) => {
    const newUser = { //insertตัวใหม่
        ...req.body, //สลายโครงสร้าง แล้วมาสร้างของตัวเอง
    };
    //console.log(newRestaurant);
    //เพิ่มData ตัวใหม่
    users.push(newUser)
    res.json(newUser);
});

//GET all restaurants   //รายการอาหาร
routers.get("/user", (req, res) => {
    res.json(users);
});

//GET restaurants by ID
routers.get("/user/:id", (req, res) => {
    const userId = Number.parseInt(req.params.id);
    //console.log(restaurantId);
    const user = users.find(
        (user) => user.id === userId  //ต้องIDเหมือนกัน ถึงจะreturnให้ เก็บไว้ในrestaurant
    );
    res.json(user);
});

//http://localhost:5000/apis/restaurants/1    //แบบID
// router.get("/restaurants/:id", (req, res) => {
//     res.send("<h3>GET Reataurant by ID API</h3>");
// });

//http://localhost:5000/apis/restaurants/1    //แบบPUT
routers.put("/user/:id", (req, res) => {
    const userId = Number.parseInt(req.params.id);
    const index = users.findIndex(
        (user) => user.id === userId //หาแอเรย์ ตำแหน่งในตัวindex
    );
    const newUser = { //ไม่เปลี่ยนID เปลี่ยนแค่ค่าอื่น
        id:userId,
        username: req.body.username,
        email: req.body.email,
        tel: req.body.tel,
        //...req.body, 
    };
    users[index] = newUser;
    res.json(newUser);
});

//http://localhost:5000/apis/restaurants/1    //แบบDELETE
routers.delete("/user/:id", (req, res) => {
    const userId = Number.parseInt(req.params.id);
    const index = users.findIndex(
        (user) => user.id === userId //หาแอเรย์ ตำแหน่งในตัวindex
    );
    users.splice(index, 1);   //ลบออกไป ในหน้าindex, 1ตำแหน่ง
    const message = {       //แสดงแบบข้อความ
        text:"User id:" + userId + "deleted",
        id: userId,   //จะแสดงเลขID ที่ลบ
        status: 204,        //แบบstatus
    };
    res.json(message);    
});

//export ออกไปใช้หน้าindex
module.exports = routers;