import { Options } from 'swagger-jsdoc';

type SwaggerOptionsProps = Options;

export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API TIREITU',
      description: 'TireiTU é um app que gerencia amigos secretos',
      contact: {
        email: 'denisonfer.dev@gmail.com',
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'API DE DESENVOLVIMENTO',
      },
      {
        url: 'http://localhost:3000/',
        description: 'API DE PRODUÇÃO',
      },
    ],
  },
  apis: ['../shared/infra/http/routes/*.ts'],
} as SwaggerOptionsProps;
