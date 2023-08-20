import express from 'express';
import mysql from 'mysql';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken';

const app = express();
app.use(cors())
app.use(cookieParser());
app.use(express.json())



const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'bhairav98',
    insecureAuth: true,
    database:'signup'
})

con.connect(function (err) {
    if (err) {
        console.log("Error in connection",err.message)
    } else {
        console.log("connected")
    }
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users Where email=? AND password=?";
    con.query(sql, [req.body.email, req.body.password], (err,result) => {
        if (err) return res.json({ Status: err ,Message:"Error in Backend"});
        if (result.length > 0) {
            console.log("User Log Succesfully")
            return res.json({Status:"Success"})
        }
        else
        { 
            console.log('Not Match')
            return res.json({Status:"Error! ",Message:"Your email or password is incorrect "})
        }
            
    })
})


app.listen(8080, () => {
    console.log(`server running at PORT 8080`)
})