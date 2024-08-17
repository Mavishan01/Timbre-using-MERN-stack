const Admin = require("../models/admin");
const Customer = require("../models/customer");
const jwt = require("jsonwebtoken")

const AuthMiddleWear = async (req, res) => {
    const token = req.cookies.token;

    if(!token){
        return res.json({status: false, message: "No token!!!"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userType = req.cookies.type;

        if(userType === "Customer")
        {
            req.customerID = decoded.id;
            req.userType = "Customer";

            const customer = await Customer.findById(decoded.id)

            if (!customer) {
                return res.status(404).json({ status: false, message: "Customer not found" });
            }

            customerObj = {
                fname: customer.first_name,
                lname: customer.last_name,
                email: customer.email,
                mobile: customer.mobile,
                address: customer.address
            };
            return res.status(200).json({status: true, customerObj});
        }
        else if(userType === "Admin")
        {
            req.adminID = decoded.id;
            req.userType = "Admin";

            const admin = await Admin.findById(decoded.id)

            if (!admin) {
                return res.status(404).json({ status: false, message: "Admin not found" });
            }

            adminObj = {
                fname: admin.first_name,
                lname: admin.last_name,
                email: admin.email,
                username: admin.user_name,
                profile: admin.profile_image
            };
            return res.status(200).json({status: true, adminObj});
        }
        else{
            return res.status(400).json({ status: false, message: "Invalid user type in cookie" });
        }
    }
    catch(err)
    {
        return res.json({status: false})
    }
}

module.exports = AuthMiddleWear;