let eleUsername = document.getElementById('username'),
elePassword = document.getElementById('password');
const urlsignup = '/api/signup'
function sign(){
   // console.log("vcbnm");
    let valUsername = eleUsername.value;
    let valPassword = elePassword.value;
    if(valPassword && valUsername){
        //console.log(valPassword, valUsername);

        let reqObj = {
            userName: valUsername,
            password: valPassword
        }
        fetch(urlsignup, {
            method: 'post',
            body:JSON.stringify(reqObj),
            headers:{
                'content-type': 'application/json'
            }

        })
        .then(res => res.json())
        .then(data => {

            if(data.success){
                window.location = '/login';
            }else{
                alert('some error')
            }
            //console.log(data)
    
    });
    }   
}