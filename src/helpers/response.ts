/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";

interface ErrorResponse {
  status: number;
  message: string;
  error: string;
}

const response = (
  res: Response,
  status: number,
  message: string,
  data?: any,
  error?: string
) => {
  if (error) {
    const errorResponse: ErrorResponse = { status, message, error };
    return res.status(status).json(errorResponse);
  } else {
    return res.status(status).json({ status, message, data });
  }
};

export default response;
