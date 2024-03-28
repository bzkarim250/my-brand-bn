import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';
import { userRouteDocs } from './user.docs';
import { blogRouteDocs } from './blog.docs';
import { messageRouteDocs } from './message.docs';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'My Brand',
      description: 'My Brand API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
      // {
      //   url: 'https://real-helmet-foal.cyclic.app',
      //   description: 'Production server Cyclic',
      // },
      {
        url: 'https://my-brand-bn-tsud.onrender.com',
        description: 'Production server Render',
      },
    ],
    tags: [
      { name: 'User', description: 'User End-points' },
      { name: 'Blog', description: 'Blog End-points' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        ServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'number',
                    description: 'status code of response',
                    example: 500
                  },
                  error: {
                    type: 'string',
                    example: 'SERVER_ERROR',
                  },
                  message: {
                    type: 'string',
                    description: 'Server errors',
                    example: 'error connection timeout',
                  }
                },
              },
            },

          }
        },
        BadRequest: {
          description: 'BAD_REQUEST',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'number',
                    description: 'Status code of Error',
                    example: 400,
                  },
                  error: {
                    type: 'string',
                    description: 'validation error',
                    example: 'BAD_REQUEST',
                  },
                  message: {
                    type: 'string',
                    description: 'Error message',
                    example: 'Invalid request body',
                  }
                },
              },
            },
          },
        },
        UnprocessableContent: {
          description: 'Unprocessable Content',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'number',
                    example: 422,
                  },
                  message: {
                    type: 'string',
                    description: 'Invalid data input',
                    example: 'Your inputs must be Valid',
                  },
                  error: {
                    type: 'string',
                    example: 'Unprocessable Content',
                  },
                },
              },
            },
          },
        },
        Unauthorized: {
          description: 'Authentication error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'number',
                    description: 'Status code of Error',
                    example: 401,
                  },
                  error: {
                    type: 'string',
                    description: 'authentication error',
                    example: 'UNAUTHORIZED',
                  },
                  message: {
                    type: 'string',
                    description: 'Error message',
                    example: "You don't have access to do that action",
                  }
                }
              }
            }
          }
        },
        AlreadyExists: {
          description: 'Record Already exists',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'number',
                    example: 409,
                  },
                  error: {
                    type: 'string',
                    example: 'ALREADY_EXISTS',
                  },
                  message: {
                    type: 'string',
                    description: 'Register existing record',
                    example: 'The record already registred',
                  }
                },
              },
            },
          },
        },
        NotFound: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'number',
                    example: 404,
                  },
                  message: {
                    type: 'string',
                    description: 'Record not Found',
                    example: 'Resource not found',
                  },
                  error: {
                    type: 'string',
                    description: 'Resource not found',
                    example: 'NOT_FOUND',
                  },
                },
              },
            },
          },
        }
      }
    },

    paths: {
      ...userRouteDocs,
      ...blogRouteDocs,
      ...messageRouteDocs,
    },
  },
  apis: ['../routes/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app: Router): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};

export default swaggerDocs;
