import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelizeConfig';

interface ReviewAttributes {
    id: string;
    user_id: string;
    product_id: string;
    rating: number;
    review?: string;
    deletedAt?: Date | null;
}

type ReviewCreationAttributes = Omit<ReviewAttributes, 'id' | 'deletedAt'>

class Review extends Model<ReviewAttributes, ReviewCreationAttributes>
    implements ReviewAttributes {
    public id!: string;
    public user_id!: string;
    public product_id!: string;
    public rating!: number;
    public review?: string;
    public deletedAt?: Date | null;

    // timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Review.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        review: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Review',
        tableName: 'reviews',
        timestamps: true,
        paranoid: true,
    }
);

export default Review;
