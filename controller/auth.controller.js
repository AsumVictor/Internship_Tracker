import catchAsyncError from "../middleware/catchAsyncError.js";
import ResponseError from "../utilities/ErrorHandler.js";
import UserModel from "../model/user.model.js";
import { sendToken } from "../utilities/JWT.js";

// Register account route
/**
 * @access_token
 * @refresh_token
 */
export const register = catchAsyncError(async (req, res, next) => {
  try {
    if (!username || !email || !password) {
      return next(ResponseError("All filed are required!", 400));
    }

    // check for duplicate users
    const exist_user = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (exist_user) {
      return next(
        ResponseError(
          "This email or username has already been registered! Login",
          400
        )
      );
    }

    const newUser = await UserModel.create({
      username,
      email,
      password,
    });

    sendToken(newUser, 200, res);
  } catch (error) {
    return next(new ResponseError(error.message, 400));
  }
});

// login account route
export const login = catchAsyncError(async (req, res, next) => {
  /**
   * @email
   * raw @passowrd
   */

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide all credentails", 400));
    }

    let user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Incorrect email or password", 400));
    }

    const matchPassword = await user.comparePassword(password);

    if (!matchPassword) {
      return next(new ErrorHandler("Incorrect email or password", 400));
    }

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ResponseError(error.message, 400));
  }
});

// logout account route
export const logout = catchAsyncError(async (req, res, next) => {
  try {
    // Todo: I will add business logic later
  } catch (error) {
    return next(new ResponseError(error.message, 400));
  }
});

// logout account route
export const verifyJWT = catchAsyncError(async (req, res, next) => {
  /**
   * Take @refresh_token and validate (validity, expiring date)
   * return status response @boolean
   */
  try {
    // Todo: I will add business logic later
  } catch (error) {
    return next(new ResponseError(error.message, 400));
  }
});

// logout account route
export const generate_access_token = catchAsyncError(async (req, res, next) => {
  /**
   * We will take user details and generate access token
   */
  try {
    // Todo: I will add business logic later
  } catch (error) {
    return next(new ResponseError(error.message, 400));
  }
});

// logout account route
export const generate_refresh_token = catchAsyncError(
  async (req, res, next) => {
    try {
      // Todo: I will add business logic later
    } catch (error) {
      return next(new ResponseError(error.message, 400));
    }
  }
);

// logout account route
export const activate_account = catchAsyncError(async (req, res, next) => {
  try {
    // Todo: I will add business logic later
  } catch (error) {
    return next(new ResponseError(error.message, 400));
  }
});
