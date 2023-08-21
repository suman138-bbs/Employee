import express from 'express';
import mysql from 'mysql';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';;

const app = express();
app.use(cors())
app.use(cookieParser());
app.use(express.json())
app.use(express.static('public'))



const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'bhairav98',
    insecureAuth: true,
    database:'signup'
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage:storage
})

con.connect(function (err) {
    if (err) {
        console.log("Error in connection",err.message)
    } else {
        console.log("connected")
    }
})

app.get('/getEmployees', (req,res) => {
    const sql = 'SELECT * FROM employee';
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: 'Error in fetching Data from sql' })
        return res.json({
            Status: 'Success',
            Result:result
        })
    })
})
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users Where email=? AND password=?";
    con.query(sql, [req.body.email, req.body.password], (err,result) => {
        if (err) return res.json({ Status: err, Message: err.message });
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

app.post('/create',upload.single('image'), (req, res) => {
    const sql = "INSERT INTO employee (`email`,`name`,`password`,`image`,`address`,`salary`) VALUES (?, ?, ?, ?, ?, ?)";

    bcrypt.hash(req.body.password.toString(), 10, (err,hash) => {
        if (err) return res.json({ Error: 'Error in Hashing Password' }) 
        const values = [
            req.body.email,
            req.body.name,
            hash,
            req.file.filename,
            req.body.address,
            req.body.salary
        ]
        con.query(sql, values, (err, result) => {
            if (err) return res.json({ Error: err.message })
            return res.json({Status:"Success"})
        })
    })
})


app.listen(8080, () => {
    console.log(`server running at PORT 8080`)
})