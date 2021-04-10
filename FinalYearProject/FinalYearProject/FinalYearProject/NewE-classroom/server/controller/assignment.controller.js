
const Profile = require('../models/assignment.model');

exports.getProfiles = async (req, res) => {
  const profiles = await Profile.find();
  res.status(200).json({ profiles });
};

exports.postProfile = async (req, res) => {
  const {sem} = req.body;
  const {subject} = req.body;
  const { name } = req.body;
  const imagePath = 'http://localhost:3000/assignment/' + req.file.filename; // Note: set path dynamically
  const profile = new Profile({
    sem,
    subject,
    name,
    imagePath,
  });
  const createdProfile = await profile.save();
  res.status(201).json({
    profile: {
      ...createdProfile._doc,
    },
  });
};