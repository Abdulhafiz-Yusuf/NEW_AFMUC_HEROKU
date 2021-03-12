const BloodcenterController = require('../controllers/BloodCenter.Controller');
const express = require('express')
const router = express.Router()

//Bloodcenter Endpoints
//Getting all the Bloodcenter 

router.get('/blood_by_id', BloodcenterController.readBloodGroupByID);
router.post('/readBooking', BloodcenterController.readBooking);
router.post('/addBooking', BloodcenterController.addBooking);
router.get('/', BloodcenterController.readAllBloodGroup);

module.exports = router



