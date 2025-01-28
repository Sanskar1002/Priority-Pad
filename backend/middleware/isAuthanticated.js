import jwt from "jsonwebtoken";

const isAuthanticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User Not Authanticated",
      });
    }
    const decoder = await jwt.verify(token, process.env.SECRET_KEY); // return object
    if (!decoder) {
      return res.status(401).json({
        success: false,
        message: "token invalid",
      });
    }
    req.id = decoder.user_id
    // console.log(req.id);
    next()
  } catch (error) {
    console.log(error);
  }
};

export default isAuthanticated;
