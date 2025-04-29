const Campaign = require("../models/Camplaign");

const createCampaign = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, subject, content, audienceId } = req.body;

    if (!title || !subject || !content || !audienceId) {
      return res.status(400).json({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }

    const campaign = new Campaign({
      userId,
      title,
      subject,
      content,
      audienceId,
      sent: false,
    });

    await campaign.save();
    return res.status(201).json({
      status: "success",
      message: "Campaña creada correctamente",
      campaign,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Error al crear la campaña",
    });
  }
};

const getCampaigns = async (req, res) => {
  try {
    const userId = req.user.id;
    const campaigns = await Campaign.find({ userId });
    return res.status(200).json({
      status: "success",
      message: "Campañas obtenidas correctamente",
      campaigns,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Error al obtener las campañas",
    });
  }
};

const getCampaignById = async (req, res) => {
  const { id } = req.params;
  try {
    const campaign = await Campaign.findOne({ _id: id, userId: req.user.id });
    if (!campaign) {
      return res.status(404).json({
        status: "error",
        message: "Campaña no encontrada",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Campaña obtenida correctamente",
      campaign,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Error al obtener la campaña",
    });
  }
};

const updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, subject, content, audienceId } = req.body;

    if (!title || !subject || !content || !audienceId) {
      return res.status(400).json({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }

    const campaign = await Campaign.findOneAndUpdate(
      { _id: id, userId: req.user.id, sent: false },
      { title, subject, content, audienceId },
      { new: true }
    );

    if (!campaign) {
      return res.status(404).json({
        status: "error",
        message: "Campaña no encontrada",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Campaña actualizada correctamente",
      campaign,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Error al actualizar la campaña",
    });
  }
};

const deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const campaign = await Campaign.findOneAndDelete({
      _id: id,
      userId: req.user.id,
      sent: false,
    });
    if (!campaign) {
      return res.status(404).json({
        status: "error",
        message: "Campaña no encontrada",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Campaña eleminada correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Error al eliminar la campaña",
    });
  }
};

module.exports = {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
};
