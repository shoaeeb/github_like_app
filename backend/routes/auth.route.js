import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  function (req, res) {
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  }
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: process.env.CLIENT_BASE_URL + "/login",
  }),
  function (req, res) {
    console.log("/github/callback url");
    res.redirect(process.env.CLIENT_BASE_URL);
  }
);

router.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      user: req.user,
    });
  } else {
    res.json({
      user: null,
    });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.json({
      message: "Logged Out!!",
    });
  });
});

export default router;
