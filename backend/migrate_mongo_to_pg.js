require('dotenv').config();
const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');
const connectDB = require('./config/db');
const getUser = require('./models/User');
const getJob = require('./models/Job');
const getAppliedJob = require('./models/AppliedJob');
const getHiringRequest = require('./models/HiringRequest');
const getSetting = require('./models/Setting');

// MongoDB Schemas (for reading data)
const userSchema = new mongoose.Schema({}, { strict: false, collection: 'users' });
const jobSchema = new mongoose.Schema({}, { strict: false, collection: 'jobs' });
const appliedJobSchema = new mongoose.Schema({}, { strict: false, collection: 'appliedjobs' });
const hiringRequestSchema = new mongoose.Schema({}, { strict: false, collection: 'hiringrequests' });
const settingSchema = new mongoose.Schema({}, { strict: false, collection: 'settings' });

const UserMongo = mongoose.model('User', userSchema);
const JobMongo = mongoose.model('Job', jobSchema);
const AppliedJobMongo = mongoose.model('AppliedJob', appliedJobSchema);
const HiringRequestMongo = mongoose.model('HiringRequest', hiringRequestSchema);
const SettingMongo = mongoose.model('Setting', settingSchema);

// ID mapping to preserve relationships
const userIdMap = new Map(); // MongoDB _id -> PostgreSQL id
const jobIdMap = new Map(); // MongoDB _id -> PostgreSQL id

const migrate = async () => {
    let mongoConnection = null;

    try {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('  MongoDB to PostgreSQL Migration Script');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        // Connect to MongoDB
        console.log('📡 Connecting to MongoDB...');
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('MONGODB_URI not found in .env file');
        }

        mongoConnection = await mongoose.connect(mongoUri);
        console.log('✅ MongoDB connected\n');

        // Connect to PostgreSQL
        console.log('📡 Connecting to PostgreSQL...');
        await connectDB();
        console.log('✅ PostgreSQL connected\n');

        // Initialize Sequelize models
        const User = getUser();
        const Job = getJob();
        const AppliedJob = getAppliedJob();
        const HiringRequest = getHiringRequest();
        const Setting = getSetting();

        // ──────────────────────────────────────────────────
        // 1. MIGRATE USERS
        // ──────────────────────────────────────────────────
        console.log('📦 Migrating Users...');
        const mongoUsers = await UserMongo.find({}).lean();
        console.log(`   Found ${mongoUsers.length} users in MongoDB`);

        let userCount = 0;
        for (const mongoUser of mongoUsers) {
            try {
                // Check if user already exists by email
                const existingUser = await User.findOne({ where: { email: mongoUser.email } });

                if (existingUser) {
                    userIdMap.set(mongoUser._id.toString(), existingUser.id);
                    console.log(`   ⚠️  User ${mongoUser.email} already exists, skipping...`);
                    continue;
                }

                const pgUser = await User.create({
                    email: mongoUser.email,
                    password: mongoUser.password,
                    role: mongoUser.role || 'admin',
                    createdAt: mongoUser.createdAt || new Date(),
                    updatedAt: mongoUser.updatedAt || new Date()
                });

                userIdMap.set(mongoUser._id.toString(), pgUser.id);
                userCount++;
            } catch (err) {
                console.error(`   ❌ Error migrating user ${mongoUser.email}:`, err.message);
            }
        }
        console.log(`   ✅ Migrated ${userCount} users\n`);

        // ──────────────────────────────────────────────────
        // 2. MIGRATE JOBS
        // ──────────────────────────────────────────────────
        console.log('📦 Migrating Jobs...');
        const mongoJobs = await JobMongo.find({}).lean();
        console.log(`   Found ${mongoJobs.length} jobs in MongoDB`);

        let jobCount = 0;
        for (const mongoJob of mongoJobs) {
            try {
                // Map createdBy ObjectId to PostgreSQL user id
                let createdBy = null;
                if (mongoJob.createdBy) {
                    createdBy = userIdMap.get(mongoJob.createdBy.toString());
                    if (!createdBy) {
                        console.log(`   ⚠️  Job "${mongoJob.title}" has invalid createdBy reference, skipping...`);
                        continue;
                    }
                } else {
                    // If no createdBy, use first user or skip
                    const firstUser = await User.findOne();
                    if (firstUser) {
                        createdBy = firstUser.id;
                    } else {
                        console.log(`   ⚠️  No users found, skipping job "${mongoJob.title}"`);
                        continue;
                    }
                }

                const pgJob = await Job.create({
                    title: mongoJob.title || mongoJob.designation || 'Untitled Job',
                    applyLink: mongoJob.applyLink || mongoJob.applylink || '',
                    createdBy: createdBy,
                    createdAt: mongoJob.createdAt || new Date(),
                    updatedAt: mongoJob.updatedAt || new Date()
                });

                if (mongoJob._id) {
                    jobIdMap.set(mongoJob._id.toString(), pgJob.id);
                }
                jobCount++;
            } catch (err) {
                console.error(`   ❌ Error migrating job "${mongoJob.title}":`, err.message);
            }
        }
        console.log(`   ✅ Migrated ${jobCount} jobs\n`);

        // ──────────────────────────────────────────────────
        // 3. MIGRATE APPLIED JOBS
        // ──────────────────────────────────────────────────
        console.log('📦 Migrating Applied Jobs...');
        const mongoAppliedJobs = await AppliedJobMongo.find({}).lean();
        console.log(`   Found ${mongoAppliedJobs.length} applied jobs in MongoDB`);

        let appliedJobCount = 0;
        for (const mongoApplied of mongoAppliedJobs) {
            try {
                await AppliedJob.create({
                    name: mongoApplied.name || '',
                    email: mongoApplied.email || '',
                    mobile: mongoApplied.mobile || mongoApplied.phone || '',
                    message: mongoApplied.message || mongoApplied.description || '',
                    createdAt: mongoApplied.createdAt || new Date(),
                    updatedAt: mongoApplied.updatedAt || new Date()
                });
                appliedJobCount++;
            } catch (err) {
                console.error(`   ❌ Error migrating applied job:`, err.message);
            }
        }
        console.log(`   ✅ Migrated ${appliedJobCount} applied jobs\n`);

        // ──────────────────────────────────────────────────
        // 4. MIGRATE HIRING REQUESTS
        // ──────────────────────────────────────────────────
        console.log('📦 Migrating Hiring Requests...');
        const mongoHiringRequests = await HiringRequestMongo.find({}).lean();
        console.log(`   Found ${mongoHiringRequests.length} hiring requests in MongoDB`);

        let hiringRequestCount = 0;
        for (const mongoHiring of mongoHiringRequests) {
            try {
                await HiringRequest.create({
                    companyName: mongoHiring.companyName || mongoHiring.company || '',
                    name: mongoHiring.name || '',
                    mobile: mongoHiring.mobile || mongoHiring.phone || '',
                    designation: mongoHiring.designation || '',
                    email: mongoHiring.email || '',
                    createdAt: mongoHiring.createdAt || new Date(),
                    updatedAt: mongoHiring.updatedAt || new Date()
                });
                hiringRequestCount++;
            } catch (err) {
                console.error(`   ❌ Error migrating hiring request:`, err.message);
            }
        }
        console.log(`   ✅ Migrated ${hiringRequestCount} hiring requests\n`);

        // ──────────────────────────────────────────────────
        // 5. MIGRATE SETTINGS
        // ──────────────────────────────────────────────────
        console.log('📦 Migrating Settings...');
        const mongoSettings = await SettingMongo.find({}).lean();
        console.log(`   Found ${mongoSettings.length} settings in MongoDB`);

        let settingCount = 0;
        for (const mongoSetting of mongoSettings) {
            try {
                // Check if setting already exists
                const existing = await Setting.findOne({ where: { key: mongoSetting.key } });
                if (existing) {
                    console.log(`   ⚠️  Setting "${mongoSetting.key}" already exists, skipping...`);
                    continue;
                }

                // Handle value - could be string or object
                let value = mongoSetting.value;
                if (typeof value === 'object') {
                    value = JSON.stringify(value);
                }

                await Setting.create({
                    key: mongoSetting.key,
                    value: value || ''
                });
                settingCount++;
            } catch (err) {
                console.error(`   ❌ Error migrating setting "${mongoSetting.key}":`, err.message);
            }
        }
        console.log(`   ✅ Migrated ${settingCount} settings\n`);

        // ──────────────────────────────────────────────────
        // SUMMARY
        // ──────────────────────────────────────────────────
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('  Migration Summary');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`  Users:           ${userCount}`);
        console.log(`  Jobs:            ${jobCount}`);
        console.log(`  Applied Jobs:    ${appliedJobCount}`);
        console.log(`  Hiring Requests: ${hiringRequestCount}`);
        console.log(`  Settings:        ${settingCount}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\n✅ Migration completed successfully!\n');

    } catch (err) {
        console.error('\n❌ Migration failed:');
        console.error(err.message);
        console.error(err.stack);
        process.exit(1);
    } finally {
        // Close connections
        if (mongoConnection) {
            await mongoose.connection.close();
            console.log('📡 MongoDB connection closed');
        }
        if (global.sequelize) {
            await global.sequelize.close();
            console.log('📡 PostgreSQL connection closed');
        }
        process.exit(0);
    }
};

// Run migration
migrate();

