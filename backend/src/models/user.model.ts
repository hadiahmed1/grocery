// models/User.ts
import { DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../config/sequelizeConfig';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(320),
    allowNull: false,
    unique: true
  },
  phno: {
    type: DataTypes.STRING(15),
    allowNull: true,
    unique: true
  },
  user_password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  address_id: {
    type: DataTypes.UUID, // FK to Address
    allowNull: true
  },
  deletedAt : {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: 'users',
  timestamps: true,
  updatedAt: 'updateTimestamp'
});

export default User;
