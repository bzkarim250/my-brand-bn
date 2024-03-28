const contactMe = {
    tags: ["Message"],
    summary: "Contact Me",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "string",
                description: "Email of the sender",
                example: "example@example.com",
              },
              message: {
                type: "string",
                description: "Content of the message",
                example: "This is a sample message.",
              },
            },
            required: ["email", "message"],
          },
        },
      },
    },
    responses: {
      201: {
        description: "Message sent",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "number",
                  example: 201,
                },
                message: {
                  type: "string",
                  example: "Message sent successfully.",
                },
                data: {
                  type: "object",
                  example: {},
                },
              },
              required: ["status", "message"],
            },
          },
        },
      },
    },
  };
  
  const getAllMessages = {
    tags: ["Message"],
    summary: "Get All Messages",
    responses: {
      200: {
        description: "All messages retrieved",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "number",
                  example: 200,
                },
                message: {
                  type: "string",
                  example: "All messages retrieved successfully.",
                },
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        description: "Message ID",
                      },
                      email: {
                        type: "string",
                        description: "Email of the sender",
                      },
                      message: {
                        type: "string",
                        description: "Content of the message",
                      },
                    },
                  },
                },
              },
              required: ["status", "message", "data"],
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  };
  
  const getMessageById = {
    tags: ["Message"],
    summary: "Get Message by ID",
    parameters: [
      {
        name: "messageId",
        in: "path",
        description: "ID of the message",
        required: true,
        schema: {
          type: "string",
          example: "61721c2f557eb8a9a9f48cc9",
        },
      },
    ],
    responses: {
      200: {
        description: "Message retrieved successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "number",
                  example: 200,
                },
                message: {
                  type: "string",
                  example: "Message retrieved successfully.",
                },
                data: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                      description: "Message ID",
                    },
                    email: {
                      type: "string",
                      description: "Email of the sender",
                    },
                    message: {
                      type: "string",
                      description: "Content of the message",
                    },
                  },
                },
              },
              required: ["status", "message", "data"],
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  };
  
  const deleteMessage = {
    tags: ["Message"],
    summary: "Delete Message by ID",
    parameters: [
      {
        name: "messageId",
        in: "path",
        description: "ID of the message",
        required: true,
        schema: {
          type: "string",
          example: "61721c2f557eb8a9a9f48cc9",
        },
      },
    ],
    responses: {
      200: {
        description: "Message deleted successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "number",
                  example: 200,
                },
                message: {
                  type: "string",
                  example: "Message deleted successfully.",
                },
                data: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                      description: "Message ID",
                    },
                    email: {
                      type: "string",
                      description: "Email of the sender",
                    },
                    message: {
                      type: "string",
                      description: "Content of the message",
                    },
                  },
                },
              },
              required: ["status", "message", "data"],
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  };
  
  export const messageRouteDocs = {
    "/api/message/contact-me": {
      post: contactMe,
    },
    "/api/message/all": {
      get: getAllMessages,
    },
    "/api/message/single/{messageId}": {
      get: getMessageById,
    },
    "/api/message/delete/{messageId}": {
      delete: deleteMessage,
    },
  };
  