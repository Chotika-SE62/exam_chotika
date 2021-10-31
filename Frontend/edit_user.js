const init = async () =>{
    let params = new URL(document.location).searchParams;
    let id = params.get("id");
    if(id){
        try{
            const user = await fetch(
                "http://localhost:5000/apis/user/" + id,{ //ต่อไอดีที่ส่งมาจากการกำปุ่ม Edit
                method: "GET",      
                mode:"cors",
                cache:"no-cache",              //6-8 บอกว่า server อยู่ที่เดียวกัน
                credentals:"same-origin",
                headers:{
                    "Content-type":"application/json"  //ข้อมุลอยู่ในรูปแยย json
                },
            }).then((response)=>{
                return response.json();  //ส่งค่าในรูปแบบ json
            });
            //set input value 19-22
            document.getElementById("id").value = user.id;
            document.getElementById("username").value = user.username;
            document.getElementById("email").value = user.email;
            document.getElementById("tel").value = user.tel;
        }catch (error){
            alert(`User id:${id} not found`);
        }
    }else{
        alert("User ID is missing");
    }
}


const edit = async () => {
    const id = document.getElementById("id").value;
    if (id) {
        const params = {
            id: document.getElementById("id").value,
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            tel: document.getElementById("tel").value,
        };
        try {
        const user = await fetch(
          "http://localhost:5000/apis/user/" + id,
          {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(params), // เพิ่ม data
          }
        ).then((response) => {
          return response.json();
        }).then(()=>{
          alert(`User id:${id} is update`);
        });
      } catch (error) {
        alert(`User id:${id} not found`);
      }
    } else {
      alert("user ID is missing");
    }
};