const express = require('express');
const router = express.Router();
const { cloudinary } = require('../utils/cloudinary');

router.get('/images', async (req, res) => {
  const { resources } = await cloudinary.search
    .expression('folder:dev_setups')
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});


router.get('/images/:imgId', async (req, res) => {
  const imgId = req.params.imgId;
  const { resources } = await cloudinary.search
    .expression(`folder:dev_setups AND public_id:dev_setups/${imgId}`)
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);

});


router.post('/', async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'dev_setups',
    });
    console.log(uploadResponse);
    res.json(uploadResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: 'Something went wrong!' });
  }
});

module.exports = router;