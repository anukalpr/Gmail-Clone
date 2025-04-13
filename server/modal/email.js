const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  starred: {
    type: Boolean,
    default: false,
  },
  snoozed: {
    type: Boolean,
    default: false,
  },
  draft:{
    type: Boolean,
    default: false,
  },
  bin: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Email = mongoose.model('Email', EmailSchema);
module.exports = Email;
