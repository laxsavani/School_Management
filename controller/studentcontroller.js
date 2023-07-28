const student = require("../model/student");
const express = require("express");
const jwt = require("jsonwebtoken");
const cloudnary = require("../helper/cloudinary");
const nodemailer = require("nodemailer");
const path = require("path");
const payFees = require("../model/payFees");

exports.login = (req, res) => {
  res.render("studentLogin");
};
exports.loginPost = async (req, res) => {
  try {
    var email = req.body.email;
    var pass = req.body.pass;

    var data = await student.findOne({ email });
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

          res.redirect("/student/home");
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
    res.render("studentHome");
};