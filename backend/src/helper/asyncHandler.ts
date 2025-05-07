import { Request, Response, NextFunction } from "express";

type Controller<T extends Request = Request> = (
  req: T,
  res: Response,
  next: NextFunction
) => Promise<Response | void>;

const asyncHandler = <T extends Request = Request>(fn: Controller<T>) =>
  (req: T, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(error => {
      console.error(error);
      res.status(500).json({
        success: false,
        message: (error as Error).message,
      });
    });
  };

export default asyncHandler;
