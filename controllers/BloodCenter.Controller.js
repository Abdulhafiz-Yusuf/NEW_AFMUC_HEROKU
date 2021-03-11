const db = require('../models/db');

//=========================
//  Bloodcenter controllers
//=========================

exports.readAllBloodGroup = (req, res,) => {
    db.query(`SELECT * FROM bloodgroup ORDER BY bg_id ASC`)
        .then(result => {
            // Send books extracted from database in response
            console.log(result.rows)
            res.status(200).send({ bg: result.rows })
        })
        .catch(q_err => {
            console.log({ Error: q_err.message })
            res.status(500).send({ Error: q_err.message }) //DB ERROR
        })
}

exports.readBloodGroupByID = (req, res, next) => {
    const id = req.query.id;
    let bcDetail = {}
    let bgDetail = {};

    db.query(`SELECT bc.bc_id, bc.centername,bc.locstate,bc.loclga,bc.qty 
                FROM bloodcenter bc
                WHERE bc.bg = $1
                ORDER BY bg ASC`, [id])
        .then(bcresult => {
            // Send blood center extracted from database in response
            bcDetail = bcresult.rows
            db.query(`SELECT bg.bg_id,bg.bg, bg.rhd
                FROM bloodgroup bg
                WHERE bg.bg_id = $1
                ORDER BY bg ASC`, [id])
                .then(bgresult => {
                    bgDetail = bgresult.rows
                    console.log({ bcDetail, bgDetail })
                    res.status(200).send({ bcDetail, bgDetail })
                })
        })
        .catch(q_err => {
            console.log(q_err.message)
            res.status(500).send({ Error: q_err.message }) //DB ERROR
        })
}


exports.readBooking = (req, res,) => {
    const userId = req.body.users_Id
    console.log(userId)
    db.query(`SELECT bg.bg, bg.rhd, bc.centername, bc.locstate, bc.loclga, bc.qty
                FROM booking bk, bloodcenter bc, bloodgroup bg
                WHERE (bk.bg = bg_id) AND (bk.myusers=$1)`, [userId])
        .then(result => {
            // Send booking extracted from database in response
            console.log(result.rows)
            res.status(200).send(result.rows)
        })
        .catch(q_err => {
            console.log({ Error: q_err.message })
            res.status(500).send({ Error: q_err.message }) //DB ERROR
        })
}


exports.addBooking = (req, res,) => {
    const values = [
        req.body.users_id,
        req.body.bc_id,
        req.body.bg_id,
    ]

    db.query(`INSERT INTO booking(myusers, bc,bg,postdate)
                VALUES($1,$2,$3,NOW())`, values)
        .then(result => {
            // Send booking extracted from database in response
            res.status(200).send({ success: true })
        })
        .catch(q_err => {
            console.log({ Error: q_err.message })
            res.status(500).send({ Error: q_err.message }) //DB ERROR
        })
}