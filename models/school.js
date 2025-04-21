const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const School = sequelize.define('School', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  address: {
    type: DataTypes.STRING,
    unique:true,
    allowNull: false,
    validate: {
      notEmpty: true,
      
    }
  },
  latitude: {
    type: DataTypes.FLOAT,
    unique:true,
    allowNull: false,
    validate: {
      isFloat: true,
      min: -90,
      max: 90,
      
    }
  },
  longitude: {
    type: DataTypes.FLOAT,
    unique:true,
    allowNull: false,
    validate: {
      isFloat: true,
      min: -180,
      max: 180,
      
    }
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'schools'
});

module.exports = School;