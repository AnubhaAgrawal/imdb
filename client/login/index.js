let eleUsername = document.getElementById('username'),
elePassword = document.getElementById('password');
const urlLogin = '/api/login'
function login(){
   // console.log("vcbnm");
    let valUsername = eleUsername.value;
    let valPassword = elePassword.value;
    if(valPassword && valUsername){
        //console.log(valPassword, valUsername);

        let reqObj = {
            userName: valUsername,
            password: valPassword
        }
        fetch(urlLogin, {
            method: 'post',
            body:JSON.stringify(reqObj),
            headers:{
                'content-type': 'application/json'
            }

        })
        .then(res => res.json()) // We check what we get in response and we convert response to json
        .then(data => {

            if(data.success){
                localStorage.setItem('token', data.token)
                window.location = '/home';
            }else{
                alert(data.error);
            }
            console.log(data)
    
    });
    }   
}