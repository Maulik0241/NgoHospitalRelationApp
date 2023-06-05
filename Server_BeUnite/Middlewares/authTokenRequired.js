const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const NgoData = mongoose.model('NgoData');
const HospitalData = mongoose.model('HospitalData');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // authorization === 'Bearer {token}'

  if (!authorization) {
    return res.status(401).json({ error: 'You must be logged in.' });
  }

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).json({ error: 'You must be logged in.' });
    }

    const { _id } = payload;
    const ngoData = await NgoData.findById(_id);
    const hospitalData = await HospitalData.findById(_id);

    req.user = ngoData || hospitalData;
    next();
  });
};
