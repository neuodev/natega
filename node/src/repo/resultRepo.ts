import StudentResult from "../models/StudentResult";

class ResultUOW {
  async getUniqueSeatNo(): Promise<Array<{ seatNo: number }>> {
    return StudentResult.find({}).select({ seatNo: 1 });
  }

  async findResult(seatNo: number) {
    return StudentResult.findOne({ seatNo });
  }

  async find(pageNum: number, pageSize: number) {
    let count = await StudentResult.countDocuments();
    const results = await StudentResult.find({})
      .sort({ total: -1 })
      .limit(pageSize)
      .skip(pageSize * (pageNum - 1));
    return { results, pages: Math.ceil(count / pageSize) };
  }

  async summary() {
    let numOfResults = await StudentResult.count();
    let maxResult = await StudentResult.find({}).sort({ total: -1 }).limit(1);
    return {
      numOfResults,
      maxResult,
    };
  }

  async flush() {
    await StudentResult.deleteMany({});
    console.log("Database flushed".green.underline.bold);
  }

  async rank(total: number, seatNo: number) {
    return await StudentResult.aggregate([
      {
        $setWindowFields: {
          partitionBy: null,
          sortBy: {
            total: -1,
          },
          output: {
            resultRank: {
              $denseRank: {},
            },
          },
        },
      },
      {
        $project: {
          resultRank: 2,
          total: 1,
          seatNo: 1,
        },
      },
      {
        $match: {
          seatNo,
        },
      },
    ]);
  }
}

export default new ResultUOW();
