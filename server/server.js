const express = require("express");
const connectToDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./Routes/authRoute");
const adminProductRoute = require("./Routes/admin/productRoute");
const shopProductRouter = require("./Routes/Shop/productsRoutes")

connectToDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductRoute);
app.use("/api/shop/products",shopProductRouter)

app.listen(PORT,()=> console.log("Server is now running on",PORT))