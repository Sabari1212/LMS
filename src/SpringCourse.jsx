import axios from "axios";
var url = "http://localhost:8080/api";


function PostAllcourse(formData){
    return (
        axios
        .post("http://localhost:8080/api/public/postCoruse_data", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => {
            console.log("Product added successfully:", response.data);
            alert("Product added successfully");
        })
        .catch((error) => {
            console.error("Error adding product:", error);
            alert("Error adding product");
        })

    )
    // axios.post(url+"/public/postCoruse_data")
}
function GetAllcourse() {
    return axios.get(url + "/public/getCoruse_data");
}
function Getuser1(token) {
    return  axios.get("http://localhost:8080/api/user/get", {headers: { Authorization: `Bearer ${token}`},});
}
function Getuser2(token) {
    return axios.get("http://localhost:8080/api/user2/get", {headers: { Authorization: `Bearer ${token}`},});
    
}


export {GetAllcourse,PostAllcourse,Getuser1,Getuser2}
