import StudentResult from "../models/StudentResult";

class ResultUOW {
  async getUniqueSeatNo(): Promise<Array<{ seatNo: string }>> {
    return StudentResult.find({}).select({ seatNo: 1 });
  }
}

export default new ResultUOW();
