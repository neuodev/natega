import StudentResult, {
  basicInfoKeys,
  gradesKeys,
  ResultDB,
  SEPERATOR,
} from "../models/StudentResult";
import { Result } from "../seed";

class ResultUOW {
  async getUniqueSeatNo(): Promise<Array<{ seatNo: number }>> {
    return StudentResult.find({}).select({ seatNo: 1 });
  }

  async findResult(seatNo: number) {
    const res: ResultDB | null = await StudentResult.findOne({ seatNo });
    if (!res) return null;
    return this.decode(res);
  }

  async find(pageNum: number, pageSize: number) {
    let count = await StudentResult.countDocuments();
    const results = await StudentResult.find({})
      .sort({ total: -1 })
      .limit(pageSize)
      .skip(pageSize * (pageNum - 1));

    return {
      results: results.map((res: any) => this.decode(res)),
      pages: Math.ceil(count / pageSize),
    };
  }

  async summary() {
    let numOfResults = await StudentResult.count();
    let maxResult = await StudentResult.find({}).sort({ total: -1 }).limit(1);

    return {
      numOfResults,
      maxResult:
        !maxResult || maxResult.length === 0
          ? null
          : this.decode(maxResult[0] as ResultDB),
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

  encode(result: Result) {
    const {
      name,
      school,
      org,
      status,
      kind,
      branch,
      // >>>>>>>>>>>>>>>>>>>>>>>
      arabic,
      first_lang,
      second_lang,
      pure_math,
      applied_math,
      history,
      geography,
      philosophy,
      pychology,
      chemistry,
      biology,
      geology,
      physics,
      religious_edu,
      national_edu,
      eco_and_stats,
    } = result;
    let basicInfo = [name, school, org, status, kind, branch].join(SEPERATOR);
    let grades = [
      arabic,
      first_lang,
      second_lang,
      pure_math,
      applied_math,
      history,
      geography,
      philosophy,
      pychology,
      chemistry,
      biology,
      geology,
      physics,
      religious_edu,
      national_edu,
      eco_and_stats,
    ].join(SEPERATOR);

    return {
      basicInfo,
      grades,
    };
  }

  decode(encoded: ResultDB) {
    let { basicInfo, grades } = encoded;
    let info = basicInfo.split(SEPERATOR);
    let allGrades = grades.split(SEPERATOR);
    let result: { [key: string]: string } = {};

    info.forEach((val, idx) => {
      result[basicInfoKeys[idx]] = val;
    });
    allGrades.forEach((val, idx) => {
      result[gradesKeys[idx]] = val;
    });

    return {
      ...result,
      seatNo: encoded.seatNo,
      total: encoded.total,
      percentage: encoded.percentage,
    };
  }
}

export default new ResultUOW();
