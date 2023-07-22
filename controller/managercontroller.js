const manager = require("../model/manager");
const express = require("express");
const jwt = require('jsonwebtoken')
const cloudnary = require('../helper/cloudinary')

exports.login = (req, res) => {
    res.render("managerLogin");
};
exports.loginPost = async(req, res) => {
    try {
        var email = req.body.email;
      var pass = req.body.pass;
    
      var data = await manager.findOne({ email });
      if (data == null) {
        console.log("Email Not Found");
        req.flash("success", "Email Not Found");
        res.redirect("back");
      } else {
        if (email == data.email) {
          if (pass == data.pass) {
    
            var token = await jwt.sign({userId:data._id},process.env.KEY)
            res.cookie("jwt", token, {
              expires:new Date(Date.now() + 24*60*60*1000)
            })
    
            res.redirect("/manager/home");
          } else {
            res.redirect("back");
            console.log("password Is Worng");
            req.flash("success", "password Is Worng");
          }
        } else {
          res.redirect("back");
          console.log("email Is Worng");
          req.flash("success", "email Is Worng");
        }
      }
      } catch (error) {
        console.log(error);
      }
};
exports.home = (req, res) => {
    res.render("managerHome");
};
exports.form = (req, res) => {
    res.render("managerForm");
};

exports.update = async (req, res) => {
  var obj = await manager.findById(req.params.id);
  res.render("managerUpdate", { obj });
};
exports.updatePost = async (req, res) => {
  try {
    var deletess = await manager.findById(req.params.id)
      if(deletess.imgId)
      {
        var ss=await cloudnary.uploader.destroy(deletess.imgId,(err,data)=>{
          if(err)
          {
            console.log(err);
          }
          console.log(data);
        })
      }
      else
      {
        console.log("image id not define");
      }
    console.log(req.file);
      if(req.file){
        var data = await cloudnary.uploader.upload(req.file.path)
      console.log(data,"data");
      req.body.img = data.secure_url
      req.body.imgId = data.public_id
      var update = await manager.findByIdAndUpdate(req.params.id, req.body);
      if (update) { 
        console.log("Data Updated Successfully!!!");
        req.flash("success", "Data Updated Successfully!!!");
        res.redirect("/admin/tableGeneral");
      } else {
        console.log("Data Not Update");
        req.flash("success", "Data Not Update");
        res.redirect("back");
      }
      }
      else
      {
        var update = await manager.findByIdAndUpdate(req.params.id,req.body);
        if(update)
        {
          res.redirect('/admin/tableGeneral')
        }
        else
        {
          res.redirect('back')
        }
      }
  } catch (error) {
    console.log(error);
  }

}
const nodemailer = require("nodemailer");

exports.mail = async (req, res) => {
  
  var data = await manager.findOne({email:req.body.email});
  if(data==null)
  {
    req.flash("success","Email not found")
    console.log("email not found");
    res.redirect("back");
  }
  else
  {
    var transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "laxsavani4259@gmail.com",
        pass: "zypxhxzjudxwvfmu", 
      },
    });
  
    var otp = Math.floor(100000 + Math.random() * 900000);
    var info = transport.sendMail({
      from: "laxsavani4259@gmail.com",
      to: data.email,
      subject: "OTP",
      html: `OTP:- ${otp}`,
    });
    console.log(otp);
  
    if (info) {
      console.log("OTP Send Successfully"); 
      req.flash("success", "OTP Send Successfully");
      res.redirect('back')
    } else {
      console.log("OTP Not Send");
      req.flash("success", "OTP Not Send");
      res.redirect('back')
    }
  }

  // var data = await manager.findById(req.params.id);
}

exports.deletes = async (req, res) => {
  var data = await manager.findByIdAndDelete(req.params.id);
  if (data) {
    console.log("Data Deleted Successfully!!!");
    req.flash("success", "Data Deleted Successfully!!!");
    res.redirect("back");
  } else {
    console.log("Data Not Deletes");
    req.flash("success", "Data Not Deletes");
    res.redirect("back");
  }
}

exports.forgot = async (req, res) => {
  res.render("forgotManager");
};