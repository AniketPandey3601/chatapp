const http = require('http');
const express = require('express');
const app = express()

const fs = require('fs');

let usernaam;
let msg = null;

let temp='';


const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({extended:false}))


app.get('/login',(req, res, next)=>{

    res.send(`<form action = "/" method = "POST"><input type= "text" name= "username"><button type = "submit">Username</button></form>`)
      
})

app.post('/login' ,(req,res,next)=>{

    console.log(req.body)


    localStorage.setItem( 'username',req.body.username );
    usernaam = req.body.username;
    console.log(usernaam)
    res.redirect('/');
    
} )

app.get('/', (req  , res , next)=>{

    res.send(`<h1>${temp}<h1><br><form action = "/" method = "POST"><input type= "text" name= "chatmsg"><button type = "submit">Message</button></form>`)


})

app.post('/' ,(req,res,next)=>{
    console.log(req.body)
    msg = req.body.chatmsg
   
    fs.writeFileSync('msg.txt', `${usernaam} : ${req.body.chatmsg}`)

    
    if(usernaam || req.body.chatmsg){

        temp += `${usernaam} : ${req.body.chatmsg}`;


    }
    
    
    res.redirect('/');

}  )


app.listen(3000)