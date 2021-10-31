//ฟังก์ชันDelete
const deleteRestaurant = async (id) => {
    if (id) {   //ถ้ามีid
        try {
            const restaurant = await fetch(
            "http://localhost:5000/apis/restaurants/" + id,
            {
                method: "DELETE",                      //เข้าถึงmethod ชื่อDELETE
                mode: "cors",                           //modeชื่อ cors
                cache: "no-cache",                      //ไม่ต้องเก็บ cache
                credentials: "same-origin",
                headers: { 
                    "Content-Type": "application/json",
                },
            }
            )
                .then((response) => {                   //ถ้าเรียก data เสร็จแล้วให้เอา response ที่ได้ไปแปลงเป็น json
                return response.json();                 //มี{ } ต้องมีreturn
                })
                .then((response) => {                           //ลบแล้วให้โหลดหน้าเว็บใหม่
                alert(`Restaurant id:${id} is delete`);     //กล่องแจ้งเตือนข้อความด้านบน
                location.reload();
                });
        } catch (error) {
            alert(`Restaurant id:${id} not found`);     //กล่องแจ้งเตือนข้อความด้านบน
        }
    } else {  //ถ้าไม่มี
        alert("Restaurant ID is missing");   //กล่องแจ้งเตือนข้อความด้านบนว่า "Restaurant ID is missing"
    }
};

const addRestaurant = (element) => {
    const item = document.createElement("div"); //สร้างแท็กdiv
    item.className = "card";//กำหนดclassName
    item.style = "width: 20rem;";//กำหนดstyle
    //รูป, ชื่อ //ชนิดร้านอาหาร //ประเภทอาหาร //ปุ่มลบ(ลบจากid) //ปุ่มแก้ไข(ส่งผ่านคิวรี่สตริง เป็นลิงค์พร้อมกับส่งหมายเลขไอดีไปด้วย) 
    const card = `
                <img src="${element.imageurl}" class="card-img-top" alt="${element.name}">  
                <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">${element.type}</p> 
                        <a href="#" class="btn btn-danger" onclick="deleteRestaurant(${element.id})">Delete</a>   
                        <a href="edit.html?id=${element.id}" class="btn btn-warning">Edit</a>    
                </div>
    `;
    item.innerHTML = card;
    const restaurantsElement = document.querySelector(".restaurants");  //เข้าถึงหน้าเว็บ
    restaurantsElement.appendChild(item);   //เพิ่มnode รูป
};

//ฟังก์ชันremove ก่อนจะaddเคลียร์คำสั่งเดิมก่อน
const removeAllResult = () => {
    const restaurantsElement = document.querySelector(".restaurants");
    restaurantsElement.innerHTML = "";
};

const searchRestaurant = async(event) => {      //เข้าถึงตัวข้อความที่พิมพ์ที่ช่องinput 
    const keyword = event.target.value;
    if (event.key === "Enter" && keyword) {     //ถ้าค่าที่พิมพ์มาไม่ใช่ค่าว่าง..
        const allRestaurants = await fetch(     //รอทำเสร็จก่อนค่อยไปอันอื่น 
            "http://localhost:5000/apis/restaurants",
            {   
            method: "GET",                      //เข้าถึง data โดยใช้ Get
            mode: "cors",                       //modeชื่อ cors
            cache: "no-cache",                  //ไม่ต้องเก็บ cache
            credentials: "same-origin",
            headers: { 
                "Content-Type": "application/json",
            },
        }).then((response) => {                 //ถ้าเรียก data เสร็จแล้วให้เอา response ที่ได้ไปแปลงเป็น json
            return response.json();             //มี{ } ต้องมีreturn
        });
        //console.log(allRestaurant);
        const result = allRestaurants.filter(    //filter = กรองข้อมูล มีเงื่อนไขต่อไปนี้เป็นจริง name,type มีคีย์เวิร์ดที่เราใส่ไปมั้ย includesจะเช็คให้ว่ามีคำที่พิมพ์ไปหรือป่าว
            (item) => item.name.includes(keyword) || (item).type.includes(keyword)  //เงื่อนไขที่ทำให้เป็นจริง
        );
        //console.log(result);
        removeAllResult();  //  เคลียร์ค่าเดิมก่อน
        result.forEach((element) => addRestaurant(element)); //วนลูปแต่ละรอบให้เรียกใช้addRestaurant แล้วมันจะวนลูปต่อไป
    }
};

const main = () => {    //ลิงค์กับปุ่ม
    const inputElement = document.querySelector(".search");
    inputElement.addEventListener("keydown", searchRestaurant);  //เมื่อเกิดevent "keydown" ให้ไปเรียกใช้ตัว searchRestaurant
};

main();