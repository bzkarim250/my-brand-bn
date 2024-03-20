/* eslint-disable quotes */
const createBlog = {
  tags: ["Blog"],
  summary: "Create Blog",
  consumes: ["multipart/form-data"],
  requestBody: {
    required: true,
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Blog title",
              example: "The ultimate guide to Node Js folder structure",
            },
            description: {
              type: "string",
              description: "Blog description",
              example:
                "Here is the best practices on how you you can organize your backend folder",
            },
            image: {
              type: "string",
              format: "binary",
              description: "Blog Image",
            },
          },
          required: ["title", "description", "image"],
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    201: {
      description: "Blog created",
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
                example: "Blog Created",
              },
              data: {
                type: "object",
                example: [],
              },
            },
            required: ["status", "data"],
          },
        },
      },
    },
    400: {
      $ref: "#/components/responses/BadRequest",
    },
    401: {
      $ref: "#/components/responses/Unauthorized",
    },
    409: {
      $ref: "#/components/responses/AlreadyExists",
    },
    422: {
      $ref: "#/components/responses/UnprocessableContent",
    },
    500: {
      $ref: "#/components/responses/ServerError",
    },
  },
};

const getAllBlogs = {
  tags: ["Blog"],
  description: "All blogs retrieved",
  responses: {
    200: {
      description: "OK",
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
              message: {
                type: "string",
                description: "List of all blogs",
                example: "All blogs retrieved!",
              },
              data: {
                type: "object",
                example: [],
              },
            },
          },
        },
      },
    },
    401: {
      $ref: "#/components/responses/Unauthorized",
    },
    500: {
      $ref: "#/components/responses/ServerError",
    },
  },
};
const getBlogById = {
  tags: ["Blog"],
  description: "Get Blog by id",
  parameters: [
    {
      name: "id",
      in: "path",
      description: "Blog id",
      type: "string",
      example: "61721c2f557eb8a9a9f48cc9",
    },
  ],
  responses: {
    200: {
      description: "Blog details retrieved",
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
                    description: "Blog ID",
                    example: "61721c2f557eb8a9a9f48cc9",
                  },
                  title: {
                    type: "string",
                    description: "Blog title",
                    example: "The ultimate guide to Node Js folder structure",
                  },
                  description: {
                    type: "string",
                    description: "Blog descrption",
                    example:
                      "Here is the best practices on how you you can organize your backend folder",
                  },
                  image: {
                    type: "string",
                    description: "Blog Image URL",
                    example:
                      "https://res.cloudinary.com/dt96mczf0/image/upload/v1710770069/xrzhodn9421hztj9p5ov.png",
                  },
                },
              },
            },
          },
        },
      },
    },
    401: {
      $ref: "#/components/responses/Unauthorized",
    },
    404: {
      description: "Not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "number",
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
    500: {
      $ref: "#/components/responses/ServerError",
    },
  },
};
const deleteBlogById = {
  tags: ["Blog"],
  description: "Delete blog by id",
  parameters: [
    {
      name: "id",
      in: "path",
      description: "Blog id",
      type: "string",
      example: "61721c2f557eb8a9a9f48cc9",
    },
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: "Blog deleted successfully",
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
                    description: "Blog ID",
                    example: "61721c2f557eb8a9a9f48cc9",
                  },
                  title: {
                    type: "string",
                    description: "Blog title",
                    example: "The ultimate guide to Node Js folder structure",
                  },
                  description: {
                    type: "string",
                    description: "Blog descrption",
                    example:
                      "Here is the best practices on how you you can organize your backend folder",
                  },
                  imageURL: {
                    type: "string",
                    description: "Blog Image URL",
                    example:
                      "https://res.cloudinary.com/dt96mczf0/image/upload/v1710770069/xrzhodn9421hztj9p5ov.png",
                  },
                },
              },
              message: {
                description: "Blog with that ID is found",
                example: "Blog Found Successfull",
              },
            },
          },
        },
      },
    },
    401: {
      $ref: "#/components/responses/Unauthorized",
    },
    403: {
      description: "Forbidden",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: {
                type: "number",
                description: "Status code of Error",
                example: 403,
              },
              message: {
                type: "string",
                description: "Unable to delete blog",
                example: "Not allowed to perform this action",
              },
              error: {
                type: "string",
                description: "Not allowed to perform this action",
                example: "FORBIDDEN",
              },
            },
          },
        },
      },
    },
    404: {
      $ref: "#components/responses/NotFound",
    },
    500: {
      $ref: "#/components/responses/ServerError",
    },
  },
};

const updateBlogById = {
  tags: ["Blog"],
  description: "Update Blog by id",
  parameters: [
    {
      name: "id",
      in: "path",
      description: "Blog id",
      type: "string",
      example: "61721c2f557eb8a9a9f48cc9",
    },
  ],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Updated Blog title",
              example: "Updated title",
            },
            description: {
              type: "string",
              description: "Updated Blog description",
              example: "Updated description",
            },
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
  responses: {
    200: {
      description: "Blog updated successfully",
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
              message: {
                type: "string",
                example: "Blog Updated",
              },
              data: {
                type: "object",
                example: [],
              },
            },
            required: ["status", "data"],
          },
        },
      },
    },
    400: {
      $ref: "#/components/responses/BadRequest",
    },
    401: {
      $ref: "#/components/responses/Unauthorized",
    },
    404: {
      $ref: "#components/responses/NotFound",
    },
    500: {
      $ref: "#/components/responses/ServerError",
    },
  },
};

const addComment = {
  tags: ["Blog"],
  summary: "Add Comment to blog",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            content: {
              type: "string",
              description: "Content of the comment",
              example: "This is a great blog post!",
            },
          },
          required: ["content"],
        },
      },
    },
  },
  parameters: [
    {
      name: "id",
      in: "path",
      description: "Blog id",
      required: true,
      type: "string",
      example: "61721c2f557eb8a9a9f48cc9",
    },
  ],
  responses: {
    201: {
      description: "Comment successfully added",
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
                example: "Comment added successfully",
              },
              data: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                    description: "Comment ID",
                    example: "61721c2f557eb8a9a9f48cc9",
                  },
                  content: {
                    type: "string",
                    description: "Content of the comment",
                    example: "This is a great blog post!",
                  },
                  user: {
                    type: "string",
                    description: "User ID who posted the comment",
                    example: "61721c2f557eb8a9a9f48cc9",
                  },
                  blog: {
                    type: "string",
                    description: "Blog ID to which the comment is added",
                    example: "61721c2f557eb8a9a9f48cc9",
                  },
                },
              },
            },
            required: ["status", "data"],
          },
        },
      },
    },
    400: {
      $ref: "#/components/responses/BadRequest",
    },
    422: {
      $ref: "#/components/responses/UnprocessableContent",
    },
    500: {
      $ref: "#/components/responses/ServerError",
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const addBlogLike = {
  tags: ["Blog"],
  summary: "Add Blog Like",
  parameters: [
    {
      name: "id",
      in: "path",
      description: "ID of the blog to like",
      required: true,
      type: "string",
      example: "61721c2f557eb8a9a9f48cc9",
    },
  ],
  responses: {
    201: {
      description: "Blog liked successfully",
      content: {},
    },
    400: {
      $ref: "#/components/responses/BadRequest",
    },
    422: {
      $ref: "#/components/responses/UnprocessableContent",
    },
    500: {
      $ref: "#/components/responses/ServerError",
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};






export const blogRouteDocs = {
  "/api/blog/create": {
    post: createBlog,
  },
  "/api/blog/all": {
    get: getAllBlogs,
  },
  "/api/blog/single/{id}": {
    get: getBlogById,
  },
  "/api/blog/delete/{id}": {
    delete: deleteBlogById,
  },
  "/api/blog/update/{id}": {
    patch: updateBlogById,
  },
  "/api/comment/add/{id}":{
    post:addComment,
  },
  "/api/blog/like/{id}":{
    patch:addBlogLike,
  },
};
