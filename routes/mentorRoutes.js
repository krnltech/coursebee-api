const router = require("express").Router();
const bcrypt = require("bcrypt");
const Mentor = require("../models/mentor");
const Course = require("../models/course");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ email: req.body.email });
    if (mentor) {
      res.json({
        success: false,
        message: `Mentor already registered with email ${req.body.email}`,
      });
    } else {
      const saltRounds = 10;
      let tempmentor = req.body;
      bcrypt.genSalt(saltRounds, async (err, salt) => {
        if (err) {
          res.json({ success: false, message: err.message });
        } else {
          bcrypt.hash(tempmentor.password, salt, async (err, hash) => {
            if (err) {
              res.json({ success: false, message: err.message });
            } else {
              tempmentor.password = hash;
              const mentor = new Mentor(tempmentor);
              await mentor.save();
              res.json({
                success: true,
                message: `Mentor successfully registered with email ${req.body.email}`,
              });
            }
          });
        }
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ email: req.body.email });
    if (mentor) {
      bcrypt.compare(req.body.password, mentor.password, (err, result) => {
        if (err) {
          res.json({ success: false, message: err.message });
        } else {
          if (result) {
            var token = jwt.sign(
              {
                user: {
                  fullname: mentor.fullname,
                  email: mentor.email,
                  id: mentor._id,
                  type: "mentor",
                },
              },
              process.env.JWTSECRET
            );
            res.json({
              success: true,
              message: `Successfully logged in as mentor ${mentor.fullname}`,
              username: mentor.fullname,
              token: token,
              uid: mentor._id,
            });
          } else {
            res.json({
              success: false,
              message: `Password does not match`,
            });
          }
        }
      });
    } else {
      res.json({
        success: false,
        message: `No user found with email ${req.body.email}`,
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

router.post("/addcourse", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.json({ success: true, message: `Successfully added ${course.name}` });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

router.post("/addsection/:courseid", async (req, res) => {
  try {
    const course = await Course.updateOne(
      { _id: req.params.courseid },
      { $push: { section: req.body } }
    );
    res.json({
      success: true,
      message: `Successfully added section: ${req.body.name} to course: ${course.name}`,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

router.post("/addcontent/:courseid/:sectionid", async (req, res) => {
  try {
    let sid = "section." + req.params.sectionid + ".contents";
    const course = await Course.updateOne(
      { _id: req.params.courseid },
      { $push: { sid: req.body } }
    );
    res.json({
      success: true,
      message: `Successfully added section: ${req.body.name} to course: ${course.name}`,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

module.exports = router;
