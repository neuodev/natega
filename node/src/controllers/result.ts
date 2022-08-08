import { Response, Request, NextFunction } from "express";
import resultRepo from "../repo/resultRepo";
import asyncHandler from "express-async-handler";
import ResposneError from "../utils/responseError";

export const search = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { seatNo } = req.query;
    if (!seatNo)
      return next(new ResposneError("`SeatNo` query param is required", 400));
    let number = Number(seatNo);
    if (isNaN(number))
      return next(
        new ResposneError("`SeatNo` query param is not a valid number", 400)
      );
    let result = await resultRepo.findResult(number);

    if (!result) return next(new ResposneError("Not found", 404));

    res.status(200).json(result);
  }
);

export const summary = asyncHandler(async (req: Request, res: Response) => {
  const result = await resultRepo.summary();
  res.status(200).json(result);
});

export const rank = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { seatNo } = req.query;
    if (!seatNo)
      return next(new ResposneError("`SeatNo` query param is required", 400));
    let number = Number(seatNo);
    if (isNaN(number))
      return next(
        new ResposneError("`SeatNo` query param is not a valid number", 400)
      );
    let result = await resultRepo.findResult(number);

    if (!result) return next(new ResposneError("Not found", 404));

    let rank = await resultRepo.rank(result.seatNo);
    res.status(200).json({ rank });
  }
);

export const getResults = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let pageSize = Number(req.query.pageSize) || 10;
    let page = Number(req.query.page) | 1;
    let result = await resultRepo.find(page, pageSize);
    res.status(200).json(result);
  }
);
