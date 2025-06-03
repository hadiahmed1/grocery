import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Grocery API',
      version: '1.0.0',
      description: 'API documentation for your GroceryApp app'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./src/routes/*.ts'], 
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
