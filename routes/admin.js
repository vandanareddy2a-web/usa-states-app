const express = require('express');
const bcrypt = require('bcryptjs');
const { requireAdmin } = require('../middleware/auth');
const router = express.Router();

router.get('/login', (req, res) => {
  if (req.session && req.session.isAdmin) return res.redirect('/admin');
  res.render('login', { error: null });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USER &&
    bcrypt.compareSync(password, req.app.locals.adminHash)
  ) {
    req.session.isAdmin = true;
    return res.redirect('/admin');
  }
  res.render('login', { error: 'Invalid username or password.' });
});

router.post('/logout', requireAdmin, (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

router.get('/', requireAdmin, (req, res) => {
  const states = req.db.prepare('SELECT * FROM states ORDER BY name').all();
  const parsed = states.map(s => ({
    ...s,
    popFormatted: s.population.toLocaleString('en-US')
  }));
  const totalPop = states.reduce((sum, s) => sum + s.population, 0);
  res.render('admin/dashboard', { states: parsed, totalPop });
});

router.get('/states/:abbr/edit', requireAdmin, (req, res) => {
  const state = req.db.prepare('SELECT * FROM states WHERE abbr = ?').get(req.params.abbr.toUpperCase());
  if (!state) return res.status(404).send('State not found');
  state.cities = JSON.parse(state.cities);
  state.universities = JSON.parse(state.universities);
  state.schools = JSON.parse(state.schools);
  state.neighborhoods = JSON.parse(state.neighborhoods);
  state.borders = JSON.parse(state.borders);
  state.attractions = JSON.parse(state.attractions);
  state.senators = JSON.parse(state.senators);
  res.render('admin/edit', { state, success: null });
});

router.post('/states/:abbr', requireAdmin, (req, res) => {
  const abbr = req.params.abbr.toUpperCase();
  const { capital, population, cities, universities, schools, neighborhoods, attractions, borderNorth, borderSouth, borderEast, borderWest, flagUrl, governor, senators, capitalMayor } = req.body;

  const citiesArr = cities.split('\n').map(s => s.trim()).filter(Boolean);
  const unisArr = universities.split('\n').map(s => s.trim()).filter(Boolean);
  const schoolsArr = schools.split('\n').map(s => s.trim()).filter(Boolean);
  const neighArr = neighborhoods.split('\n').map(s => s.trim()).filter(Boolean);
  const attractionsArr = attractions.split('\n').map(s => s.trim()).filter(Boolean);
  const senatorsArr = senators.split('\n').map(s => s.trim()).filter(Boolean);
  const bordersObj = { north: borderNorth.trim(), south: borderSouth.trim(), east: borderEast.trim(), west: borderWest.trim() };

  req.db.prepare(`
    UPDATE states SET capital = ?, population = ?, cities = ?, universities = ?, schools = ?, neighborhoods = ?, borders = ?, attractions = ?, flag_url = ?, governor = ?, senators = ?, capital_mayor = ?, updated_at = CURRENT_TIMESTAMP
    WHERE abbr = ?
  `).run(capital, parseInt(population, 10), JSON.stringify(citiesArr), JSON.stringify(unisArr), JSON.stringify(schoolsArr), JSON.stringify(neighArr), JSON.stringify(bordersObj), JSON.stringify(attractionsArr), flagUrl.trim(), governor.trim(), JSON.stringify(senatorsArr), capitalMayor.trim(), abbr);

  const state = req.db.prepare('SELECT * FROM states WHERE abbr = ?').get(abbr);
  state.cities = JSON.parse(state.cities);
  state.universities = JSON.parse(state.universities);
  state.schools = JSON.parse(state.schools);
  state.neighborhoods = JSON.parse(state.neighborhoods);
  state.borders = JSON.parse(state.borders);
  state.attractions = JSON.parse(state.attractions);
  state.senators = JSON.parse(state.senators);
  res.render('admin/edit', { state, success: 'State updated successfully.' });
});

module.exports = router;
