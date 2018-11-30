const router = require('express').Router();

const { Category } = require('../models');

router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.render('dashboard/categories/list', {categories});
});

router.get('/add', async (req, res) => {
  res.render('dashboard/categories/add');
});

router.post('/add', async (req, res) => {
  req.checkBody('title', 'Title must have a value').notEmpty();
  const { title } = req.body;
  let url = title.replace(/\s+/g, '-').toLowerCase();

  const errors = req.validationErrors();
  if(errors) {
    res.render('dashboard/categories/add', {
      title,
      errors
    });
  } else {
    const category = await Category.findOne({url: url});
    if (category) {
      req.flash('danger', 'Category title exists, choose another.');
      res.render('dashboard/categories/add', {title});
    } else {
      const newCategory = new Category({title, url});
      await newCategory.save();
      req.flash('success', 'Category Added');
      res.redirect('/dashboard/categories');
    }
  }
});

// EDIT CATEGORY 
router.get('/edit/:id', async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.render('dashboard/categories/edit', category);
});

router.post('/edit/:id', async (req, res) => {
  req.checkBody('title', 'Title must have a value').notEmpty();
  const { title } = req.body;
  let url = title.replace(/\s+/g, '-').toLowerCase();
  const { id } = req.params;

  const errors = req.validationErrors();
  if(errors) {
    res.render('dashboard/categories/edit', {
      title,
      errors,
      _id: id
    });
  } else {
    const category = await Category.findOne({url: url, _id: {$ne: id}});
    if (category) {
      req.flash('danger', 'Category already exists.');
      res.render('dashboard/categories/edit', {title});
    } else {
      await Category.findByIdAndUpdate(id, {title, url});
      req.flash('success', 'Category Updated');
      res.redirect('/dashboard/categories');
    }

  }
});


module.exports = router;
