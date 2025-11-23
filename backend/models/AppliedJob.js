const { DataTypes } = require('sequelize');

let AppliedJob;

const getModel = () => {
  if (AppliedJob) return AppliedJob;
  if (!global.sequelize) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }
  
  AppliedJob = global.sequelize.define('AppliedJob', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: true,
    tableName: 'applied_jobs'
  });
  
  return AppliedJob;
};

// Initialize if sequelize is available
if (global.sequelize) {
  getModel();
}

module.exports = getModel;
