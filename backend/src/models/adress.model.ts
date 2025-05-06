import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig'; 

const Address = sequelize.define('Address', {
  id: {
    type: DataTypes.BLOB('medium'), 
    primaryKey: true,
    allowNull: false
  },
  line1: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  line2: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  state: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  pincode: {
    type: DataTypes.STRING(16),
    allowNull: false
  },
  landmark: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'address',
  timestamps: false 
});

export default Address;
