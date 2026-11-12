import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API Clínica Salud Integral",
    version: "1.0.0",
    description:
      "Documentación de la API para la gestión de una clínica médica",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const outputFile = "./swagger-output.json";

const endpointsFiles = ["./src/index.ts"];

const generarSwagger = swaggerAutogen({
  openapi: "3.0.0",
});

await generarSwagger(outputFile, endpointsFiles, doc);
