const express = require("express");
const server = express();
const nodemailer = require("nodemailer");
const bodyParse = require("body-parser");
const cors = require("cors");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/Portfolio")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(`error for connected database ${err.message}`);
  });

const mongooseSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    unique: false,
  },
  email: {
    type: String,
  },
  text: {
    type: String,
    unique: false,
    unique: false,
  },
});

const transporter = nodemailer.createTransport({
  service: "Gmail", // or your preferred email service
  auth: {
    user: "montukharb868@gmail.com",
    pass: "altqwjtgfgngjkvr",
  },
});

server.use(cors());
server.use(bodyParse.json());

server.post("/", async (req, res) => {
  res.json("app is running");

  const mailOptions = {
    from: "montukharb868@gmail.com",
    to: `${req.body.useremail}`,
    subject: "By Code team ",
    //   text: ''
    html: `
       <!doctype html>
       <html>
         <head>
           <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
         </head>
         <body style="font-family: sans-serif;">
            <h4>Dear ${req.body.username}!</h4>
            <p>Thank you for reaching out and sharing your portfolio with me. I appreciate the opportunity to review your work and provide feedback. I've spent some time going through your portfolio, and I must say that I'm truly impressed by your talent, creativity, and the dedication you've put into your projects.</p>
            <img src="cid:box" alt="image" width="400":/>
            <p>Firstly, I wanted to commend you on your exceptional technical skills. The level of craftsmanship evident in your work is outstanding. The attention to detail, use of color, and overall composition demonstrate a keen eye for aesthetics. It's clear that you possess a deep understanding of your craft, and it shows in each piece. </p>
            <br/>    
         <p>1. While your visuals are captivating, it could be beneficial to include a section where you share some of your creative processes, such as sketches, initial drafts, or progress shots. This helps demonstrate the journey from concept to final product and highlights your problem-solving abilities.
            <br/>
            Remember that these suggestions are meant to be constructive, and ultimately, it's essential to stay true to your artistic vision and personal style.
            <br/>
           
            In conclusion, I want to reiterate my admiration for your impressive portfolio. Your talent, passion, and dedication are undeniable, and I have no doubt that you have a bright future ahead in the creative industry. Keep pushing your boundaries, exploring new techniques, and never stop honing your craft.
            <br/>
            Should you have any further questions or require additional feedback, please don't hesitate to reach out. I'm here to support you on your creative journey. </p>
            <br/>
            Best reqards,
            Montu kharb <br/>
            Front-End,Back-End,DB, profession - coding and coaching students ,
            <br/>
            contact no:+91-805-920-2360 ! 
  
        </body>
      </html>
  `,
    attachments: [
      {
        filename: "box.jpg",
        path: __dirname + "/box.jpg",
        cid: "box",
        cid2: "box",
      },
    ],
  };

  // Send the email
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });

  const schemamodel = new mongoose.model("customers", mongooseSchema);
  const result = new schemamodel({
    name: req.body.username,
    email: req.body.useremail,
    text: req.body.usertext,
  });
  await result.save();
  if (result) {
    console.log("data inserted ");
  } else {
    console.log("data not inserted");
  }
});
server.listen(8080);

