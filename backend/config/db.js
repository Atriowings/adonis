const { Sequelize } = require('sequelize');

let sequelize;

const connectDB = async () => {
  try {
    sequelize = new Sequelize({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'adonis',
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      logging: false, // Set to console.log to see SQL queries
    });

    await sequelize.authenticate();
    console.log('PostgreSQL connected');

    // Store sequelize instance globally (needed for model initialization)
    global.sequelize = sequelize;

    // Initialize models (they will use global.sequelize)
    const getUser = require('../models/User');
    const getJob = require('../models/Job');
    const getSetting = require('../models/Setting');
    const getHiringRequest = require('../models/HiringRequest');
    const getAppliedJob = require('../models/AppliedJob');

    const User = getUser();
    const Job = getJob();
    const Setting = getSetting();
    const HiringRequest = getHiringRequest();
    const AppliedJob = getAppliedJob();

    // Define relationships
    Job.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

    // Check if tables exist before sync
    const tableNames = ['users', 'jobs', 'settings', 'hiring_requests', 'applied_jobs'];
    const existingTables = await sequelize.getQueryInterface().showAllTables();
    const ourExistingTables = existingTables.filter(table =>
      tableNames.includes(table.toLowerCase())
    );

    const tablesExist = ourExistingTables.length === tableNames.length;

    // Sync with alter: true to automatically migrate model changes
    // This will:
    // - Create tables if they don't exist
    // - Alter tables if model definitions have changed (add/remove columns, change types, etc.)
    // - Do nothing if tables exist and match models exactly
    if (tablesExist) {
      console.log('Checking for model changes and migrating if needed...');
    } else {
      console.log('Creating database tables...');
    }

    await sequelize.sync({ alter: true });

    if (tablesExist) {
      console.log('✓ Database connected: Schema is up to date');
    } else {
      console.log('✓ Database initialized: All tables created successfully');
    }

    return sequelize;
  } catch (err) {
    console.error('PostgreSQL connect error', err);
    process.exit(1);
  }
};

module.exports = connectDB;
module.exports.sequelize = sequelize;
