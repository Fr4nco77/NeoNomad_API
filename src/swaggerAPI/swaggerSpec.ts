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
<<<<<<< HEAD
      },
      // {
      //   url: "http://localhost:3001/",
      // },
=======
      }
>>>>>>> 6c5cfc2bd0c2888268cf8c8a90a6ac8e8194a53a
    ],
  },
  apis: ["./src/swaggerAPI/docs/*.ts"],
};

const swaggerSpec = swaggerJSDoc(spec);

export default swaggerSpec;
