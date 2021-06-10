const Ngo = require("../models/Ngo");
const User = require("../models/User");
const Job = require("../models/Job");
const sendTokenNgo = require("../utils/jwtTokenNgo");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

module.exports.signup = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    const ngo = await Ngo.findOne({ email: req.body.email });
    if (ngo || user) {
      return res.status(400).json({
        error: "Ngo already exist with this email",
        success: false,
      });
    }

    const newNgo = await Ngo.create(req.body);
    sendTokenNgo(newNgo, 200, res);
  } catch (err) {
    console.log("ERROR", err);
    return res.status(400).json({
      success: false,
    });
  }
};

module.exports.getNgo = async (req, res) => {
  try {
    const NgoData = await Ngo.findById(req.query.id);

    return res.status(200).json({
      success: true,
      data: NgoData,
    });
  } catch (error) {
    console.log("error", err);

    return res.status(400).json({
      message: "bad request",
      success: false,
    });
  }
};

module.exports.getAllNgo = async (req, res) => {
  try {
    const result = new APIFeatures(Ngo.find(), req.query).search();
    const ngoList = await result.mongooseQuery;

    return res.status(200).json({
      success: true,
      ngoList,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(400).json({
      message: "bad request",
      success: false,
    });
  }
};

exports.updateNgoProfile = async (req, res, next) => {
  try {
    console.log("ngo------------------------------->");
    const newNgoData = {
      name: req.body.name,
      head: req.body.head,
      email: req.body.email,
      description: req.body.description,
    };

    if (req.body.avatar !== "") {
      const ngo = await Ngo.findById(req.user.id);

      const result = await cloudinary.v2.uploader.upload_large(
        req.body.avatar,
        {
          folder: "ngo",
          width: 150,
          crop: "scale",
        }
      );

      const image_id = ngo.avatar.public_id;
      if (image_id) {
        const res = await cloudinary.v2.uploader.destroy(image_id);
      }

      newNgoData.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }
    const ngo = await Ngo.findByIdAndUpdate(req.user.id, newNgoData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      data: ngo,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Internal server error maybe File size too large",
    });
  }
};

module.exports.createPost = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    job.ngo = req.user._id;
    await job.save();

    return res.status(200).json({
      success: true,
      message: "Job Created Successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.getAllJobs = async (req, res) => {
  try {
    // const jobs = await Job.find({}).populate("ngo", "name , avatar");
    const result = new APIFeatures(
      Job.find({}).populate("ngo", "name , avatar"),
      req.query
    ).location();
    const jobList = await result.mongooseQuery;

    return res.status(200).json({
      success: true,
      data: jobList,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.getJobDetails = async (req, res) => {
  try {
    const jobData = await Job.findById(req.query.id).populate("ngo");
    return res.status(200).json({
      success: true,
      data: jobData,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(400).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports.getSpecificNgoJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ ngo: req.user._id });
    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (err) {
    console.log("error", err);
    return res.status(400).json({
      message: "Internal server error",
      success: false,
    });
  }
};
module.exports.getApplicants = async (req, res) => {
  try {
    const job = await Job.findById(req.query.id).populate("candidates");
    return res.status(200).json({
      success: true,
      data: job.candidates,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports.expireHandler = async (req, res) => {
  try {
    const job = await Job.findById(req.query.id);
    job.expired = true;
    await job.save();
    const allJobs = await Job.find({ ngo: req.user._id });
    return res.status(200).json({
      success: true,
      data: allJobs,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports.testController = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  return res.status(200).json({
    message: "bazinga",
  });
};
