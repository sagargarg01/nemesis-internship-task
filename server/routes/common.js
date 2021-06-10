const express = require("express");
const router = express.Router();

const commonDetailsController = require("../controller/commonDetailsController");
const { isAuthenticatedUser } = require("../utils/authMiddleware");

router.get("/me", isAuthenticatedUser, commonDetailsController.profileDetails);
router.put(
  "/password",
  isAuthenticatedUser,
  commonDetailsController.updatePassword
);

module.exports = router;
