const Faq = require("../models/faqSchema");

// GET FAQ
exports.getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find();

    res.status(200).json({ success: true, faqs });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// CREATE FAQ (ADMIN)
exports.newFaq = async (req, res) => {
  try {
    const { title, message } = req.body;

    const newFaq = await Faq.create({
      title,
      message,
    });
    res.status(201).json({ success: true, newFaq });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE FAQ (ADMIN)
exports.updateFaq = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFaq = await Faq.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, updatedFaq });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// delete FAQ (ADMIN)
exports.deleteFaq = async (req, res) => {
  try {
    let faq = await Faq.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({
        message: "reason not found",
      });
    }

    await faq.remove();
    res.status(200).json({ success: true, message: "Faq delete successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// GET FAQ DETAILS
exports.getFaqDetail = async (req, res) => {
  try {
    const faqDetail = await Faq.findById(req.params.id);

    res.status(200).json({
      success: true,
      faqDetail,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
