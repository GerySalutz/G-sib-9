const express = require("express");
const userRouter = require("./routes/users");
const movieRouter = require("./routes/movies");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const documentation = require("./documentation/swagger.json");
const app = express();

app.use(express.json());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(documentation, { explorer: true })
);

// Routes
app.use("/api", userRouter, movieRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render("error");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server run on ${port}`);
});
