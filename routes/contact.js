const express = require("express");
const router = express.Router();
const check = require("../middleware/auth");
const ContactController = require("../controllers/contactController");

// Rutas

router.get(
  "/getContactsByUser",
  check.auth,
  ContactController.getContactsByUser
);

router.post("/createContact", check.auth, ContactController.createContact);

router.delete(
  "/eliminateContact",
  check.auth,
  ContactController.eliminateContact
);

router.post("/:audienceId/add", check.auth, ContactController.addContact);

router.get("/:audienceId", check.auth, ContactController.getContactsByAudience);

router.get(
  "/:audienceId/:contactId",
  check.auth,
  ContactController.getContactById
);

router.put(
  "/:audienceId/:contactId",
  check.auth,
  ContactController.updateContact
);

router.delete(
  "/:audienceId/:contactId",
  check.auth,
  ContactController.deleteContact
);

module.exports = router;
