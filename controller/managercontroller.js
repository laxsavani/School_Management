const manager = require("../model/manager");
const student = require("../model/student");
const express = require("express");
const jwt = require("jsonwebtoken");
const cloudnary = require("../helper/cloudinary");
const nodemailer = require("nodemailer");
const path = require("path");
const payFees = require("../model/payFees");

exports.studentRegister = async (req, res) => {
  try {
    const {
      name,
      semail,
      smobile,
      course,
      fees,
      time,
      date,
      gender,
      pmobile,
      pemail,
    } = req.body;
    const pass = req.body.smobile;

    var image = await cloudnary.uploader.upload(req.file.path);
    var img = image.secure_url;
    var imgId = image.public_id;

    var data = await student.findOne({ semail });
    if (data == null) {
      var datas = await student.create({
        name,
        semail,
        smobile,
        course,
        fees,
        time,
        date,
        gender,
        img,
        imgId,
        pmobile,
        pemail,
        pass,
      });
      if (datas) {
        console.log("Data Added Successfully!!!");
        req.flash("success", "Student Register SuccessFully");
        res.redirect("back");
      } else {
        console.log("Data Not Added");
        req.flash("success", "Data Not Added");
        res.redirect("back");
      }
    } else {
      req.flash("success", "Email Already Exist");
      res.redirect("back");
      console.log("Email Already Exist");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.login = (req, res) => {
  res.render("managerLogin");
};
exports.table = async (req, res) => {
  var datas = await student.find({});
  res.render("managerTable", { datas });
};
exports.showSutdentDetail = async (req, res) => {
  var datas = await student.findById(req.params.id);
  var fees = await payFees.find({ studentId: req.params.id });
  var last = await fees.slice(-1);
  res.render("studentDetail", { datas, last });
};

exports.loginPost = async (req, res) => {
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
          var token = await jwt.sign({ userId: data._id }, process.env.KEY);
          res.cookie("jwt", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          });

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
    var deletess = await manager.findById(req.params.id);
    if (deletess.imgId) {
      var ss = await cloudnary.uploader.destroy(deletess.imgId, (err, data) => {
        if (err) {
          console.log(err);
        }
        console.log(data);
      });
    } else {
      console.log("image id not define");
    }
    console.log(req.file);
    if (req.file) {
      var data = await cloudnary.uploader.upload(req.file.path);
      // console.log(data, "data");
      req.body.img = data.secure_url;
      req.body.imgId = data.public_id;
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
    } else {
      var update = await manager.findByIdAndUpdate(req.params.id, req.body);
      if (update) {
        res.redirect("/admin/tableGeneral");
      } else {
        res.redirect("back");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.supdate = async (req, res) => {
  var obj = await student.findById(req.params.id);
  res.render("studentUpdate", { obj });
};
exports.supdatePost = async (req, res) => {
  try {
    var deletess = await student.findById(req.params.id);
    // console.log(deletess);
    if (req.file) {
      if (deletess.imgId) {
        var ss = await cloudnary.uploader.destroy(
          deletess.imgId,
          (err, data) => {
            if (err) {
              console.log(err);
            }
            console.log(data);
          }
        );
      } else {
        console.log("image id not define");
      }
      // console.log(req.file);
      var data = await cloudnary.uploader.upload(req.file.path);
      // console.log(data, "data");
      req.body.img = data.secure_url;
      req.body.imgId = data.public_id;
      var update = await student.findByIdAndUpdate(req.params.id, req.body);
      if (update) {
        console.log("Data Updated Successfully!!!");
        req.flash("success", "Data Updated Successfully!!!");
        res.redirect("/manager/showSutdentDetail/" + req.params.id);
      } else {
        console.log("Data Not Update");
        req.flash("success", "Data Not Update");
        res.redirect("back");
      }
    } else {
      var update = await student.findByIdAndUpdate(req.params.id, req.body);
      if (update) {
        res.redirect("/manager/showSutdentDetail/" + req.params.id);
      } else {
        res.redirect("back");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.newPassword = async (req, res) => {
  var data = await manager.findOne({ email: req.cookies.otp[1] });
  var datas = await manager.findByIdAndUpdate(data.id, {
    pass: req.body.password,
  });
  if (datas) {
    req.flash("success", "password updated successfully");
    res.redirect("/manager");
  } else {
    req.flash("success", "password not updated");
    res.redirect("back");
  }
};

exports.conformOTP = async (req, res) => {
  res.render("conformOTPManager");
};
exports.conformOTPPost = async (req, res) => {
  var otp = req.cookies.otp[0];
  if (otp == req.body.otp) {
    console.log("otp matches");
    res.render("newPassword");
  } else {
    console.log("otp does not match");
    req.flash("success", "otp does not match");
    res.redirect("back");
  }
};

exports.mail = async (req, res) => {
  var data = await manager.findOne({ email: req.body.email });
  if (data == null) {
    req.flash("success", "Email not found");
    console.log("email not found");
    res.redirect("back");
  } else {
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
      res.cookie("otp", [otp, data.email]);
      res.render("conformOTPManager");
    } else {
      console.log("OTP Not Send");
      req.flash("success", "OTP Not Send");
      res.redirect("back");
    }
  }

  // var data = await manager.findById(req.params.id);
};

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
};

exports.forgot = async (req, res) => {
  res.render("forgotManager");
};

exports.fees = async (req, res) => {
  var studentId = await req.params.id;
  const { payment, date, amount } = req.body;
  var datas = await student.findById(studentId);
  var paid_fees = parseInt(datas.paid_fees) + parseInt(amount);
  var panding_fees = parseInt(datas.fees) - parseInt(paid_fees)
  var update = await student.findByIdAndUpdate(studentId, {paid_fees, panding_fees})
  var data = await payFees.create({ payment, date, amount, studentId });
  if (data) {
    req.flash("success", "Fees Payed Success");
    res.redirect("back");
  } else {
    req.flash("success", "Fees Not Payed");
    res.redirect("back");
  }
};
