const init = async () =>{   //ดึงข้อมูล
  let params = new URL(document.location).searchParams;
  let id = params.get("id");
  if(id){
      try{
          const restaurant = await fetch(
              "http://localhost:5000/apis/restaurants/" + id,{ //ต่อไอดีที่ส่งมาจากการกำปุ่ม Edit
              method: "GET",          
              mode:"cors",
              cache:"no-cache",               //6-8 บอกว่า server อยู่ที่เดียวกัน
              credentals:"same-origin",
              headers:{
                  "Content-type":"application/json"  //ข้อมุลอยู่ในรูปแยย json
              },
          }).then((response)=>{
              return response.json();  //ส่งค่าในรูปแบบ json
          });
          //set input value 19-22
          document.getElementById("id").value = restaurant.id;
          document.getElementById("name").value = restaurant.name;
          document.getElementById("type").value = restaurant.type;
          document.getElementById("imageurl").value = restaurant.imageurl;
      }catch (error){
          alert(`Restaurant id:${id} not found`)
      }
  }else{
      alert("restaurant ID is missing");
  }
}


const edit = async () => {
  const id = document.getElementById("id").value;
  if (id) {
      const params = {
          //id: document.getElementById("id").value,
          name: document.getElementById("name").value,
          type: document.getElementById("type").value,
          imageurl: document.getElementById("imageurl").value,
      };
    try {
      const restaurant = await fetch(
        "http://localhost:5000/apis/restaurants/" + id,
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
        alert(`Restaurant id:${id} is update`);
      });
    } catch (error) {
      alert(`Restaurant id:${id} not found`);
    }
  } else {
    alert("restaurant ID is missing");
  }
};
