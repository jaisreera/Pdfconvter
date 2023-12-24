const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
const uploadController = require("../controllers/uploadController")
const passport = require('passport');
const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: 'public/images/uploaded',
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   });
  
//   const upload = multer({ storage: storage });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/',controller.renderSignIn);
router.get('/sign-up',controller.renderSignUp);
router.post('/create',controller.create);
router.post('/create-session',passport.authenticate('local',{failureRedirect: '/'}),controller.createSession);
router.get('/home',controller.renderHome);
router.get('/destroy-session',controller.destroySession);
router.get('/reset_password',controller.renderResetPassword);
router.post('/update-password',passport.authenticate('local',{failureRedirect:'back'}),controller.updatePassword);
router.post('/upload', upload.single('image'), uploadController.uploadImage);

module.exports = router;