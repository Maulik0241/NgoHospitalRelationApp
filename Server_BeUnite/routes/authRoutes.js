const express = require("express");
const router = express.Router();
const auth = require("../Middlewares/authTokenRequired");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const NgoData = mongoose.model("NgoData");
const HospitalData = mongoose.model("HospitalData");
const HospitalRequest = require("../models/HospitalRequest");
const ContactUsData = require("../models/ContactUsData");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;


//
require("dotenv").config();
//
const bcrypt = require("bcrypt");

router.use(express.json());

//
const nodemailer = require("nodemailer");

async function mailer(recivermailer, code) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "beunite.helper@gmail.com",
      pass: "nzkeacvpkgkevviz",
    },
    connectionTimeout: 30000, // 30 seconds timeout
  });

  let info = await transporter.sendMail({
    from: "beunite.helper@gmail.com",
    to: `${recivermailer}`,
    subject: "Singup Verification",
    text: `Your Verification Code is ${code}`,
    html: `<b>Your Verification Code is ${code}</b>`,
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}


async function Forgetmailer(recivermailer, link) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "beunite.helper@gmail.com",
      pass: "nzkeacvpkgkevviz",
    },
    connectionTimeout: 30000, // 30 seconds timeout
  });

  let info = await transporter.sendMail({
    from: "beunite.helper@gmail.com",
    to: `${recivermailer}`,
    subject: "Forget password link",
    text: `Your forget password link is ${link}`,
    html: `Your forget password link is <b>${link}</b>`,
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
//

//image upload

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_SECRETE,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "upload/profileImages",
    format: async (req, file) => "png", // or any desired format
    public_id: (req, file) =>
      new Date().toISOString() + "-" + file.originalname,
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Invalid image file!", false);
  }
};

const upload = multer({ storage, fileFilter });


router.put(
  "/ngo/profile/update",
  auth,
  upload.single("profileimage"),
  async (req, res) => {
    try {
      const user = await NgoData.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "NGO not found" });
      }
      user.orgname = req.body.orgname || user.orgname;
      user.contactname = req.body.contactname || user.contactname;
      user.contactemail = req.body.contactemail || user.contactemail;
      user.contactphone = req.body.contactphone || user.contactphone;
      user.address = req.body.address || user.address;
      user.description = req.body.description || user.description;
      user.profileimage =(await cloudinary.uploader.upload(req.file.path, {
        public_id: `${user._id}_profile`,
      })) || req.profileimage;
      await user.save();
      res.status(200).json({ success: "NGO profile updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.put(
  "/hospital/profile/update",
  auth,
  upload.single("profileimage"),
  async (req, res) => {
    try {
      const user = await HospitalData.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "NGO not found" });
      }
      user.orgname = req.body.orgname || user.orgname;
      user.contactname = req.body.contactname || user.contactname;
      user.contactemail = req.body.contactemail || user.contactemail;
      user.contactphone = req.body.contactphone || user.contactphone;
      user.address = req.body.address || user.address;
      user.description = req.body.description || user.description;
      user.profileimage =
        (await cloudinary.uploader.upload(req.file.path, {
          public_id: `${user._id}_profile`,
        })) || req.profileimage;
      await user.save();
      res.status(200).json({ success: "NGO profile updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// ngoRoutes

router.post("/ngo/signup", async(req, res) => {
  // res.send('this is singup page');
  // console.log("send by client-", req.body);
  const {
    orgname,
    contactname,
    contactemail,
    contactphone,
    address,
    password,
  } = req.body;
  
    const ngodata = new NgoData({
      orgname,
      contactname,
      contactemail,
      contactphone,
      address,
      password,
    });

    try {
      await ngodata.save();
      const token = jwt.sign({ _id: ngodata._id }, process.env.JWT_SECRET);
      res.send({ message: "User Regestered Successfully!", token });
    } catch (err) {
      console.log("db err", err);
      // return res.status(422).send({error:err.message});
    }
});

router.post("/ngo/verify", async (req, res) => {
  console.log("send by client-", req.body);
  const {
    orgname,
    contactname,
    contactemail,
    contactphone,
    address,
    password,
  } = req.body;
  
  if (
    !orgname ||
    !contactname ||
    !contactemail ||
    !contactphone ||
    !address ||
    !password
  ) {
    return res.status(422).json({error:"Please filled all details"});
  }
  NgoData.findOne({ contactemail: contactemail }).then(async (savedNgo) => {
    if (savedNgo) {
      return res.status(422).json({error:"Invalid Credentials"});
    }
  });
  try {
    let VerificationCode = Math.floor(100000 + Math.random() * 900000);
    let ngoData = [
      {
        orgname,
        contactname,
        contactemail,
        contactphone,
        address,
        password,
        VerificationCode
      },
    ];
    await mailer(contactemail, VerificationCode);
    res.json({message:"Verification code sent to your email",ngodata:ngoData});
  } catch (error) {
    console.error(error);
    res.status(500).json("Error sending email");
  }
});


router.post("/ngo/login", async (req, res) => {
  const { contactemail, password } = req.body;
  if (!contactemail || !password) {
    return res.status(422).json({ error: "Please Enter Valid Email or Password!" });
  }
  const savedNgo = await NgoData.findOne({ contactemail: contactemail });

  if (!savedNgo) {
    return res.status(422).json({ error: "Invalid Credentials" });
  }

  try {
    bcrypt.compare(password, savedNgo.password, (err, result) => {
      if (result) {
        console.log("Password Matched");
        const token = jwt.sign({ _id: savedNgo._id }, process.env.JWT_SECRET);
        res.send({ _id: savedNgo._id, token }); // Include _id in the response
      } else {
        console.log("Password Not Matched");
        return res.status(422).json({ error: "Invalid Email or Password!" });
      }
    });
  } catch (err) {
    console.log("login db err", err);
    return res.status(422).json({ error: "Invalid Email or Password!" });
  }
});


//Reset Password Of NGO

router.post('/ngo/forget-password', async (req, res) => {
  const contactemail = req.body.contactemail;
  if (!contactemail) {
    console.log("Error!!!!!!!!!!!")
    return res.status(422).json({ error: 'Please fill all details' });
  }

  try {
    const savedNgo = await NgoData.findOne({ contactemail });
    if (!savedNgo) {
      return res.status(404).json({ status: 'User not found' });
    }
    const secret = process.env.JWT_SECRET + savedNgo.password;
    const token = jwt.sign({ email: savedNgo.contactemail, id: savedNgo._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:3000/ngo/reset-password/${savedNgo._id}/${token}`;
    Forgetmailer(contactemail, link)
    res.json({ message: "Reset password mail sent you on your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating reset password link' });
  }
});

router.get("/ngo/reset-password/:id/:token", async (req, res) => {
  const {id,token} = req.params;
  console.log(req.params);

   
  const savedNgo = await NgoData.findOne({ _id: id });
  if (!savedNgo) {
    return res.json({ status: "User not exists" });
  }
  const secret = process.env.JWT_SECRET + savedNgo.password;
  try{
    const verify = jwt.verify(token, secret);
    res.render("forgetpass", { contactemail: verify.email, status: "Not verified" });
}catch(err){
  console.log(err);
  res.send("Not verified")
}
})

router.post("/ngo/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  console.log(req.params);

  if (!password) {
    return res.status(422).json({ error: 'Please provide a new password' });
  }

  try {
    const savedNgo = await NgoData.findOne({ _id: id });
    if (!savedNgo) {
      return res.json({ status: "User not exists" });
    }
    const secret = process.env.JWT_SECRET + savedNgo.password;
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 8);
    await NgoData.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    res.json({ status: "Password Updated" });
    res.render("forgetpass", { contactemail: verify.email, status: "Verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something is wrong" });
  }
});


//


router.get("/ngo-list", async (req, res) => {
  try {
    const ngoData = await NgoData.find({}).exec();
    res.json(ngoData);
  } catch (err) {
    console.error("Error in fetching NGO data: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/ngo/profile", auth, async (req, res) => {
  try {
    const user = await NgoData.findById(req.user.id).select("-password");
    console.log(user);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/ngo/edit-request/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reasonForRejection } = req.body;

    const request = await HospitalRequest.findByIdAndUpdate(
      id,
      { status, reasonForRejection },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/ngo/contactus", auth, async (req, res) => {
  const { orgtype, name, email, message } = req.body;

  const newContactUsData = new ContactUsData({
    orgtype,
    name,
    email,
    message,
  });

  try {
    await newContactUsData.save();
    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save data" });
  }
});

router.delete("/ngo/delete/:id", auth, async (req, res) => {
  const id = req.params.id;

  try {
    const deletedNgo = await NgoData.findByIdAndDelete(id);
    if (!deletedNgo) {
      return res.status(404).send({ error: "NGO not found" });
    }
    res.send({ message: "NGO account deleted successfully!" });
  } catch (err) {
    console.log("db err", err);
    res.status(500).send({ error: "Server error" });
  }
});

//Hospital Routes

router.post("/hospital/signup", async(req, res) => {
  console.log("send by client-", req.body);
  const {
    orgname,
    contactname,
    contactemail,
    contactphone,
    address,
    password,
  } = req.body;
  
  const hospitaldata = new HospitalData({
    orgname,
    contactname,
    contactemail,
    contactphone,
    address,
    password,
  });

  try {
    await hospitaldata.save();
    const token = jwt.sign({ _id: hospitaldata._id }, process.env.JWT_SECRET);
    res.send({ message: "User Regestered Successfully!", token });
  } catch (err) {
    console.log("db err", err);
    // return res.status(422).send({error:err.message});
  }
});


router.post("/hospital/verify", async (req, res) => {
  console.log("send by client-", req.body);
  const {
    orgname,
    contactname,
    contactemail,
    contactphone,
    address,
    password,
  } = req.body;
  if (
    !orgname ||
    !contactname ||
    !contactemail ||
    !contactphone ||
    !address ||
    !password
  ) {
    return res.status(422).json({error:"Please filled all details"});
  }
  HospitalData.findOne({ contactemail: contactemail }).then(async (savedHospital) => {
    if (savedHospital) {
      return res.status(422).json({error:"Invalid Credentials"});
    }
  });
  try {
    let VerificationCode = Math.floor(100000 + Math.random() * 900000);
    let hospitalData = [
      {
        orgname,
        contactname,
        contactemail,
        contactphone,
        address,
        password,
        VerificationCode
      },
    ];
    await mailer(contactemail, VerificationCode);
    res.json({message:"Verification code sent to your email",hospitaldata:hospitalData});
  } catch (error) {
    console.error(error);
    res.status(500).json("Error sending email");
  }
});

router.post("/hospital/login", async (req, res) => {
  const { contactemail, password } = req.body;
  if (!contactemail || !password) {
    return res.status(422).json({ error: "Please Enter Valid Email or Password!" });
  }
  const savedHospital = await HospitalData.findOne({ contactemail: contactemail });

  if (!savedHospital) {
    return res.status(422).json({ error: "Invalid Credentials" });
  }

  try {
    bcrypt.compare(password, savedHospital.password, (err, result) => {
      if (result) {
        console.log("Password Matched");
        const token = jwt.sign({ _id: savedHospital._id }, process.env.JWT_SECRET);
        res.send({ _id: savedHospital._id, token }); // Include _id in the response
      } else {
        console.log("Password Not Matched");
        return res.status(422).json({ error: "Invalid Email or Password!" });
      }
    });
  } catch (err) {
    console.log("login db err", err);
    return res.status(422).json({ error: "Invalid Email or Password!" });
  }
});

//Reset Password
router.post('/hospital/forget-password', async (req, res) => {
  const contactemail = req.body.contactemail;

  if (!contactemail) {
    console.log("Error!!!!!!!!!!!");
    return res.status(422).json({ error: 'Please fill all details' });
  }

  try {
    const savedHospital = await HospitalData.findOne({ contactemail });

    if (!savedHospital) {
      return res.status(404).json({ status: 'User not found' });
    }

    const secret = process.env.JWT_SECRET + savedHospital.password;
    const token = jwt.sign({contactemail:savedHospital.contactemail,id:savedHospital._id}, secret, { expiresIn:"5m" });
    const link = `http://localhost:3000/hospital/reset-password/${savedHospital._id}/${token}`;
    Forgetmailer(contactemail, link);

    res.json({ message: "Reset password mail sent you on your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating reset password link' });
  }
});

router.get("/hospital/reset-password/:id/:token", async (req, res) => {
  const {id,token} = req.params;
  console.log(req.params);

   
  const savedHospital = await HospitalData.findOne({ _id: id });
  if (!savedHospital) {
    return res.json({ status: "User not exists" });
  }
  const secret = process.env.JWT_SECRET + savedHospital.password;
  try{
    const verify = jwt.verify(token, secret);
    res.render("forgetpass", { contactemail: verify.email, status: "Not verified" });
}catch(err){
  console.log(err);
  res.send("Not verified")
}
})

router.post("/hospital/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  console.log(req.params);

  if (!password) {
    return res.status(422).json({ error: 'Please provide a new password' });
  }

  try {
    const savedHospital = await HospitalData.findOne({ _id: id });
    if (!savedHospital) {
      return res.json({ status: "User not exists" });
    }
    const secret = process.env.JWT_SECRET + savedHospital.password;
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 8);
    await HospitalData.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    res.json({ status: "Password Updated" });
    res.render("forgetpass", { contactemail: verify.email, status: "Verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something is wrong" });
  }
});


//


router.get("/hospital/profile", auth, async (req, res) => {
  try {
    const user = await HospitalData.findById(req.user.id).select("-password");
    console.log(user);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/hospital-list", async (req, res) => {
  try {
    const hospitalData = await HospitalData.find({}).exec();
    res.json(hospitalData);
  } catch (err) {
    console.error("Error in fetching NGO data: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/hospital/profile/delete", auth, async (req, res) => {
  try {
    const hospital = await HospitalData.findById(req.params.id);
    if (!hospital) {
      return res.status(404).send("Hospital profile not found");
    }
    await hospital.remove();
    res.send("Hospital profile deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/hospital/contactus", auth, async (req, res) => {
  const { orgtype, name, email, message } = req.body;

  const newContactUsData = new ContactUsData({
    orgtype,
    name,
    email,
    message,
  });

  try {
    await newContactUsData.save();
    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save data" });
  }
});

router.delete("/hospital/delete/:id", auth, async (req, res) => {
  const id = req.params.id;

  try {
    const deletedHospital = await HospitalData.findByIdAndDelete(id);
    if (!deletedHospital) {
      return res.status(404).send({ error: "Hospital not found" });
    }
    res.send({ message: "Hospital account deleted successfully!" });
  } catch (err) {
    console.log("db err", err);
    res.status(500).send({ error: "Server error" });
  }
});

//Request Hospital to ngo

router.post("/hospital/request", auth, async (req, res) => {
  try {
    const hospitalRequest = new HospitalRequest(req.body);
    const savedRequest = await hospitalRequest.save();
    res.status(201).send({ _id: savedRequest._id, hospitalRequest });
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get("/hospital/request-status", auth, async (req, res) => {
  try {
    const RequestList = await HospitalRequest.find({}).exec();
    res.json(RequestList);
  } catch (err) {
    console.log({ err: "Don't get Data from HospitalRequest!" });
  }
});

module.exports = router;
