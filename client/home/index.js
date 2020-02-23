let eleResponse = document.getElementById('response');

fetch('http://localhost:5050/api/home', {
    headers:{
        token: localStorage.getItem('token')
    }
}).then(res => res.json())
.then(data =>{
    if(data.success){
    eleResponse.innerHTML = data.data
    }else{
        alert(data.error);
    }
})