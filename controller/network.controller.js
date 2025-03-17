// action=read&path=high_tech
import axios from "axios";
import ResponseError from "../utilities/ErrorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { nanoid } from "nanoid";

// Get all companies

// DONE:
export const retrieve_all = catchAsyncError(async (req, res, next) => {
  try {
    const { data: response_data } = await axios.get(
      `${process.env.SHEET_URL}action=read&path=networking`
    );

    res.status(200).json({ success: true, data: response_data.data });
  } catch (error) {
    return next(new ResponseError(error.message, 400));
  }
});

// get specifc company info
export const getRecordByID = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data: response_data } = await axios.get(
      `${process.env.SHEET_URL}action=read&path=networking&id=${id}`
    );

    if (!response_data.data) {
      return next(new ResponseError(`Record with id ${id} not found`, 400));
    }

    res.status(200).json({ success: true, data: response_data.data });
  } catch (error) {
    return next(new ResponseError(error.message, 400));
  }
});

// edit a specific company filed
export const editRecord = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { field, value } = req.body;

    const { data: response_data } = await axios.post(
      `${process.env.SHEET_URL}action=editField&path=networking&id=${id}`,
      {
        id,
        field,
        value,
      }
    );

    if (!response_data.data) {
      return next(new ResponseError(`Record with id ${id} not found`, 400));
    }

    res
      .status(200)
      .json({ success: true, data: "Record updated successfully" });
  } catch (error) {
    console.log(error);
    return next(new ResponseError(error.message, 400));
  }
});

// add new record
export const addRecord = catchAsyncError(async (req, res, next) => {
  try {
    const {
      companyName,
      roleType,
      personName,
      linkedInProfile,
      contacted,
      responded,
      referral,
      importantNotes,
    } = req.body;

    if (
      !companyName ||
      !roleType ||
      !personName ||
      !linkedInProfile ||
      !contacted ||
      !responded ||
      !referral
    ) {
      return next(
        new ResponseError(
          "All filed are required to perform this operations",
          400
        )
      );
    }
    
    const { data: response_data } = await axios.post(
      `${process.env.SHEET_URL}action=write&path=networking`,
      {
        value: [
          nanoid(),
          companyName,
          roleType,
          personName,
          linkedInProfile,
          contacted,
          responded,
          referral,
          importantNotes,
        ],
      }
    );

    if (!response_data.data) {
      return next(new ResponseError(`Error Occured adding a record`, 400));
    }

    res
      .status(200)
      .json({ success: true, data: "Record updated successfully" });
  } catch (error) {
    console.log(error);
    return next(new ResponseError(error.message, 400));
  }
});
