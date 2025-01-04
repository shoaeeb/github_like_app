import "dotenv/config";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/userRoutes.js";
import exploreRoutes from "./routes/explore.route.js";
import connectMongoDB from "./db/connectMongoDB.js";
import cors from "cors";
import "./passport/github.auth.js";
import passport from "passport";
import session from "express-session";

const PORT = 5000;
const app = express();

app.use(
  cors({
    url: process.env.FRONTEND_URL,
  })
);
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);
app.listen(PORT, async () => {
  await connectMongoDB(); //connect to MongoDB
  console.log(`app listening to PORT ${PORT}`); //start the server
});
