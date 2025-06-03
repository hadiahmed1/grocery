import swaggerJsdoc from 'swagger-jsdoc';
import yaml from 'yamljs';

const userDocs = yaml.load('./src/swaggerDocs/user.yaml');
const addressDocs = yaml.load('./src/swaggerDocs/address.yaml');
const cartDocs = yaml.load('./src/swaggerDocs/cart.yaml');
const orderDocs = yaml.load('./src/swaggerDocs/order.yaml');
const productDocs = yaml.load('./src/swaggerDocs/product.yaml');
const reviewDocs = yaml.load('./src/swaggerDocs/review.yaml');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Grocery API',
      version: '1.0.0',
      description: 'API documentation for GroceryApp',
    },
    components: {
      securitySchemes: {
        accessTokenCookie: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
        },
        verificationTokenCookie: {
          type: 'apiKey',
          in: 'cookie',
          name: 'verificationToken',
        },
      },
    },
    security: [
      {
        accessTokenCookie: [],
      },
    ],
    paths: {
      ...userDocs.paths,
      ...addressDocs.paths,
      ...cartDocs.paths,
      ...orderDocs.paths,
      ...productDocs.paths,
      ...reviewDocs.paths
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
