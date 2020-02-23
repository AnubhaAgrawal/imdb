const express = require('express'),
bodyParser = require('body-parser'),
path = require('path'),
bcrypt = require('bcrypt'),
jwt = require('jsonwebtoken'),
app = express(),
PORT = 5050,
users =[{"userName":"Anubha","password":"$2b$10$Ki8adf2fnlNXDgoG34WUBOFshi0ZVW4kVSx1qdifo/FAW7BQgFmw6"}];
secret = '12345';
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client'))); 
//app.get('/', (req, res)=>{
//    res.send('Helow World');
//})

app.get('/api/users', (req, res)=>{
    res.json(users);
})

app.post('/api/signup', (req, res)=>{
    //console.log(req.body);
    //Call is still pending because we don't send anything to response

    let {userName, password} = req.body;

    bcrypt.genSalt(10, (err, salt)=>{
        if(err){
            console.log('genSalt' ,err);
            res.send({
                success:false
            });
        } else{
            bcrypt.hash(password, salt, (err, hash)=>{
                if(err){
                    console.log('hash', err);
                    res.send({
                        success:false
                    });
                }

                users.push({
                    userName,
                    password:hash
                })

                res.send({
                    success:true
                });
            })
        }
    });
   
})


app.post('/api/login', (req, res)=>{
    //console.log(req.body);
    //Call is still pending because we don't send anything to response

    let {userName, password} = req.body;

    let user = users.find(user => user.userName == userName);

    if(user){
        bcrypt.compare(password, user.password, (err, same) =>{
            if(err){
                res.send({
                    success: false,
                    error: err
                    
                })
            } 
            if(same){
                const token = jwt.sign(
                    {userName, website: 'hackerrank'},
                    secret,
                    {expiresIn: '1h'}
                );
                res.send({
                    success: true,
                    token
                    
                })

            } else{
                res.send({
                    success: false,
                    error: 'password does not match'
                    
                })
            }
        });
    }else{
        res.send({
            success: false,
            error: 'usr does not exist'
            
        })
    }

   
})


app.get('/api/home', (req, res) =>{
    let token = req.get('token');
    jwt.verify(token, secret, (err, decoded) =>{
        if(err){
            res.send({
                success: false,
                error: 'Login First'
            })
        }
        if(decoded){
            res.json({
                success: true,
                data: 'Hurray you Login'
            })
        }
    });
})

app.listen(PORT);

console.log('Listening at Port'+ PORT); 

