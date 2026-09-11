import express from 'express';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const API_PORT = Number(process.env.API_PORT || 4000);
const DIST_DIR = path.join(__dirname, 'dist');
const DB_DIR = path.join(__dirname, 'database');
const DB_PATH = path.join(DB_DIR, 'eduvia.db');

fs.mkdirSync(DB_DIR, { recursive: true });
const db = new DatabaseSync(DB_PATH);
db.exec(fs.readFileSync(path.join(DB_DIR, 'schema.sql'), 'utf8'));

app.use(express.json());

const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { salt, hash };
};

const verifyPassword = (password, hash, salt) => {
  const candidate = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(candidate, 'hex'), Buffer.from(hash, 'hex'));
};

const normaliseEmail = value => String(value || '').trim().toLowerCase();
const normalisePhone = value => String(value || '').replace(/\D/g, '').slice(-10);

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'Eduvia API', database: DB_PATH }));

app.post('/api/auth/register-or-login', (req, res) => {
  const name = String(req.body.name || '').trim();
  const email = normaliseEmail(req.body.email);
  const password = String(req.body.password || '');
  if (!name || !email || password.length < 6) return res.status(400).json({ message: 'Name, valid email and a 6+ character password are required.' });

  let user = db.prepare('SELECT * FROM students WHERE email = ?').get(email);
  if (!user) {
    const { salt, hash } = hashPassword(password);
    const result = db.prepare(`INSERT INTO students (name, email, password_hash, password_salt, login_method) VALUES (?, ?, ?, ?, 'email')`).run(name, email, hash, salt);
    user = db.prepare('SELECT id, name, email, phone, login_method, created_at FROM students WHERE id = ?').get(Number(result.lastInsertRowid));
    return res.status(201).json({ user });
  }

  if (!user.password_hash || !verifyPassword(password, user.password_hash, user.password_salt)) {
    return res.status(401).json({ message: 'Incorrect email or password.' });
  }
  db.prepare('UPDATE students SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(name || user.name, user.id);
  user = db.prepare('SELECT id, name, email, phone, login_method, created_at FROM students WHERE id = ?').get(user.id);
  res.json({ user });
});

app.post('/api/auth/otp/request', (req, res) => {
  const phone = normalisePhone(req.body.phone);
  if (phone.length !== 10) return res.status(400).json({ message: 'Enter a valid 10-digit Indian mobile number.' });
  const otp = String(crypto.randomInt(100000, 1000000));
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
  db.prepare(`INSERT INTO otp_codes (phone, otp, expires_at) VALUES (?, ?, ?)`).run(phone, otp, expiresAt);
  // Local development only: show the OTP in the API response. A real provider is added later.
  console.log(`[Eduvia local OTP] ${phone}: ${otp}`);
  res.json({ ok: true, demoOtp: otp, expiresInSeconds: 300 });
});

app.post('/api/auth/otp/verify', (req, res) => {
  const phone = normalisePhone(req.body.phone);
  const otp = String(req.body.otp || '').trim();
  const row = db.prepare(`SELECT * FROM otp_codes WHERE phone = ? AND otp = ? AND used = 0 ORDER BY id DESC LIMIT 1`).get(phone, otp);
  if (!row) return res.status(401).json({ message: 'Invalid or expired OTP.' });
  if (new Date(row.expires_at).getTime() < Date.now()) return res.status(401).json({ message: 'OTP has expired. Request a new one.' });

  db.prepare('UPDATE otp_codes SET used = 1 WHERE id = ?').run(row.id);
  let user = db.prepare('SELECT * FROM students WHERE phone = ?').get(phone);
  if (!user) {
    const result = db.prepare(`INSERT INTO students (phone, login_method, phone_verified) VALUES (?, 'otp', 1)`).run(phone);
    user = db.prepare('SELECT id, name, email, phone, login_method, phone_verified, created_at FROM students WHERE id = ?').get(Number(result.lastInsertRowid));
  } else {
    db.prepare(`UPDATE students SET phone_verified = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(user.id);
    user = db.prepare('SELECT id, name, email, phone, login_method, phone_verified, created_at FROM students WHERE id = ?').get(user.id);
  }
  res.json({ user });
});

app.get('/api/students/:id', (req, res) => {
  const student = db.prepare('SELECT id, name, email, phone, login_method, phone_verified, created_at FROM students WHERE id = ?').get(Number(req.params.id));
  if (!student) return res.status(404).json({ message: 'Student not found.' });
  res.json({ student });
});

// Serve the production React build from the same Express server.
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.use((_req, res) => res.sendFile(path.join(DIST_DIR, 'index.html')));
}

app.listen(API_PORT, () => {
  console.log(`Eduvia API running at http://localhost:${API_PORT}`);
  console.log(`SQLite database: ${DB_PATH}`);
  if (fs.existsSync(DIST_DIR)) console.log(`Production UI: http://localhost:${API_PORT}`);
});
