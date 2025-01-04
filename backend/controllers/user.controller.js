import User from "../models/user.model.js";
export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });
    const userProfile = await userRes.json();
    const repoRes = await fetch(userProfile.repos_url, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });
    const repos = await repoRes.json();
    res.json({
      userProfile,
      repos,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const likeProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findById(req.user._id.toString());
    console.log(user, "authUser");
    const userToLike = await User.findOne({
      username,
    });
    if (!userToLike) {
      return res.status(400).json({
        error: "User is not found ",
      });
    }
    if (user.likedProfiles.includes(userToLike.username)) {
      res.status(400).json({
        error: "User already liked",
      });
    }
    userToLike.likedBy.push({
      username: user.username,
      avatarUrl: user.avatarUrl,
      likedDate: Date.now(),
    });
    user.likedProfiles.push(userToLike.username);
    await Promise.all([userToLike.save(), user.save()]);
    res.status(200).json({
      message: "User Profile Liked",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getLikes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id.toString());
    res.status(200).json({
      likedBy: user.likedBy,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};
