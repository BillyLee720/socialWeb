const mongoose = require('mongoose');

const PlatformSchema = mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  google: {
    type: String,
  },
  facebook: {
    type: String,
  },
  github: {
    type: String,
  },
  twitter: {
    type: String,
  },
});

const Platform = mongoose.model('Platform', PlatformSchema);

module.exports = Platform;
