const init = async () => {   //ดึงข้อมูลมา
    const allUser = await fetch("http://localhost:5000/apis/user", {
    //ดึงมาทั้งหมดใช้GET
    method: "GET", //เข้าถึง data โดยใช้GET
    mode: "cors", 
    cache: "no-cache", //ไม่ต้องเก็บ cache
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json",
    },
    }).then((response) => response.json());
    allUser.forEach((element) => addUser(element)); //ลูป data array ให้ครบ ส่งไปที่ addRestaurant

    //allRestaurants.restaurants.forEach((element) => addRestaurant(element));
};

const addUser = (element) => {
    const item = document.createElement("tr"); //สร้างแท็กdiv
    item.className = "tr";//กำหนดclassName
    item.style = "width: 20rem;";//กำหนดstyle
    //รูป, ชื่อ //ชนิดร้านอาหาร //ประเภทอาหาร //ปุ่มลบ(ลบจากid) //ปุ่มแก้ไข(ส่งผ่านคิวรี่สตริง เป็นลิงค์พร้อมกับส่งหมายเลขไอดีไปด้วย) 
    const tbody = `
                    <th scope="row">${element.id}</th>
                    <td>${element.username}</td>
                    <td>${element.email}</td>
                    <td>${element.tel}</td>
                    <td>
                        <a href="#" class="btn btn-danger" onclick="deleteUser(${element.id})">Delete</a>   
                        <a href="edit_user.html?id=${element.id}" class="btn btn-warning" style="margin-left: 20px;">Edit</a>
                    </td>
    `;
    item.innerHTML = tbody;
    const usersElement = document.querySelector(".users");  //เข้าถึงหน้าเว็บ
    usersElement.appendChild(item);   //เพิ่มnode รูป
};

const deleteUser = async (id) => {
    if (id) {   //ถ้ามีid
        try {
            const user = await fetch(
            "http://localhost:5000/apis/user/" + id,
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
                .then((response) => {                   //แปลงเป็น json
                return response.json();                 //มี{ } ต้องมีreturn
                })
                .then((response) => {                 //แสดงผล
                alert(`User id:${id} is delete`);     //กล่องแจ้งเตือนข้อความด้านบน
                location.reload();
                });
        } catch (error) {
            alert(`User id:${id} not found`);     //กล่องแจ้งเตือนข้อความด้านบน
        }
    } else {  //ถ้าไม่มี
        alert("User ID is missing");   //กล่องแจ้งเตือนข้อความด้านบนว่า "Restaurant ID is missing"
    }
};