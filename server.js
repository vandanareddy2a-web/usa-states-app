require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const db = new Database(path.join(__dirname, 'db', 'states.db'));
db.pragma('journal_mode = WAL');

app.locals.adminHash = bcrypt.hashSync(process.env.ADMIN_PASS || 'admin123', 10);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 4 }
}));

app.use((req, res, next) => {
  req.db = db;
  res.locals.isAdmin = !!(req.session && req.session.isAdmin);
  next();
});

const publicRoutes = require('./routes/public');
const adminRoutes = require('./routes/admin');

app.use('/', publicRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`USA States app running at http://localhost:${PORT}`);
});
