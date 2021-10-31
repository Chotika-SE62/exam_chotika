const express = require('express'); //เชื่อมpackage
const router = express.Router();
const Restaurant = require("../models/restaurant.model");

// http://localhost:5000/apis/restaurants   //สร้าง
router.post("/restaurants",(req,res) =>{    //การส่งข้อมูลแบบปลอดภัย จะไม่ส่งผ่านurl
    //Create a restaurant
    const newRestaurant = new Restaurant({
        name:req.body.name, //บอกจุดข้อมูลว่าต้องดึงมาจากไหน
        type:req.body.type,
        imageurl:req.body.imageurl,
    });

    //Save to database
    Restaurant.create(newRestaurant,(err, data)=>{
        if(err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the restaurant"
            })
        else res.send(data);
    })
    
});

// http://localhost:5000/apis/restaurants/1 //ส่งผ่านurl //เรียกดูจากid
router.get('/restaurants/:id', (req,res)=>{
    //แปลงจาก string เป็น num(เลข)
    const restaurantId = Number.parseInt(req.params.id);  //แปลงให้เป็นจำนวนเต็ม
    Restaurant.getById(restaurantId, (err, data)=>{
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    message: `Restaurant not found with this id ${restaurantId}`,
                });
            }
            else{
            res.status(500).send({
                message: "Error retriveving with this id " + restaurantId,
            })
            }
        }
        else
        {
            res.send(data);
        }
    });
});

//Get All restaurant เรียกดูทั้งหมด
// http://localhost:5000/apis/restaurants
router.get('/restaurants',(req,res) => {
    Restaurant.getAll((err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Come err occurred while retrieving restaurants",
            });
        }
        else{
            res.send(data);
        }
    });
});

//Updata restaurant Data อัพเดตข้อมููลจากid
// http://localhost:5000/apis/restaurants/1
router.put("/restaurants/:id",(req, res)=>{
    const restaurantId = Number.parseInt(req.params.id);  //แปลงให้เป็นจำนวนเต็ม

    if(req.body.constructor === Object && Object.keys(req.body).length === 0){//เช็คค่าว่าง
        res.status(400).send({
            message : "Content can not empty"
        });
    }
    Restaurant.updateById(restaurantId, new Restaurant(req.body), (err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Restaurant not found with this id ${restaurantId}`,
                });
            }
            else{
            res.status(500).send({
                message: "Error updating restaurant data with this id " + restaurantId,
            });
            }
        }
        else
        {
            res.send(data);
        }
    });
});

//Delete restaurant by Id ลบข้อมูลจากid
// http://localhost:5000/apis/restaurants/1
router.delete("/restaurants/:id", (req,res)=>{
    const restaurantId = Number.parseInt(req.params.id);  //แปลงให้เป็นจำนวนเต็ม
    Restaurant.removeById(restaurantId,(err,data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Restaurant not found with this id ${restaurantId}`,
                });
            }
            else{
            res.status(500).send({
                message: "Error deleting restaurant data with this id " + restaurantId,
            });
            }
        }
        else
        {
            res.send({message: "Restaurant is deleted successfully"});
        }
    })
})

module.exports = router;
