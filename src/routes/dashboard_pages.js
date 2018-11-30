const router = require('express').Router();

const { Page } = require('../models');

// PAGE GET ALL
router.get('/', async (req, res) => {
  const pages = await Page.find().sort({sorting: 1});
  res.render('dashboard/pages/list', {pages});
});

router.post('/reorder-pages', async (req, res) => {
  const ids = req.body['id[]'];
  let count = 0;
  for(let i = 0;i < ids.length; i++){
    const id = ids[i];
    count++;
    const page = await Page.findById(id);
    page.sorting = count;
    await page.save();
  }
  res.json('reordered');
});

// PAGE ADD
router.get('/add', (req, res) => {
  res.render('dashboard/pages/add');
});

router.post('/add', async (req, res) => {
  req.checkBody('title', 'title must have a value.').notEmpty();
  req.checkBody('content', 'content must have a value.').notEmpty();

  let { title, content } = req.body;
  let url = req.body.url.replace(/\s+/g, '-').toLowerCase();
  if(url == "") url = title.replace(/\s+/g, '-').toLowerCase();

  const errors = req.validationErrors();
  if(errors) {
    console.log(errors);
    res.render('dashboard/pages/add', {
      errors,
      title,
      url,
      content
    });
  } else {
    const page = await Page.findOne({url: url});
    if (page) {
      req.flash('danger', 'Page URL exists, choose another.');
      res.render('dashboard/pages/add', {
        title,
        url,
        content
      });
    } else {
      const newPage = new Page({title, url, content});
      await newPage.save(); 
      req.flash('success', 'Page Added Successfully');
      res.redirect('/dashboard/pages');
    }
  }
});

// EDIT PAGE
router.get('/edit/:url', async (req, res) => {
  const page = await Page.findOne({url: req.params.url});
  res.render('dashboard/pages/edit', page);
});

router.post('/edit/:id', async (req, res) => {

  req.checkBody('title', 'title must have a value.').notEmpty();
  req.checkBody('content', 'content must have a value.').notEmpty();

  let { title, content } = req.body;
  let url = req.body.url.replace(/\s+/g, '-').toLowerCase();
  if(url == "") url = title.replace(/\s+/g, '-').toLowerCase();

  const {id} = req.params;

  const errors = req.validationErrors();
  if(errors) {
    console.log(errors);
    res.render('dashboard/pages/edit', {
      errors,
      title,
      url,
      content,
      id
    });
  } else {
    await Page.findByIdAndUpdate(id, {title, url, content});
    req.flash('success', 'Page Updated');
    res.redirect('/dashboard/pages/edit/' + url);
  }
});

router.get('/delete/:id', async (req, res) => {
  await Page.findByIdAndRemove(req.params.id);
  req.flash('success', 'Page Deleted');
  res.redirect('/dashboard/pages/');
});

module.exports = router;
