// action=read&path=high_tech
import axios from "axios";
import ResponseError from "../utilities/ErrorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { nanoid } from "nanoid";
// Get all companies
const Routepath = {
  J4QuTPJYr5JAhz4bJH4u2Mq: "high_tech",
  iHADMvfxVRv0r2DpEw0sD3y: "finance",
  LS4Mlh0y3XLJC6hzrUp413w: "others",
};

import { isAuthenticated } from "../middleware/auth.js";

// DONE:
export const retrieve_all = catchAsyncError(
  
  async (req, res, next) => {
    try {
      const { path } = req.query;

      if (!path) {
        return next(new ResponseError("Path is required to get data", 400));
      }
      const { data: response_data } = await axios.get(
        `${process.env.SHEET_URL}action=read&path=${Routepath[path]}`
      );

      res.status(200).json({ success: true, data: response_data.data });
    } catch (error) {
      return next(new ResponseError(error.message, 400));
    }
  }
);

// get specifc company info
export const getRecordByID = catchAsyncError(
  
  async (req, res, next) => {
    try {
      const { path } = req.query;
      const { id } = req.params;

      console.log(path, id);

      if (!path || !id) {
        return next(
          new ResponseError("Path and id is required to get data", 400)
        );
      }
      const { data: response_data } = await axios.get(
        `${process.env.SHEET_URL}action=read&path=${Routepath[path]}&id=${id}`
      );
      console.log(response_data);
      if (!response_data.data) {
        return next(new ResponseError(`Record with id ${id} not found`, 400));
      }

      res.status(200).json({ success: true, data: response_data.data });
    } catch (error) {
      return next(new ResponseError(error.message, 400));
    }
  }
);

// edit a specific company filed
export const editRecord = catchAsyncError(
  
  async (req, res, next) => {
    try {
      const { path } = req.query;
      const { id } = req.params;
      const { field, value } = req.body;

      if (!path || !id || !field || !value) {
        return next(
          new ResponseError(
            "All filed are required to perform this operations",
            400
          )
        );
      }
      const { data: response_data } = await axios.post(
        `${process.env.SHEET_URL}action=editField&path=${Routepath[path]}&id=${id}`,
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
  }
);

// add new record
export const addRecord = catchAsyncError(
  
  async (req, res, next) => {
    try {
      const { path } = req.query;
      const {
        companyName,
        role,
        openingDate,
        applicationDeadline,
        preStatus,
        requirements,
        careerWebsite,
        oa,
        interviewRound1,
        interviewRound2,
        interviewRound3,
        final,
        importantNotes,
      } = req.body;

      if (
        !companyName ||
        !role ||
        !openingDate ||
        !preStatus ||
        !careerWebsite ||
        !oa
      ) {
        return next(
          new ResponseError(
            "All filed are required to perform this operations",
            400
          )
        );
      }
      const { data: response_data } = await axios.post(
        `${process.env.SHEET_URL}action=write&path=${Routepath[path]}`,
        {
          value: [
            nanoid(),
            companyName,
            role,
            openingDate,
            applicationDeadline,
            preStatus,
            requirements,
            careerWebsite,
            oa,
            interviewRound1,
            interviewRound2,
            interviewRound3,
            final,
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
  }
);
