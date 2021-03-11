const db = require('../models/db.js');


//=========================
//  User controllers
//=========================


exports.checkIfUserExistIndb = (req, res) => {
    /*
    checkUser in db 
    if exist: return full user info
     else: return userExist false
    */
    const email = req.body.email
    console.log(email)
    db.query(`SELECT users_id,username,email,email_verified,f_name,l_name,phone,user_loc_state,loc_lga,donor,
                bg,rhd,qty,postdate
            FROM users, bloodgroup
            WHERE email=$1 AND bg_id = blood_group`, [email])
        .then(q_res => {
            console.log(q_res.rows)
            res.status(200).send({ userExist: true, user: q_res.rows })
        })
        // else res.status(200).send({ userExist: false }); //if User Doesn't Exist
        .catch(q_err => {
            console.log({ Error: q_err.message })
            res.status(500).send({ Error: q_err.message }) //DB ERROR
        })

}
exports.regCompletion = (req, res, next) => {
    console.log({ dataToSubmit: req.body })
    const values = [
        req.body.username,
        req.body.email,
        req.body.email_verified,
        req.body.phone,
        req.body.user_loc_state,
        req.body.loc_lga,
        req.body.donor,
        req.body.bg
    ]
    const username = req.body.username;
    db.query(`INSERT INTO 
    users(username, email, email_verified, phone, user_loc_state, loc_lga, donor, bg, date_created, last_login)
              VALUES($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
        ON CONFLICT DO NOTHING`, values)
        .then(q_res => {
            if (q_res) {
                // Send user extracted from database in response
                //res.status(200).send({ success: true })
                console.log(username)
                db.query(`SELECT * FROM users WHERE username=$1`, [username])
                    .then(q_res => {
                        res.status(200).send({
                            success: true,
                            user: q_res.rows //USER FULL INFO 
                        })
                        console.log({ fullUserInfo: q_res.rows })
                    })
                    .catch(q_err => {
                        console.log({ Error: q_err.message })
                        res.status(500).send({ Error: q_err.message }) //DB ERROR
                    })
            }

        })
        .catch(q_err => {
            console.log({ Error: q_err.message })
            res.status(500).send({ Error: q_err.message }) //DB ERROR
        })
}
exports.makeADonor = async (req, res, next) => {
    const user_id = req.query.user_id
    console.log(user_id)
    //     db.query(`SELECT * FROM posts
    //               WHERE user_id=$1`, [user_id],
    //         (q_err, q_res) => {
    //             res.json(q_res.rows)
    //         })

}
// exports.otheruserprofilefromdb = async (req, res, next) => {
//     // const email = [ "%" + req.query.email + "%"]
//     const username = String(req.query.username)
//     db.query(`SELECT * FROM users
//               WHERE username = $1`,
//         [username], (q_err, q_res) => {
//             res.json(q_res.rows)
//         });
// }
// exports.otheruserposts = async (req, res, next) => {
//     const username = String(req.query.username)
//     db.query(`SELECT * FROM posts
//               WHERE author = $1`,
//         [username], (q_err, q_res) => {
//             res.json(q_res.rows)
//         });
// }



