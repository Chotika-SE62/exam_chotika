const add = async () => {
    const id = Number.parseInt(document.getElementById("id").value);      //เก็บค่าจาก input+คอนเวิดเป็นตัวเลข
    const username = document.getElementById("username").value;         //เก็บค่าจาก input
    const email = document.getElementById("email").value;
    const tel = document.getElementById("tel").value;
    if (id && username && email && tel) { //ตรวจสอบค่า ว่ามีค่าส่งมาไหม
        const params = { //set พารามิเตอร์
            id: id,
            username: username,
            email: email,
            tel: tel,
        };
        try {
            const user = await fetch( //ส่งไปยัง server
                "http://localhost:5000/apis/user",
                {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(params), // เพิ่ม data
                }
            ).then((response) => {
                return response.json(); //คอนเวิดให้อยู่ในรูปแบบ json
            }).then(() => {
                alert(`User id:${id} is added`);
            });
        } catch (error) {
            alert(`add new User`);
        }
    } else {
        alert("All fields are required!!");
    }
};