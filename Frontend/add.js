const add = async () => {   //
    const id = Number.parseInt(document.getElementById("id").value);      //เก็บค่าจากinputช่องid แล้วแปลงเป็นตัวเลข
    const name = document.getElementById("name").value;         //เก็บค่าจาก input ของ name
    const type = document.getElementById("type").value;         //เก็บค่าจาก input ของ type
    const imageurl = document.getElementById("imageurl").value; //เก็บค่าจาก input ของ imageurl
    if (id && name && type && imageurl) {       //ตรวจสอบค่า ว่ามีค่าส่งมาไหม
        const params = {        //set พารามิเตอร์
            id: id,
            name: name,
            type: type,
            imageurl: imageurl,
        };
        try {
            const restaurant = await fetch(     //เชื่อมต่อ api //ส่งไปยัง server
                "http://localhost:5000/apis/restaurants",
                {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(params),   //เพิ่ม data //จัดให้อยู่ในรูปแบบของjson
                }
            ).then((response) => {      //ส่ง response
                return response.json(); //รีเทิร์นค่าให้อยู่ในรูปแบบ json
            }).then(() => {             
                alert(`Restaurant id:${id} is added`);  //กล่องเเจ้งข้อความว่า add สำเร็จ
            });
        } catch (error) {       //ถ้ามีข้อผิดพลาด
            alert(`add new restaurant`);    //เเจ้งเตือนข้อความ
        }
    } else {    //ถ้าไม่สำเร็จ
        alert("All fields are required!!");     //เเจ้งข้อความว่าต้องกรอกข้อมูลทุกช่อง
    }
};
