const { DataTypes } = require('sequelize');

let Job;

const getModel = () => {
  if (Job) return Job;
  if (!global.sequelize) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }
  
  Job = global.sequelize.define('Job', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    applyLink: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    tableName: 'jobs'
  });
  
  return Job;
};

// Initialize if sequelize is available
if (global.sequelize) {
  getModel();
}

module.exports = getModel;
