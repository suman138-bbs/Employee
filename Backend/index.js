import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import con from './config/index.js';


const app = express();
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));

app.use(cookieParser());
app.use(express.json())
app.use(express.static('public'))





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
    const sql = "UPDATE employee SET email = ?,name = ?,address = ?,salary = ?,department=? WHERE id = ?";
    const data = [
        req.body.email,
        req.body.name,
        req.body.address,
        req.body.salary,
        req.body.department,
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
            req.role=decoded.role
            next()
        })
    }
}

app.get('/adminCount', (req, res) => {
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
   return res.json({Status:"Success",role:req.role})
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users Where email=? AND password=?";
     con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
        if(result.length > 0) {
            const id = result[0].id;
            const token = Jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '5m'});
            res.cookie('token', token);
            return res.json({Status: "Success"})
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})


app.post('/employeelogin', (req, res) => {
    console.log("Employee Url Hit")
    const sql = "SELECT * FROM employee Where email=?";
     con.query(sql, [req.body.email], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
         if (result.length > 0) {
             bcrypt.compare(req.body.password.toString(), result[0].password, (err,response) => {
                 if (err) return res.send({ Error: err.message })
                 if (response) {
                     const id = result[0].id;
                    const token = Jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '5m'});
                    res.cookie('token', token);
                    return res.json({Status: "Success",Result:result})

                 }
            })
            
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})





app.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status:"Success"})
})


// app.post('/create',upload.single('image'), (req, res) => {
//     const sql = "INSERT INTO employee (`email`,`name`,`password`,`image`,`address`,`department`,`salary`) VALUES (?, ?, ?, ?, ?, ?, ?)";

//     bcrypt.hash(req.body.password.toString(), 10, (err,hash) => {
//         if (err) return res.json({ Error: 'Error in Hashing Password' })
//         const values = [
//             req.body.email,
//             req.body.name,
//             hash,
//             req.file.filename,
//             req.body.address,
//             req.body.department,
//             req.body.salary
//         ]
//         con.query(sql, values, (err, result) => {
//             if (err) return res.json({ Error: err.message })
//             return res.json({Status:"Success"})
//         })
//     })
// })

app.post('/create', upload.single('image'), (req, res) => {
    const sql = "INSERT INTO employee (`email`, `name`, `password`, `image`, `address`, `department`, `salary`, `age`, `gender`, `contact`, `education`, `post`, `training`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) return res.json({ Error: 'Error in Hashing Password' });

        const values = [
            req.body.email,
            req.body.name,
            hash,
            req.file.filename,
            req.body.address,
            req.body.department,
            req.body.salary,
            req.body.age,
            req.body.gender,
            req.body.contact,
            req.body.education,
            req.body.post,
            req.body.training
        ];

        con.query(sql, values, (err, result) => {
            if (err) return res.json({ Error: err.message });
            return res.json({ Status: "Success" });
        });
    });
});



app.delete('/deleteEmployee/:userId', (req, res) => {
    console.log("Delete Api Hit")
    const id = req.params.userId
    
    const sql = "DELETE FROM employee WHERE id=?";
    con.query(sql, id, (err,result) => {
        if (err) return res.json({ Error: Error.message })
        return res.json({Message:result})
    })

})


app.get('/employeeDetail', (req, res) => {
    const email = req.body.email;
    const sql = "SELECT * FROM EMPLOYEE WHERE email=?"
    con.query(sql, email, (err, result) => {
        if (err) return res.send({ 'Error': err })
        console.log(result)
    })
})

app.listen(8080, () => {
    console.log(`server running at PORT 8080`)
})