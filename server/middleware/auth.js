import userModel from "../model/user.model.js";
import ErrorHandler from "../utilities/ErrorHandler.js";
import CatchAsyncErrors from "./catchAsyncError.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = CatchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please you must login first", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await userModel.findById(decoded.id);
  next();
});
