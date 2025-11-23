const { DataTypes } = require('sequelize');

let User;

const getModel = () => {
  if (User) return User;
  if (!global.sequelize) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }

  User = global.sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'admin'
    }
  }, {
    timestamps: true,
    tableName: 'users'
  });

  return User;
};

// Initialize if sequelize is available
if (global.sequelize) {
  getModel();
}

module.exports = getModel;
