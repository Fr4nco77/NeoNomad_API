import swaggerJSDoc from "swagger-jsdoc";

const spec = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Neo Nomad API",
      summary: "API for Cabron",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://nomad-api-drtc.onrender.com"
      },
      {
        url: "http://localhost:3001/",
      },
    ],
  },
  apis: ["./src/swaggerAPI/docs/*.ts"],
};

const swaggerSpec = swaggerJSDoc(spec);

export default swaggerSpec;
