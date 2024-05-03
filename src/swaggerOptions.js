const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Multimedia Manager Express API with Swagger",
      version: "1.0.0",
      description:
        `This is a simple CRUD API application made with Express and documented with Swagger. 
        Made with love by Anthony Maldonado ❤️`,
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Anthony Maldonado",
        url: "https://github.com/AnthonyMaldonadoCss/",
        email: "anthonysistemas20@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  basePath: "/",
  apis: ["./src/routes/**/*.js"],

};

module.exports = options