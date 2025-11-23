const { DataTypes } = require('sequelize');

let Setting;

const getModel = () => {
  if (Setting) return Setting;
  if (!global.sequelize) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }
  
  Setting = global.sequelize.define('Setting', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    key: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('value');
        try {
          return JSON.parse(rawValue);
        } catch (e) {
          return rawValue;
        }
      },
      set(value) {
        this.setDataValue('value', typeof value === 'object' ? JSON.stringify(value) : value);
      }
    }
  }, {
    timestamps: false,
    tableName: 'settings'
  });
  
  return Setting;
};

// Initialize if sequelize is available
if (global.sequelize) {
  getModel();
}

module.exports = getModel;
