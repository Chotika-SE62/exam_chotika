const mysql = require("mysql"); //อิมพอดตัวไลบลารี
const dbConfig = require("../configs/db.config"); //เอาเข้ามาใช้งาน //.. คือกลับไปหนึ่งสเต็บ

//Create a connection to the database
const connection = mysql.createConnection({ //เชื่อมตัวฐานข้อมูล
    host: dbConfig.HOST, //พารามิเตอร์
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
});

//Open the MySQL connection
connection.connect((error) => {
    if (error) throw error; //เช็คerror ถ้ามีก็โยนขึ้นไปข้างบน ให้เลเวลสูงกว่าจัดการ แล้วให้หยุดทำงาน 
    console.log("Successfully connected to the database ...."); //ถ้าสำเร็จจะขึ้นข้อความ
});

module.exports = connection;    //เพื่อออกไปใช้งาน
