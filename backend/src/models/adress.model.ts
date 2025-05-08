import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig';

const Address = sequelize.define('Address', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
  timestamps: true
});

export default Address;
