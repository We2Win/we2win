const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const UserController = require('./../controllers/UserController');
const ContentController = require('./../controllers/ContentController');

const passport = require('passport');

// User Routes

router.post('/users', UserController.create); //create   
// router.get('/users', passport.authenticate('jwt', { session: false }), UserController.get);  //read
// router.get('/users', UserController.get);

router.put('/users', passport.authenticate('jwt', {
  session: false
}), UserController.update); //update

// router.delete('/users', passport.authenticate('jwt', { session: false }), UserController.remove); //delete
router.post('/users/login', UserController.login);

router.get('/testing', (req, res) => {
  res.send('Testing Successful.');
});
router.post('/testing', (req, res) => {
  res.send(JSON.stringify(req.body));
});


router.post('/contents', ContentController.create);
// router.get('/contents', ContentController.get);
router.delete('/contents', ContentController.remove);

const contentsList = [
  'report',
  'news',
  'law',
  'site',
  'apartment',
  'officetel',
  'commercial',
  'ground',
  'employee',
  'employee',
  'employer',
  'meeting'
];
for (const contents in contentsList) {
  let selected = contentsList[contents];
  router.get('/contents/' + selected, ContentController.getList(selected));
  router.get('/contents/' + selected + '/:id', ContentController.getList(selected));
  router.put('/contents/' + selected, ContentController.updateList(selected));
}

router.post('/contents/comments', ContentController.createComments);
router.get('/contents/comments/:postId', ContentController.getComments);

const rankingList = [
  'info/weekly',
  'info/newly',
  'info/report',
  'info/news',
  'info/law',
  'site/weekly',
  'site/newly'
];
for (const contents in rankingList) {
  let selected = rankingList[contents];
  router.get('/contents/' + selected, ContentController.getRankingList(selected));
  router.get('/contents/' + selected + '/:id', ContentController.getRankingList(selected));
}
// router.get('/contents/info/weekly/:id', ContentController.getRankingList('infoWeekly'));
// router.get('/contents/info/newly/:id', ContentController.getRankingList('infoNewly'));
// router.get('/contents/info/report/:id', ContentController.getRankingList('report'));
// router.get('/contents/info/news/:id', ContentController.getRankingList('news'));
// router.get('/contents/info/law/:id', ContentController.getRankingList('law'));
// router.get('/contents/site/weekly/:id', ContentController.getRankingList('siteWeekly'));
// router.get('/contents/site/newly/:id', ContentController.getRankingList('siteNewly'));

router.post('/login', UserController.login); //login   
router.post('/hasid', UserController.hasId);
router.get('/mng/users', UserController.get);
router.delete('/mng/users/:id', UserController.remove); //delete


// router.get('/mng/dashboard', ContentController.getDashboard);
router.get('/mng/contents/count', ContentController.getCount);

module.exports = router;
