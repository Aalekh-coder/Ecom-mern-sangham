const express = require("express");
const connectToDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./Routes/authRoute");
const adminProductRoute = require("./Routes/admin/productRoute");
const shopProductRouter = require("./Routes/Shop/productsRoutes");
const shopCartRouter = require("./Routes/Shop/cartRoutes");
const shopAddressRouter = require("./Routes/Shop/addressRoutes");
const shopOrderRouter = require("./Routes/Shop/orderRoutes")
const adminOrderRouter = require("./Routes/admin/orderRoutes")

connectToDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hello welcome to api of ecom mern stack")
})

app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local development
      "https://ecom-mern-sangham-frontend.onrender.com",
      "https://ecom-mern-sangham.vercel.app" // Deployed frontend
    ],
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
app.use("/api/admin/orders",adminOrderRouter)
app.use("/api/shop/products",shopProductRouter)
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter)

app.listen(PORT,()=> console.log(`http://localhost:${PORT}`))