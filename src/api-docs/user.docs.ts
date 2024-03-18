/* eslint-disable quotes */
const createUser = {
    tags: ["User"],
    summary: "User signup",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              username: {
                type: "string",
                description: "The user name",
                example: "abdoulakalim",
              },
              fullname: {
                type: "string",
                description: "The user fullname",
                example: "Abdoulkalim Bazambanza",
              },
              email: {
                type: "string",
                description: "The user email",
                example: "bzkarim250@gmail.com",
              },
              password: {
                type: "string",
                description: "The user password",
                example: "@Abdul123",
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Signup successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'number',
                  example: 201,
                },
                data: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                      example: '612a1bdeaa15c07f6cf0a165',
                    },
                    username: {
                      type: 'string',
                      example: 'abdoulkalim',
                    },
                    fullname: {
                      type: 'string',
                      example: 'Abdoulkalim Bazambanza',
                    },
                    email: {
                      type: 'string',
                      example: 'bzkarim250@gmail.com',
                    },
                    role: {
                      type: 'string',
                      example: 'admin',
                    },
                  },
                },
                accessToken: {
                  type: 'string',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
              },
              required: ['status', 'data'],
            },
          },
        },
      },
      400: {
        description: "BAD_REQUEST",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "number",
                  description: "Status code of Error",
                  example: 400,
                },
                error: {
                  type: "string",
                  description: "validation error",
                  example: "BAD_REQUEST",
                },
                message: {
                  type: "string",
                  description: "Error message",
                  example: "Invalid request body",
                }
              },
            },
          },
        },
      },
      409: {
        description: 'Account already registred',
        $ref: "#/components/responses/AlreadyExists"
      },
      422: {
        $ref: "#/components/responses/UnprocessableContent"
      },
      500: {
        $ref: "#/components/responses/ServerError"
      },
    },
  };
  
  const login = {
    tags: ["User"],
    summary: "User login",
    description: "Login",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              account: {
                type: "string",
                description: "Your email or username",
                example: "bzkarim250@gmail.com",
              },
              password: {
                type: "string",
                description: "Your password",
                example: "@Abdul123",
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "login successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "number",
                  description: "Status code of the request",
                  example: 200,
                },
                data: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                      description: "User ID",
                      example: "61721c2f557eb8a9a9f48cc9",
                    },
                    username: {
                      type: "string",
                      description: "User name",
                      example: "abdoulkalim",
                    },
                    fullname: {
                      type: "string",
                      description: "User fullname",
                      example: "Abdoulkalim Bazambanza",
                    },
                    email: {
                      type: "string",
                      description: "User email",
                      example: "bzkarim250@gmail.com",
                    },
                  },
                },
                accessToken: {
                  type: "string",
                  description: "JWT token for authentication",
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                },
              },
            },
          },
        },
      },
      401: {
        description: "UNAUTHORIZED",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: 'number',
                  example: 401,
                },
                message: {
                  type: "string",
                  description: "wrong credentials",
                  example: "Wrong password",
                },
                error: {
                  type: "string",
                  description: "Login failed",
                  example: "UNAUTHORIZED",
                },
              },
            },
          },
        },
      },
      404: {
        description: "Not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: 'number',
                  example: 404,
                },
                message: {
                  type: "string",
                  description: "user not registered",
                  example: "Email or username not registered",
                },
                error: {
                  type: "string",
                  description: "user not registerd",
                  example: "NOT_FOUND",
                },
              },
            },
          },
        },
      },
      422: {
        description: "Unprocessable Content",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: 'number',
                  example: 422,
                },
                message: {
                  type: "string",
                  description: "Invalid data input",
                  example: "Email or username not registered or invalid",
                },
                error: {
                  type: "string",
                  example: "Unprocessable Content",
                },
              },
            },
          },
        },
      },
      500: {
        $ref: "#/components/responses/ServerError"
      },
    },
  };
  
  export const userRouteDocs = {
    "/api/user/signup": {
      post: createUser,
    },
    "/api/user/login": {
      post: login,
    }
  };
  