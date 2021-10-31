const  sql = require("./db");   

//Create Constructor
const User = function(user) {    //รับพารามิเตอร์ หรืออ็อบเจ็กมา
    this.id = user.id;    //Attributes
    this.username = user.username; 
    this.email = user.email;
    this.tel = user.tel;
};

//Method
//Insert Data
User.create = (newUser, result) => {    //รับnewUserตัวใหม่เข้ามา
    //INSERT INTO restaurants SET id, name, type, imageurl Values ("1", "KFC", "Fastfood", "url")
    sql.query("INSERT INTO user SET ?", newUser, (err, res)=>{ //เพิ่มdata //? = ค่าที่ใส่เข้ามา //ดักerror
        if(err) {        //ถ้ามีerror
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("create user:", { id:res.insertId, ...newUser });
        result(null, { id:res.insertId, ...newUser })
    });
};

//Get Data By ID
User.getById = (userId, result) => {    //1ร้าน
    //ซินแทคของคิวรี่ในsql -> SELECT * FROM restaurants WHERE id = restaurantId
    sql.query(
        `SELECT * FROM user WHERE id = ${userId}`,
        (err, res) => {
            if (err) {    //เกิดerror
                console.log("error: ", err);    //แสดงว่า error
                result(err, null);  //ส่งค่าdataเป็นnull
                return;
            }
            if (res.length) {  //หาเจอ มีค่าไม่เท่ากับ0
                result(null, res[0]);  //ตัวdataต้องส่งresกลับไป [แค่แถวแรกเเถวเดียว]
                return;
            }
            //Restaurant not found with this id
            result({ kind: "not_found" }, null);    //ไม่เข้าเลย หาidไม่เจอ
        }
    );
};   

//Get all Restaurant
User.getAll = (result) => { //เอามาทั้งหมด
    //SELECT * FROM restaurants
    sql.query("SELECT * FROM user", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};   

User.updateById = (id, user, result) => { //อัพเดต   
    //UPDATE restaurants SET name = "name", type = "type", imageurl = "imageurl" WHERE id = "id"
    sql.query("UPDATE user SET username=?, email=?, tel=? WHERE id=?", 
        [user.username, user.email, user.tel, id],
        (err, res) => {
            if (err) {    //เกิดerror
                console.log("error: ", err);    //แสดงว่า error
                result(err, null);  //ส่งค่าdataเป็นnull
                return;
            }
            if (res.affectedRows == 0) {  //ถ้าเท่ากับ0 ไม่มีการอัพเดตข้อมูล    //ใส่ไอดีที่ไม่มี
                result({ kind: "not_found" });  //แสดงว่า not_found
                return;
            }
            //Restaurant data is updated
            result(null, { id: id, ...user });    
        }
    );
};   

//Delete Restaurant by Id
User.removeById = (id, result) => {     //ลบทีละอัน
    //DELETE FROM restaurants WHERE id = ?
    sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
        if(err) {
            console.log("error : ", err)
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "noy_found"}, null);
            return;
        }
        console.log("Deleted user with id: ", id);
        result(null , res);
    });
};   

User.removeAll = () => {} //ลบหมด

module.exports = User;