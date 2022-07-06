const mysql = require('mysql')
const express = require('express')
var app = express()
const BodyParser = require("body-parser")

app.use(BodyParser.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.set("views", "views")


//inisialisasi connection di mysql
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pijarcamp'
});

//melakukan koneksi kedatabase
mysqlConnection.connect((err) => {
    if (err) throw err
    console.log('database connect')

    app.get("/", (req, res) => {
        const sql = "SELECT * FROM pijarcamp.produk"
        mysqlConnection.query(sql, (err, result) => {
            const ragamProduk = JSON.parse(JSON.stringify(result))
            console.log("haisl database -> ", ragamProduk)
            res.render("index", { ragamProduk: ragamProduk, title: "SIMPLE CRUD NODE.JS + MYSQL" })
        })
    })

    //GET
    // app.get("/", (req, res) => {
    //     const sql = "SELECT * FROM produk";
    //     mysqlConnection.query(sql, (err, result) => {
    //         const ragamProduk = JSON.parse(JSON.stringify(result))
    //     })
    //     res.render("index", { ragamProduk: ragamProduk, title: "SIMPLE CRUD NODE.JS + MYSQL" })
    // })

    app.post("/tambah", (req, res) => {
        const insertSql = `INSERT INTO produk (nama_produk, keterangan, harga, jumlah) VALUES ('${req.body.nama}','${req.body.keterangan}', '${req.body.harga}', '${req.body.jumlah}');`
        mysqlConnection.query(insertSql, (err, result) => {
            if (err) throw err
            res.redirect("/")
        })
    })
})



app.listen(8000, () => {
    console.log("SERVER READY....")
})