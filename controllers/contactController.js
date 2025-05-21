const Audience = require("../models/Audience");
const Contact = require("../models/Contact");

const getContactsByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).send({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }

    const contacts = await Contact.find({ user: userId });

    if (!contacts) {
      return res.status(404).send({
        status: "error",
        message: "No se han encontrado contactos para este usuario",
      });
    }

    return res.status(200).send({
      status: "success",
      message: "Contactos del usuario encontrados",
      contacts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: error,
      message: "Error en el getContactsByUser",
    });
  }
};

const createContact = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, tags, location } = req.body;

    if (!name || !email) {
      return res.status(404).send({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }

    const newContact = new Contact({
      name,
      email,
      tags,
      location,
      user: userId,
    });

    const savedContact = await newContact.save();

    return res.status(200).send({
      status: "success",
      contact: savedContact,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Error en el createContact",
    });
  }
};

const eliminateContact = async (req, res) => {
  try {
    const userId = req.user.id;
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({
        status: "error",
        message: "Faltan datos",
      });
    }

    const eliminatedContact = await Contact.findOneAndDelete({
      user: userId,
      email: email,
    });

    if (eliminatedContact) {
      return res.status(200).send({
        status: "success",
        message: "EliminateContact realizado con éxito",
        contact: eliminatedContact,
      });
    } else {
      return res.status(404).send({
        status: "error",
        message: "No se encontró un contacto con ese email",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Error en el eliminateContact",
    });
  }
};

// Agregar un nuevo contacto a una audiencia
const addContact = async (req, res) => {
  try {
    const { audienceId } = req.params;
    const { name, email, tags, location } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }

    const audience = await Audience.findOne({
      _id: audienceId,
      userId: req.user.id,
    });

    if (!audience) {
      return res.status(404).json({
        status: "error",
        message: "Audiencia no encontrada",
      });
    }

    const newContact = { name, email, tags, location };
    audience.contacts.push(newContact);

    await audience.save();

    return res.status(201).json({
      status: "success",
      message: "Contacto agregado correctamente",
      contact: newContact,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Error al agregar contacto",
    });
  }
};

// Obtener todos los contactos de una audiencia
const getContactsByAudience = async (req, res) => {
  try {
    const { audienceId } = req.params;

    const audience = await Audience.findOne({
      _id: audienceId,
      userId: req.user.id,
    });

    if (!audience) {
      return res.status(404).json({
        status: "error",
        message: "Audiencia no encontrada",
      });
    }

    return res.status(200).json({
      status: "success",
      contacts: audience.contacts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Error al obtener los contactos",
    });
  }
};

// Obtener un contacto concreto de una audiencia
const getContactById = async (req, res) => {
  try {
    const { emailParams } = req.params;

    const contact = await Contact.findOne({
      user: req.user.id,
      email: emailParams,
    });

    if (!contact) {
      return res.status(404).json({
        status: "error",
        message: "Contacto no encontrado",
      });
    }
 
    return res.status(200).json({
      status: "success",
      contact,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Error al obtener el contacto",
    });
  }
};

// Actualizar un contacto en una audiencia
const updateContact = async (req, res) => {
  try {
    const { emailParams } = req.params;
    const { name, tags, location } = req.body;

    const updatedContact = await Contact.findOneAndUpdate({
        user: req.user.id,
        email: emailParams,
      },
      {
        ...(name && { name }),
        ...(tags && { tags }),
        ...(location && { location }),
      }
    );

    if (!updatedContact) {
      return res.status(404).json({
        status: "error",
        message: "Contacto no encontrado",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Contacto actualizado correctamente",
      updatedContact,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Error al actualizar el contacto",
    });
  }
};

// Eliminar un contacto de una audiencia
const deleteContact = async (req, res) => {
  try {
    const { audienceId, contactId } = req.params;

    const audience = await Audience.findOne({
      _id: audienceId,
      userId: req.user.id,
    });

    if (!audience) {
      return res.status(404).json({
        status: "error",
        message: "Audiencia no encontrada",
      });
    }

    const contact = audience.contacts.id(contactId);

    if (!contact) {
      return res.status(404).json({
        status: "error",
        message: "Contacto no encontrado",
      });
    }

    contact.remove();
    await audience.save();

    return res.status(200).json({
      status: "success",
      message: "Contacto eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Error al eliminar el contacto",
    });
  }
};

module.exports = {
  addContact,
  getContactsByAudience,
  getContactById,
  updateContact,
  deleteContact,
  getContactsByUser,
  createContact,
  eliminateContact,
};
