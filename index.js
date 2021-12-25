const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const rootPath = require("./routes/root");
const contactRoute = require("./routes/phone_book");
const cors = require('cors');
const bodyParser = require("body-parser");
dotenv.config();
// Our Express
mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
);

//middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cors({origin: true}));
app.use(rootPath);
app.use("/api/contact", contactRoute);

app.listen(process.env.PORT || port);