import Setting from "../models/Setting.js";

// =======================
// GET SETTINGS
// =======================

export const getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create({});
    }

    res.json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to load settings",
    });
  }
};

// =======================
// UPDATE SETTINGS
// =======================

export const updateSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = new Setting({});
    }

    settings.websiteName =
      req.body.websiteName ?? settings.websiteName;

    settings.heroTitle =
      req.body.heroTitle ?? settings.heroTitle;

    settings.heroSubtitle =
      req.body.heroSubtitle ?? settings.heroSubtitle;

    settings.contact =
      req.body.contact ?? settings.contact;

    settings.email =
      req.body.email ?? settings.email;

    settings.upiId =
      req.body.upiId ?? settings.upiId;

    settings.upiName =
      req.body.upiName ?? settings.upiName;

    settings.qrCode =
      req.body.qrCode ?? settings.qrCode;

    await settings.save();

    res.json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to save settings",
    });
  }
};