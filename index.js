const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const publicRoutes = require("./routes/publicRoutes");
const studentRoutes = require("./routes/studentRoutes");
const mentorRoutes = require("./routes/mentorRoutes");

app.use("/api", publicRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/mentor", mentorRoutes);
mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database is up and running");
  })
  .catch((err) => {
    console.log(err.message);
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is booming on port ${port}`);
});
