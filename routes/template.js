const express = require("express");
const router = express.Router();
const check = require("../middleware/auth");
const templateController = require("../controllers/templateController");

//Rutas

router.post("/createTemplate", check.auth, templateController.createTemplate);

router.get(
  "/getPublicTemplates",
  check.auth,
  templateController.getPublicTemplates
);
router.get("/getTemplates", check.auth, templateController.getTemplates);
router.get(
  "/getTemplateById/:id",
  check.auth,
  templateController.getTemplateById
);
router.put(
  "/updateTemplate/:id",
  check.auth,
  templateController.updateTemplate
);
router.delete(
  "/deleteTemplate/:id",
  check.auth,
  templateController.deleteTemplate
);

module.exports = router;
