const init = async () => {   //ฟังก์ชันinit //ดึงข้อมูลมา
    const allRestaurants = await fetch("http://localhost:5000/apis/restaurants", {
    //ดึงข้อมูลมาทั้งหมดใช้GET
    method: "GET", //เข้าถึง data โดยใช้GET
    mode: "cors", 
    cache: "no-cache", //ไม่ต้องเก็บ cache
    credentials: "same-origin",
    headers: { 
        "Content-Type": "application/json",
    },
    }).then((response) => response.json()); //ถ้าสำเร็จจะส่งresponseออกไปเป็นjson
    allRestaurants.forEach((element) => addRestaurant(element)); //จะทำการลูปdataให้ครบ แล้วส่งไปที่addRestaurant

    //allRestaurants.restaurants.forEach((element) => addRestaurant(element));
};

//เพิ่มข้อมูล
const addRestaurant = (element) => {
    const item = document.createElement("div"); //สร้างแท็ก div เก็บไว้ในitem
    item.className = "card";    //กำหนดclassName
    item.style = "width: 20rem;";   //กำหนดstyle
    //กำหนดข้อมูลในcard มีรูป ชื่อ ชนิดร้านอาหาร ประเภทอาหาร ปุ่มลบ(ลบจากid) ปุ่มแก้ไข(ส่งผ่านคิวรี่สตริง เป็นลิงค์พร้อมกับส่งหมายเลขไอดีไปด้วย) 
    const card = `
                <img src="${element.imageurl}" class="card-img-top" alt="${element.name}">  
                <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">${element.type}</p> 
                    <a href="#" class="btn btn-danger" onclick="deleteRestaurant(${element.id})">Delete</a>   
                    <a href="edit.html?id=${element.id}" class="btn btn-warning">Edit</a>    
                </div>
    `;
    item.innerHTML = card;  //แทรกแท็กhtmlในcard
    const restaurantsElement = document.querySelector(".restaurants");  //เข้าถึงหน้าเว็บ //เลือกclassชื่อ.restaurants
    restaurantsElement.appendChild(item);   //เพิ่มnode รูป //เเทรกitemลงไปเป็นข่ายลูก
};

//ลบข้อมูลจากid
const deleteRestaurant = async (id) => {    
    if (id) {   //ถ้ามีid
        try {
            const restaurant = await fetch( //ให้ดึงข้อมูลจาก api(ลิงค์) จากid
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
                .then((response) => {                   //ส่งresponse
                return response.json();                 //รีเทิร์นเป็น json     //มี{ } ต้องมีreturn
                })
                .then((response) => {                       //แสดงผล
                alert(`Restaurant id:${id} is delete`);     //กล่องแจ้งเตือนข้อความด้านบนว่า ลบสำเร็จ
                location.reload();                          //รีหน้าเว็บ ให้ข้อมูลที่ลบหายไป
                });
        } catch (error) {                               //ถ้าไม่สำเร็จ
            alert(`Restaurant id:${id} not found`);     //กล่องแจ้งเตือนข้อความด้านบนว่า ไม่พบidนี้
        }
    } else {  //ถ้าไม่มี id
        alert("Restaurant ID is missing");   //กล่องแจ้งเตือนข้อความด้านบนว่า "Restaurant ID is missing"
    }
};
