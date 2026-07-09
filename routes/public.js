const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const states = req.db.prepare('SELECT * FROM states ORDER BY name').all();
  const parsed = states.map(s => ({
    ...s,
    cities: JSON.parse(s.cities),
    universities: JSON.parse(s.universities),
    schools: JSON.parse(s.schools),
    neighborhoods: JSON.parse(s.neighborhoods),
    borders: JSON.parse(s.borders),
    attractions: JSON.parse(s.attractions),
    senators: JSON.parse(s.senators),
    popFormatted: s.population.toLocaleString('en-US'),
    areaFormatted: s.area_sq_mi ? s.area_sq_mi.toLocaleString('en-US') : null
  }));
  const totalPop = states.reduce((sum, s) => sum + s.population, 0);
  res.render('index', { states: parsed, totalPop });
});

router.get('/capitals-quiz', (req, res) => {
  res.render('capitals-quiz');
});

module.exports = router;
