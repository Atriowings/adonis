require('dotenv').config();
const connectDB = require('./config/db');
const getUser = require('./models/User');
const bcrypt = require('bcryptjs');

const run = async () => {
  await connectDB();
  const User = getUser();
  const email = process.env.ADMIN_EMAIL;
  const pwd = process.env.ADMIN_PASSWORD || 'admin123';

  let user = await User.findOne({ where: { email } });
  if (user) {
    console.log('Admin already exists');
    process.exit(0);
  }

  const hashed = await bcrypt.hash(pwd, 10);
  user = await User.create({ email, password: hashed, role: 'admin' });
  console.log('Admin created:', email);
  process.exit(0);
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
