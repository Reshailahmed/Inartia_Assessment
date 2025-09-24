const Template = require("../models/Template");


exports.createTemplate = async (req, res) => {
  try {
    console.log("Incoming body:", req.body); 
    const { title, department, status, date } = req.body;

    const template = await Template.create({ title, department, status, date });
    res.status(201).json(template);
  } catch (error) {
    console.error("Error creating template:", error); 
    res.status(500).json({ error: error.message });
  }
};


exports.getTemplate = async(req, res) => {
    try {
        const templates = await Template.findAll();
        res.json(templates);
    } catch (error) {
        res.status(500).json({error: error.message})
    };
}

exports.getTemplateById = async(res, req) => {

    try {

        const template = await Template.findByPk(req.params.body);
        if(!template)return res.status(404).json({message: "Template not found"});
        res.json(template);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateTemplate = async (req, res) => {
  try {
    const [updated] = await Template.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedTemplate = await Template.findByPk(req.params.id);
      return res.json(updatedTemplate);
    }
    res.status(404).json({ message: "Template not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteTemplate = async (req, res) => {
  try {
    const deleted = await Template.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Template not found" });
    res.json({ message: "Template deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};