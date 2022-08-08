import StudentResult, {
  basicInfoKeys,
  gradesKeys,
  SEPERATOR,
} from "../models/StudentResult";
import { Result } from "../seed";

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

  decode(encoded: { basicInfo: string; grades: string }) {
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

    return result;
  }
}

export default new ResultUOW();
