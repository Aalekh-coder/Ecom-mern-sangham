const express = require("express");
const connectToDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./Routes/authRoute");
const adminProductRoute = require("./Routes/admin/productRoute");
const shopProductRouter = require("./Routes/Shop/productsRoutes");
const shopCartRouter = require("./Routes/Shop/cartRoutes")

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
app.use("/api/shop/cart",shopCartRouter)

app.listen(PORT,()=> console.log(`http://localhost:${PORT}`))