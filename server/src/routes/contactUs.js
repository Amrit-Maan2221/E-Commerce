const { contactUsController } = require("../controllers/contactUsController");

//Contact
const contactUsRoute = {
    path: '/api/contact',
    method: 'post',
    handler: contactUsController
}


exports.contactUsRoutes = [contactUsRoute]