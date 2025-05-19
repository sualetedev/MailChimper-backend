const express = require("express");
const router = express.Router();
const check = require("../middleware/auth");
const ContactController = require("../controllers/contactController");

// Rutas
/**
 * @swagger
 * /api/contact/getContactsByUser:
 *   get:
 *     summary: Obtener todos los contactos de un usuario
 *     tags:
 *       - Contactos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contactos del usuario
 *       400:
 *         description: Faltan datos por enviar
 *       404:
 *         description: No se encontraron contactos
 *       500:
 *         description: Error del servidor
 */

router.get(
  "/getContactsByUser",
  check.auth,
  ContactController.getContactsByUser
);

/**
 * @swagger
 * /api/contact/createContact:
 *   post:
 *     summary: Crear un nuevo contacto
 *     tags:
 *       - Contactos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contacto creado exitosamente
 *       404:
 *         description: Faltan datos por enviar
 *       500:
 *         description: Error del servidor
 */

router.post("/createContact", check.auth, ContactController.createContact);
/**
 * @swagger
 * /api/contact/eliminateContact:
 *   delete:
 *     summary: Eliminar un contacto por email
 *     tags:
 *       - Contactos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contacto eliminado exitosamente
 *       404:
 *         description: Contacto no encontrado
 *       400:
 *         description: Faltan datos
 *       500:
 *         description: Error del servidor
 */
router.delete(
  "/eliminateContact",
  check.auth,
  ContactController.eliminateContact
);
/**
 * @swagger
 * /api/contact/{audienceId}/add:
 *   post:
 *     summary: Agregar un contacto a una audiencia
 *     tags:
 *       - Contactos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: audienceId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la audiencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contacto agregado correctamente
 *       404:
 *         description: Audiencia no encontrada
 *       400:
 *         description: Faltan datos por enviar
 *       500:
 *         description: Error del servidor
 */
router.post("/:audienceId/add", check.auth, ContactController.addContact);
/**
 * @swagger
 * /api/contact/{audienceId}:
 *   get:
 *     summary: Obtener todos los contactos de una audiencia
 *     tags:
 *       - Contactos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: audienceId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la audiencia
 *     responses:
 *       200:
 *         description: Lista de contactos de la audiencia
 *       404:
 *         description: Audiencia no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get("/:audienceId", check.auth, ContactController.getContactsByAudience);
/**
 * @swagger
 * /api/contact/{audienceId}/{contactId}:
 *   get:
 *     summary: Obtener un contacto específico de una audiencia
 *     tags:
 *       - Contactos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: audienceId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: contactId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contacto encontrado
 *       404:
 *         description: Audiencia o contacto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get(
  "/:audienceId/:contactId",
  check.auth,
  ContactController.getContactById
);
/**
 * @swagger
 * /api/contact/{audienceId}/{contactId}:
 *   put:
 *     summary: Actualizar un contacto dentro de una audiencia
 *     tags:
 *       - Contactos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: audienceId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: contactId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contacto actualizado correctamente
 *       404:
 *         description: Audiencia o contacto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put(
  "/:audienceId/:contactId",
  check.auth,
  ContactController.updateContact
);
/**
 * @swagger
 * /api/contact/{audienceId}/{contactId}:
 *   delete:
 *     summary: Eliminar un contacto de una audiencia
 *     tags:
 *       - Contactos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: audienceId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: contactId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contacto eliminado correctamente
 *       404:
 *         description: Audiencia o contacto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete(
  "/:audienceId/:contactId",
  check.auth,
  ContactController.deleteContact
);

module.exports = router;
