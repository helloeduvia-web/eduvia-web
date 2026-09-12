PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  phone TEXT UNIQUE,
  password_hash TEXT,
  password_salt TEXT,
  login_method TEXT NOT NULL DEFAULT 'email',
  phone_verified INTEGER NOT NULL DEFAULT 0,
  education_level TEXT,
  course_specialisation TEXT,
  percentage_cgpa TEXT,
  desired_study_level TEXT,
  preferred_country TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS otp_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT NOT NULL,
  otp TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  used INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS assessments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER,
  status TEXT NOT NULL DEFAULT 'started',
  readiness_score INTEGER,
  intent_score INTEGER,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS assessment_answers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  assessment_id INTEGER NOT NULL,
  question_key TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(assessment_id) REFERENCES assessments(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  amount INTEGER NOT NULL DEFAULT 9900,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'created',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS countries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  positioning TEXT
);
CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS universities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  study_area TEXT,
  tuition_note TEXT
);
CREATE TABLE IF NOT EXISTS recommendations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  country TEXT NOT NULL,
  course TEXT,
  score INTEGER,
  reason TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS shortlists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  university_id INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, university_id),
  FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY(university_id) REFERENCES universities(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  university_id INTEGER,
  status TEXT NOT NULL DEFAULT 'exploring',
  intake TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY(university_id) REFERENCES universities(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS counsellor_connections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  partner_name TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE
);
INSERT OR IGNORE INTO countries (name, positioning) VALUES
('UK','2 yr stay-back'),('USA','Top-ranked'),('Canada','Pathway options'),('Australia','Feb / Jul intakes'),
('Germany','Low tuition'),('Ireland','Tech growth'),('New Zealand','Post-study route'),('France','Rich culture'),('Netherlands','English-taught');
INSERT OR IGNORE INTO courses (name) VALUES ('Computer Science'),('Business & Management'),('Engineering'),('Data / AI');

CREATE TABLE IF NOT EXISTS intakes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  country_id INTEGER,
  intake_name TEXT NOT NULL,
  intake_month TEXT NOT NULL,
  intake_year INTEGER NOT NULL,
  intake_type TEXT NOT NULL DEFAULT 'Secondary',
  application_status TEXT NOT NULL DEFAULT 'planning',
  typical_application_start TEXT,
  typical_deadline TEXT,
  notes TEXT,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(country_id, intake_name, intake_year),
  FOREIGN KEY(country_id) REFERENCES countries(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS intake_programs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  intake_id INTEGER NOT NULL,
  university_id INTEGER,
  course_id INTEGER,
  eligibility_note TEXT,
  tuition_note TEXT,
  scholarship_note TEXT,
  application_fee_note TEXT,
  visa_note TEXT,
  FOREIGN KEY(intake_id) REFERENCES intakes(id) ON DELETE CASCADE,
  FOREIGN KEY(university_id) REFERENCES universities(id) ON DELETE SET NULL,
  FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_intakes_country_year ON intakes(country_id, intake_year);
CREATE INDEX IF NOT EXISTS idx_intakes_month ON intakes(intake_month);

INSERT OR IGNORE INTO countries (name, positioning) VALUES
('USA','Country-wise intake planning'),
('Canada','Country-wise intake planning'),
('UK','Country-wise intake planning'),
('Australia','Country-wise intake planning'),
('Germany','Country-wise intake planning'),
('Ireland','Country-wise intake planning'),
('New Zealand','Country-wise intake planning'),
('France','Country-wise intake planning'),
('Netherlands','Country-wise intake planning'),
('Italy','Country-wise intake planning'),
('Sweden','Country-wise intake planning'),
('Finland','Country-wise intake planning'),
('Denmark','Country-wise intake planning'),
('Norway','Country-wise intake planning'),
('Switzerland','Country-wise intake planning'),
('Austria','Country-wise intake planning'),
('Poland','Country-wise intake planning'),
('Czech Republic','Country-wise intake planning'),
('Hungary','Country-wise intake planning'),
('Portugal','Country-wise intake planning'),
('Spain','Country-wise intake planning'),
('Japan','Country-wise intake planning'),
('South Korea','Country-wise intake planning'),
('Singapore','Country-wise intake planning'),
('Malaysia','Country-wise intake planning'),
('UAE','Country-wise intake planning');

INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Fall','Aug',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='USA';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Jan',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='USA';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Fall','Sep',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Canada';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Winter','Jan',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Canada';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Summer','May',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Canada';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Sep',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='UK';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Winter','Jan',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='UK';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','May',2026,'Limited','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='UK';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Semester 1','Feb',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Australia';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Semester 2','Jul',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Australia';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Summer','Nov',2026,'Limited','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Australia';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Winter','Oct',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Germany';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Summer','Apr',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Germany';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Sep',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Ireland';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Jan',2026,'Limited','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Ireland';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Semester 1','Feb',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='New Zealand';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Semester 2','Jul',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='New Zealand';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Sep',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='France';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Jan',2026,'Limited','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='France';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'September','Sep',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Netherlands';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'February','Feb',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Netherlands';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Sep',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Italy';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Feb',2026,'Limited','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Italy';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Aug',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Sweden';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Jan',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Sweden';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Aug',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Finland';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Jan',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Finland';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Sep',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Denmark';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Feb',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Denmark';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Aug',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Norway';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Jan',2026,'Limited','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Norway';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Sep',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Switzerland';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Feb',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Switzerland';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Winter','Oct',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Austria';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Summer','Mar',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Austria';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Winter','Oct',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Poland';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Summer','Feb',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Poland';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Sep',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Czech Republic';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Feb',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Czech Republic';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Sep',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Hungary';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Feb',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Hungary';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Sep',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Portugal';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Feb',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Portugal';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Sep',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Spain';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Feb',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Spain';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Apr',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Japan';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Oct',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Japan';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Mar',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='South Korea';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Fall','Sep',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='South Korea';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'August','Aug',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Singapore';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'January','Jan',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Singapore';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'September','Sep',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Malaysia';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'September','Sep',2026,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='UAE';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'January','Jan',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='UAE';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'May','May',2026,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='UAE';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Fall','Aug',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='USA';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Jan',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='USA';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Fall','Sep',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Canada';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Winter','Jan',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Canada';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Summer','May',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Canada';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Sep',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='UK';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Winter','Jan',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='UK';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','May',2027,'Limited','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='UK';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Semester 1','Feb',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Australia';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Semester 2','Jul',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Australia';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Summer','Nov',2027,'Limited','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Australia';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Winter','Oct',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Germany';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Summer','Apr',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Germany';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Sep',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Ireland';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Jan',2027,'Limited','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Ireland';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Semester 1','Feb',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='New Zealand';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Semester 2','Jul',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='New Zealand';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Sep',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='France';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Jan',2027,'Limited','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='France';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'September','Sep',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Netherlands';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'February','Feb',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Netherlands';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Sep',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Italy';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Feb',2027,'Limited','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Italy';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Aug',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Sweden';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Jan',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Sweden';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Aug',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Finland';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Jan',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Finland';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Sep',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Denmark';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Feb',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Denmark';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Aug',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Norway';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Jan',2027,'Limited','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Norway';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Sep',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Switzerland';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Feb',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Switzerland';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Winter','Oct',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Austria';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Summer','Mar',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Austria';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Winter','Oct',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Poland';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Summer','Feb',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Poland';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Sep',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Czech Republic';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Feb',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Czech Republic';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Sep',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Hungary';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Feb',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Hungary';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Sep',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Portugal';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Feb',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Portugal';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Sep',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Spain';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Feb',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Spain';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Apr',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Japan';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Autumn','Oct',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Japan';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Spring','Mar',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='South Korea';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'Fall','Sep',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='South Korea';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'August','Aug',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Singapore';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'January','Jan',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Singapore';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'September','Sep',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='Malaysia';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'September','Sep',2027,'Main','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='UAE';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'January','Jan',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='UAE';
INSERT OR IGNORE INTO intakes (country_id,intake_name,intake_month,intake_year,intake_type,application_status,notes)
SELECT id,'May','May',2027,'Secondary','planning','Typical intake timing; verify exact university and program deadlines before applying.'
FROM countries WHERE name='UAE';
