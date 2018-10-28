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
    host : 'us-cdbr-iron-east-01.cleardb.net',
    user : 'b8a61b4b410a5d',
    password : 'f729ad2d',
    database : 'heroku_5300905ecca37fc',
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
    var sql2 = `DELETE FROM offices WHERE company_id = ${req.params.id}`
    var sql3 = `SELECT * FROM companies`
    console.log(sql)
    conn.beginTransaction(function (err) {
        if (err) throw err;
        conn.query(sql, (err, result) => {
            if (err) {
                conn.rollback(function() {
                    console.log("Rollback 1 Successful");
                    throw err;
                })
            };
            conn.query(sql2, (err2, result2) => {
                if (err2) {
                    conn.rollback(function() {
                        console.log("Rollback 2 Successful");
                        throw err2;
                    })
                };
                conn.query(sql3, (err3, result3) => {
                    if (err3) {
                        conn.rollback(function() {
                            console.log("Rollback 3 Successful");
                            throw err3;
                        })
                    };
                    conn.commit(function(err) {
                        if (err) {
                            conn.rollback(function() {
                                console.log("Rollback 4 Successful");
                                throw err;
                            })
                        };
                        res.send({companies: result3})
                        console.log("Delete Complete")
                    })
                })  
            })
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