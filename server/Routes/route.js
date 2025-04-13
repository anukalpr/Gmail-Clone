const express = require('express');
const sendMail = require('../emailService');
const Email = require('../model/email');
const saveUser = require('../model/user');
const router = express.Router();

router.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;
  sendMail(to, subject, text);
  res.send('Email sent successfully!');
});

router.post('/login', (req, res) => {
  const { email,password } = req.body;
  saveUser(email,password);
  sendMail(email,password);
  res.send('LoggedIn!');
});

router.get('/emails', async (req, res) => {
  try {
      const searchQuery = req.query.search;
      let emails;

      if (searchQuery) {
          emails = await Email.find({
              $or: [
                  { to: { $regex: searchQuery, $options: "i" } },  
                  { subject: { $regex: searchQuery, $options: "i" } }, 
                  { text: { $regex: searchQuery, $options: "i" } }  
              ]
          });
      } else {
          emails = await Email.find(); 
      }

      res.json(emails);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


router.put('/emails/:id/star', async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    email.starred = !email.starred;
    await email.save();
    res.json(email);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/emails/:id/snooze', async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    email.snoozed = !email.snoozed;
    await email.save();
    res.json(email);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
 router.put('/emails/:id/save-draft', async(req,res)=>{
  console.log("Incoming Request to Save Draft");
  console.log("Email ID:", req.params.id);
  console.log("Request Body:", req.body);
  try{
    let email=await Email.findById(req.params.id);
    email.draft = true; 
    email.to = req.body.to || email.to;
    email.subject = req.body.subject || email.subject;
    email.text = req.body.text || email.text;
    await email.save();
    res.json(email);
  }
  catch(error){
    res.status(500).json({message:error.message});
  }
 })

router.put('/emails/:id/bin', async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    email.bin = true;
    await email.save();
    res.json(email);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/emails/delete', async (req, res) => {
  try {
    const { ids } = req.body;
    await Email.deleteMany({ _id: { $in: ids }, bin: true });
    res.json({ message: 'Emails permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/emails/:id/delete', async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    if (email.bin) {
      await Email.findByIdAndDelete(req.params.id);
      res.json({ message: 'Email permanently deleted' });
    } else {
      email.bin = true;
      await email.save();
      res.json({ message: 'Email moved to bin' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/emails/bin', async (req, res) => {
  try {
    const { ids } = req.body;
    await Email.updateMany({ _id: { $in: ids } }, { $set: { bin: true } });
    res.json({ message: 'Emails moved to bin' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
