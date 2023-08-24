import express from 'express';
import mysql from 'mysql';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

const app = express();
app.use(cors(
    {
        origin: ["http://localhost:5173/"],
        credentials:true
    }
))
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
app.put('/editEmployee/:userId', (req, res) => {
    const id = req.params.userId;
    const sql = "UPDATE employee SET email = ?,name = ?,address = ?,salary = ? WHERE id = ?";
    const data = [
        req.body.email,
        req.body.name,
        req.body.address,
        req.body.salary,
        id,
        

    ]
    con.query(sql, data, (err,result) => {
        if (err) return res.json({ Message: err.message })
        return res.json({
            Status: "Success",
            Message:result
        })
    }
    )
    

})

app.get('/get/:userId', (req,res) => {
    const id = req.params.userId;
    const sql = 'SELECT * FROM employee where id = ?'
    con.query(sql, id, (err,result) => {
        if (err) return res.json({ Error: err.message })
        return res.json({Status:"Success",Result:result})
    })
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

const verifyUser = (req,res,next) => {
     const token = req.cookies.token;
    if (!token) {
        return res.json({Error:"You are not authenticated"})
    } else {
        Jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) return res.json({ Error: "Wrong token" })
            next()
        })
    }
}

app.get('/admitCount', (req, res) => {
    const sql = 'SELECT count(id) as admin from users';
    con.query(sql, (err, result) => {
        if (err) res.json({ Error: err.message })
        else {
            
        return  res.json({result})
        }
    })
})

app.get('/employeeCount', (req, res) => {
    const sql = 'SELECT count(id) as employee from employee';
    con.query(sql, (err, result) => {
        if (err) res.json({ Error: err.message })
        else {
            
         return res.json({result})
        }
    })
})

app.get('/totalSalary', (req, res) => {
    const sql = 'SELECT sum(salary) as salary from employee';
    con.query(sql, (err, result) => {
        if (err) res.json({ Error: err.message })
        else {
            
        return res.json({result})
        }
    })
})




app.get('/dashbord', verifyUser,(req,res) => {
   return res.json({Status:"Success"})
})
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users Where email=? AND password=?";
    con.query(sql, [req.body.email, req.body.password], (err,result) => {
        if (err) return res.json({ Status: err, Message: err.message });
        if (result.length > 0) {
            const id = result[0].ID;
            const token = Jwt.sign({ id }, "jwt-secret-key", { expiresIn: "1d" })
            res.cookie('token',token)
            return res.json({Status:"Success"})
        }
        else
        { 
            console.log('Not Match')
            return res.json({Status:"Error! ",Message:"Your email or password is incorrect "})
        }
            
    })
})

app.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status:"Success"})
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


app.delete('/deleteEmployee/:userId', (req, res) => {
    console.log("Delete Api Hit")
    const id = req.params.userId
    
    const sql = "DELETE FROM employee WHERE id=?";
    con.query(sql, id, (err,result) => {
        if (err) return res.json({ Error: Error.message })
        return res.json({Message:result})
    })

})

app.listen(8080, () => {
    console.log(`server running at PORT 8080`)
})