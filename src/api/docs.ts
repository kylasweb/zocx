import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HYIP API',
      version: '1.0.0',
      description: 'High Yield Investment Platform API Documentation',
    },
    servers: [{ url: 'http://localhost:5000/api' }],
  },
  apis: ['./src/api/*.ts'],
};

export const specs = swaggerJsdoc(options);
export const swaggerMiddleware = swaggerUi.serve;
export const swaggerHandler = swaggerUi.setup(specs); 