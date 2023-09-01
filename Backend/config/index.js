import dotenv from 'dotenv'
import mysql from 'mysql';
dotenv.config()
const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: process.env.DB_PASSWORD,
    insecureAuth: true,
    database:process.env.DB_NAME
})

export default con;