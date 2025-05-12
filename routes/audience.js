const express = require("express");
const router = express.Router();
const check = require("../middleware/auth");
const AudienceController = require("../controllers/audienceController");

//Rutas
router.post("/createAudience", check.auth, AudienceController.createAudience);

router.get("/getAudience", check.auth, AudienceController.getAudience);

router.get(
  "/getAudienceById/:id",
  check.auth,
  AudienceController.getAudienceById
);

router.delete(
  "/deleteAudience/:id",
  check.auth,
  AudienceController.deleteAudience
);

module.exports = router;
