import { Request, Response, NextFunction } from "express";
import httpStatus from "../constants/httpStatusCode";

type Controller<T extends Request = Request> = (
  req: T,
  res: Response,
  next: NextFunction
) => Promise<Response | void>;

const asyncHandler = <T extends Request = Request>(fn: Controller<T>) =>
  (req: T, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(error => {
      console.error(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: (error as Error).message,
      });
    });
  };

export default asyncHandler;
