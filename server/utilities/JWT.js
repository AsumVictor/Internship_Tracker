import jwt from "jsonwebtoken";


export const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_TOKEN, {
      expiresIn: "5m",
    });
  };


  export const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();
  
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
  
    res.status(statusCode).cookie("x_user_auth_v1", token, options).json({
      success: true,
      token,
    });
  };