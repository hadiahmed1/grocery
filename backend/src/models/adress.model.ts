import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig';

const Address = sequelize.define('Address', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name:{
    type: DataTypes.STRING(50),
    defaultValue: null
  },
  user_id:{
    type: DataTypes.UUID,
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
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'address',
  timestamps: true,
  paranoid: true
});

export default Address;
