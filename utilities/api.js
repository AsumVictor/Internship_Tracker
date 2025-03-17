// Dotend
import dotenv from "dotenv";
if (
  process.env.NODE_ENV !== "PRODUCTION" ||
  process.env.NODE_ENV != "production"
) {
  dotenv.config({
    path: "./.env",
  });
}

export const url = `${process.env.SHEET_URL}`