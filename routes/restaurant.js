const express = require('express'); //เรียกใช้ฟังก์ชัน express
const router = express.Router();   //เรียกใช้ฟังก์ชัน router
const restaurants = require("../database"); //เก็บไว้ในตัวแปร restaurants

//http://localhost:5000/apis/restaurants    //แบบPOST
router.post("/restaurants", (req, res) => {
    const newRestaurant = { //insertตัวใหม่
        ...req.body, //สลายโครงสร้าง แล้วมาสร้างของตัวเอง
    };
    //console.log(newRestaurant);
    //เพิ่มData ตัวใหม่
    restaurants.push(newRestaurant)
    res.json(newRestaurant);
});

//GET all restaurants   //รายการอาหาร
router.get("/restaurants", (req, res) => {
    res.json(restaurants);
});

//GET restaurants by ID
router.get("/restaurants/:id", (req, res) => {
    const restaurantId = Number.parseInt(req.params.id);
    //console.log(restaurantId);
    const restaurant = restaurants.find(
        (restaurant) => restaurant.id === restaurantId  //ต้องIDเหมือนกัน ถึงจะreturnให้ เก็บไว้ในrestaurant
    );
    res.json(restaurant);
});

//http://localhost:5000/apis/restaurants/1    //แบบID
// router.get("/restaurants/:id", (req, res) => {
//     res.send("<h3>GET Reataurant by ID API</h3>");
// });

//http://localhost:5000/apis/restaurants/1    //แบบPUT
router.put("/restaurants/:id", (req, res) => {
    const restaurantId = Number.parseInt(req.params.id);
    const index = restaurants.findIndex(
        (restaurant) => restaurant.id === restaurantId //หาแอเรย์ ตำแหน่งในตัวindex
    );
    const newRestaurant = { //ไม่เปลี่ยนID เปลี่ยนแค่ค่าอื่น
        id:restaurantId,
        name: req.body.name,
        type: req.body.type,
        imageurl: req.body.imageurl,
        //...req.body, 
    };
    restaurants[index] = newRestaurant;
    res.json(newRestaurant);
});

//http://localhost:5000/apis/restaurants/1    //แบบDELETE
router.delete("/restaurants/:id", (req, res) => {
    const restaurantId = Number.parseInt(req.params.id);
    const index = restaurants.findIndex(
        (restaurant) => restaurant.id === restaurantId //หาแอเรย์ ตำแหน่งในตัวindex
    );
    restaurants.splice(index, 1);   //ลบออกไป ในหน้าindex, 1ตำแหน่ง
    const message = {       //แสดงแบบข้อความ
        text:"Restaurant id:" + restaurantId + "deleted",
        id: restaurantId,   //จะแสดงเลขID ที่ลบ
        status: 204,        //แบบstatus
    };
    res.json(message);    
});

//export ออกไปใช้หน้าindex
module.exports = router;