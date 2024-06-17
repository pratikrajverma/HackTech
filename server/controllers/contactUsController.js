const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")
const ContactusForm = require('../models/ContactusForm')




const contactUsController = async (req, res) => { 
  const { email, firstname, lastname, message, phoneNo    } = req.body
  console.log(req.body)
  try {
    const response = await ContactusForm.create({email: email, firstname: firstname, lastname: lastname, message: message, phoneNo: phoneNo})
    console.log("Email Res ", response)
    const emailRes = await mailSender( 
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo   )
    ) 
    console.log("Email Res ", emailRes)

    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}

module.exports = {contactUsController}