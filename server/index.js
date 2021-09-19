const express = require('express');
const app = express()
const mysql = require('mysql');
const cors  = require('cors');
const { encrypt, decrypt } = require('./encryptionHandler');


const PORT = 3001;

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: '12345678',
    database:'passwordmanager',
})

app.use(cors());
app.use(express.json());
db.connect();
app.post(
    "/addpassword",(req,res) =>{
        const {password,title} = req.body;
        const hashedPassword = encrypt(password);

        db.query(
            "INSERT INTO passwords (password,title,iv) VALUES (?,?,?)",[hashedPassword.password,title,hashedPassword.iv],
            (err,result)=>{
                if(err){console.log(err);}
                else{res.send("SUCCESS");}
            }
        )
    }
)

app.get(
    "/showpasswords",(req,res)=>{
        db.query("SELECT * FROM passwords;",(err,result)=>{
           if(err){
            console.log(err)
           }
           else{
            res.send(result);
           }
            
        })
    }
)
app.post("/decryptPassword",(req,res)=>{
    res.send(decrypt(req.body))
})


app.listen(PORT,()=>{
    console.log("Server is running");
})


// if there is an error related to auth n all while starting the server



// Execute the following query in MYSQL Workbench

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

// Where root as your user localhost as your URL and password as your password

// Then run this query to refresh privileges:

// flush privileges;

// Try connecting using node after you do so.

// If that doesn't work, try it without @'localhost' part.