const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const crypto = require('crypto')

const port = 1995;
var app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.set('view engine' , 'ejs');

//Connect to MySQL database
const conn = mysql.createConnection({
    host : '127.0.0.1',
    user : 'william',
    password : '0sampai1',
    database : 'company',
    port: 3306
    });

app.get('/company_list', function(req, res) {
    var sql = `SELECT * FROM companies`
    conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send({companies: result})
    })
})

app.get('/office_list', function(req, res) {
    var sql = `SELECT * FROM offices WHERE company_id = ${req.query.id}`
    conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send({offices: result})
    })
})

app.post('/add_company', function(req, res) {
    var sql = `INSERT INTO companies SET ?`
    var sql2 = `SELECT * FROM companies`
    conn.query(sql, req.body, (err, result) => {
        if (err) throw err;
        conn.query(sql2, (err2, result2) => {
            if (err2) throw err2;
            res.send({companies: result2})
        })
    })
})

app.post('/add_office', function(req, res) {
    var sql = `INSERT INTO offices  SET ?`
    conn.query(sql, req.body, (err, result) => {
        if (err) throw err;
        res.send({result})
    })
})

app.delete('/delete_company/:id', function(req, res) {
    var sql = `DELETE FROM companies WHERE id = ${req.params.id}`
    var sql2 = `SELECT * FROM companies`
    conn.query(sql, (err, result) => {
        if (err) throw err;
        conn.query(sql2, (err2, result2) => {
            if (err2) throw err2;
            res.send({companies: result2})
        })
    })
})

app.post('/delete_office', function(req, res) {
    var sql = `DELETE FROM offices WHERE id = ${req.body.office_id}`
    var sql2 = `SELECT * FROM offices WHERE company_id = ${req.body.company_id}`
    conn.query(sql, (err, result) => {
        if (err) throw err;
        conn.query(sql2, (err2, result2) => {
            if (err2) throw err2;
            res.send({offices: result2})
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));