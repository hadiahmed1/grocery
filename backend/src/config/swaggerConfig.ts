import swaggerJsdoc from 'swagger-jsdoc';
import yaml from 'yamljs';

const userDocs = yaml.load('./src/swaggerDocs/user.yaml');
const addressDocs = yaml.load('./src/swaggerDocs/address.yaml')

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
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
