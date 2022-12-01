const Skill = require("../models/skillSchema");

// GET SKILL
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();

    res.status(200).json({ success: true, skills });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// CREATE SKILL (ADMIN)
exports.newSkill = async (req, res) => {
  try {
    const { name, percent } = req.body;

    const newSkill = await Skill.create({
      name,
      percent,
    });
    res.status(201).json({ success: true, newSkill });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE SKILL (ADMIN)
exports.updateSkill = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, updatedSkill });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// delete SKILL --Admin
exports.deleteSkill = async (req, res) => {
  try {
    let skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        message: "reason not found",
      });
    }

    await skill.remove();
    res
      .status(200)
      .json({ success: true, message: "Skill delete successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// GET SKILL DETAILS
exports.getSkillDetail = async (req, res) => {
  try {
    const skillDetail = await Skill.findById(req.params.id);

    res.status(200).json({
      success: true,
      skillDetail,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
