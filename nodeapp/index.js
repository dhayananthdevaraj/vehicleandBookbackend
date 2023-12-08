const express = require("express");
const mongoose = require("mongoose");
// const bookRoutes = require("./routers/bookRouter");
const loanApplicationRouter = require("./routers/loanApplicationRouter");
const loanRouter = require("./routers/loanRouter");
const userRouter = require("./routers/userRouter");
const app = express();
app.use(express.json({ limit: '10mb' })); // Set a suitable limit
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Set a suitable limit

app.use(express.urlencoded({ extended: true }));
const cors = require("cors"); // Import the cors package
const corsOptions = {
  origin: "*", // Replace with the URL of your frontend application
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type,Authorization",
};


// Enable CORS with the specified options
app.use(cors(corsOptions));
mongoose
  .connect("mongodb://127.0.0.1:27017/myapp")
  .then(() => {
    console.log("Database connected");
    app.listen(8080, () => {
      console.log("API is running in PORT:8080");
    });
  })
  .catch((error) => {
    console.log(error);
  });
  
  app.use("/user", userRouter);
  app.use("/loan", loanRouter);
  app.use("/loanApplication", loanApplicationRouter);

