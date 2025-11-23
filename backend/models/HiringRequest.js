const { DataTypes } = require('sequelize');

let HiringRequest;

const getModel = () => {
  if (HiringRequest) return HiringRequest;
  if (!global.sequelize) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }
  
  HiringRequest = global.sequelize.define('HiringRequest', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
    tableName: 'hiring_requests'
  });
  
  return HiringRequest;
};

// Initialize if sequelize is available
if (global.sequelize) {
  getModel();
}

module.exports = getModel;
