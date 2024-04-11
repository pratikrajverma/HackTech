const express = require('express');
const router = express.Router();

const {auth,isStudent} = require('../middleware/auth')

const {capturePayment, varifySignature} = require('../controllers/Payments')



router.post('/capturePayment', auth, isStudent, capturePayment);
router.post("/varifySignature", varifySignature)

module.exports = router;