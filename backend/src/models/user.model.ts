// models/user.model.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelizeConfig';
import { UserAttributes, UserCreationAttributes } from '../types/user.type';
import bcrypt from 'bcryptjs';

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public username!: string;
  public email!: string;
  public phno?: string;
  public role!: 'user' | 'seller';
  public user_password!: string;
  public isVerified?: boolean;
  public deletedAt?: Date | null;
  public readonly createdAt!: Date;
  public readonly updateTimestamp!: Date;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(320),
    allowNull: false,
    unique: true,
  },
  phno: {
    type: DataTypes.STRING(15),
    allowNull: true,
    unique: true,
  },
  user_password: {
    type: DataTypes.STRING(100),
    allowNull: false,
    set(value: string){
      this.setDataValue('user_password', bcrypt.hashSync(value));
    }
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  role:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user'
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  sequelize,
  tableName: 'users',
  timestamps: true,
  paranoid: true
});

export default User;
