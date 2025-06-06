const mongoose = require("mongoose");
const Audience = require("../models/Audience");

const createAudience = async (req, res) => {
  try {
    const  userId  = req.user.id;
    const { name, contacts } = req.body;

    if (!name) {
      return res.status(400).json({
        status: "error",
        message: "Falta enviar el nombre",
      });
    }
    const audience = new Audience({
      userId: new mongoose.Types.ObjectId(userId),
      name,
      contacts: contacts || [],
    });
    console.log("audience")
    console.log(audience);
    console.log("Req body")
    console.log(req.body);
    await audience.save();

    return res.status(201).send({
      status: "success",
      message: "Audiencia creada",
      audience,
      audienceId: audience._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "Error el createAudience",
    });
  }
};

const getAudience = async (req, res) => {
  try {
    const  userId  = req.user.id;
    const audiences = await Audience.find({ userId: req.user.id}).populate('contacts');
    if (!audiences) {
      return res.status(404).send({
        status: "error",
        message: "No se han entrando audiencias para este usuario",
      });
    }

    return res.status(200).send({
      status: "success",
      audiences,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Error en getAudience",
    });
  }
};

const getAudienceById = async (req, res) => {
  try {
    const { id } = req.params;
    const audience = await Audience.findById(id);
    if (!audience) {
      return res.status(404).send({
        status: "error",
        message: "No se ha encontrado la audiencia",
      });
    }

    return res.status(200).send({
      status: "success",
      audience,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Error en el getAudienceById",
    });
  }
};


const deleteAudience = async (req, res) => {
  try{
    const { id } = req.params;
    const audience = await Audience.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!audience) {
      return res.status(404).send({
        status: "error",
        message: "No se ha encontrado la audiencia",
      })
    }

    
    return res.status(200).send({
      status: "success",
      message: "Audiencia eliminada",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "error",
      message: "Error en el deleteAudience",    })
  }
}



module.exports = {
  createAudience,
  getAudience,
  getAudienceById,
  deleteAudience,
};
