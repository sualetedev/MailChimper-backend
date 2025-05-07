const Template = require("../models/Template");
const mongoose = require("mongoose");

const createTemplate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, content } = req.body;

    if (!name || !content) {
      return res.status(404).send({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }
    const template = new Template({
      name,
      content,
      userId: userId,
    });
    await template.save();

    return res.status(200).send({
      status: "success",
      message: "Template creada correctamente",
      template,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Error en el createTemplate",
    });
  }
};

const getPublicTemplates = async (req, res) => {
  const publicId = "680f42a97b4cc3f43fe5d5c8";
  try {
    const templates = await Template.find({
      userId: publicId});

    return res.status(200).send({
      status: "success",
      message: "Templates publicos obtenidos correctamente",
      templates,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Error en el getTemplates",
    });
  }
};


const getTemplates = async (req, res) => {
  const userId = req.user.id;
  try {
    const templates = await Template.find({userId: userId});

    return res.status(200).send({
      status: "success",
      message: "Templates obtenidos correctamente",
      templates,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Error en el getTemplates",
    });
  }
};


const getTemplateById = async (req, res) => {
  const templateId = req.params.id;
  try {
    const template = await Template.findOne({_id: templateId });
    if (!template) {
      return res.status(404).send({
        status: "error",
        message: "Template no encontrada",
      });
    }
    return res.status(200).send({
      status: "success",
      message: "Template obtenida correctamente",
      template,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Error en el getTemplateById",
    });
  }
};

const updateTemplate = async (req, res) => {
  const userId = req.user.id;
  const templateId = req.params.id;
  const { name, content } = req.body;

  try {
    const template = await Template.findOneAndUpdate(
      { userId: userId, _id: templateId },
      { name, content },
      { new: true }
    );
    if (!template) {
      return res.status(404).send({
        status: "error",
        message: "Template no encontrada",
      });
    }
    return res.status(200).send({
      status: "success",
      message: "Template actualizada correctamente",
      template,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Error en el updateTemplate",
    });
  }
};

const deleteTemplate = async (req, res) => {
  try {
    const userId = req.user.id;
    const templateId = req.params.id;

    const templateDeleted = await Template.findOneAndDelete({
      userId: userId,
      _id: templateId,
    });
    if (!templateDeleted) {
      return res.status(404).send({
        status: "error",
        message: "Template no encontrada",
      });
    }

    return res.status(200).send({
      status: "success",
      message: "Template eleminada correctamente",
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error en el deleteTemplate",
    });
  }
};

module.exports = {
  createTemplate,
  getPublicTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
  getTemplates,
};
