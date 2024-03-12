import { Response } from "express";

interface UserData {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  role: string;
  accessToken: string;
}

interface ErrorResponse {
  status: number;
  message: string;
  error: string;
}

const response = (
  res: Response,
  status: number,
  message: string,
  data?: UserData | null,
  error?: string
) => {
  if (error) {
    const errorResponse: ErrorResponse = { status, message, error };
    return res.status(status).json(errorResponse);
  } else {
    const responseData = data ? { ...data } : null;
    return res.status(status).json({ status, message, data: responseData });
  }
};

export default response;
