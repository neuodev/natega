import axios from "axios";
import StudentResult from "./models/StudentResult";
import resultRepo from "./repo/resultRepo";
import "colors";

const SERVER = "http://159.223.98.29";
const files = [
  "937001.json",
  "300000.json",
  "500000.json",
  "800000.json",
  "900000.json",
  "200000.json",
  "700000.json",
  "400000.json",
  "600000.json",
];

type Result = {
  name: string;
  school: string;
  org: string;
  status: string;
  kind: string;
  branch: string;
  arabic: string;
  first_lang: string;
  second_lang: string;
  pure_math: string;
  applied_math: string;
  history: string;
  geography: string;
  philosophy: string;
  pychology: string;
  chemistry: string;
  biology: string;
  geology: string;
  physics: string;
  total: string;
  religious_edu: string;
  national_edu: string;
  eco_and_stats: string;
  seat_no: string;
  percentage: string;
};

export async function seed() {
  console.log(`Fetching latest results from ${SERVER}`.cyan.underline.bold);
  for (let file of files) {
    console.log(`File ${file}`.cyan.underline.bold);
    try {
      const [{ data }, seatNos] = await Promise.all([
        axios.get(`${SERVER}/static/${file}`),
        resultRepo.getUniqueSeatNo(),
      ]);

      console.log(
        `Found ${seatNos.length} unique seat numbers`.cyan.underline.bold
      );
      // Remove duplicate results
      let id2Result: { [key: string]: Result } = {};
      let uniqueSeatNo = new Set(seatNos.map((s) => s.seatNo));
      data.forEach((r: Result) => {
        if (uniqueSeatNo.has(Number(r.seat_no))) return;
        id2Result[Number(r.seat_no)] = r;
      });
      let filtered = Object.values(id2Result);
      console.log(
        `Orginal: ${data.length}. Filtered: ${filtered.length}`.cyan.underline
          .bold
      );
      await StudentResult.insertMany(
        Object.values(id2Result).map(
          (r: Result) => ({
            ...r,
            firstLang: r.first_lang,
            secondLang: r.second_lang,
            pureMath: r.pure_math,
            appliedMath: r.applied_math,
            religiousEdu: r.religious_edu,
            nationalEdu: r.national_edu,
            ecoAndStats: r.eco_and_stats,
            seatNo: r.seat_no,
          }),
          {
            ordered: false,
          }
        )
      );
      console.log(`${file} saved successfully`.underline.green.bold);
    } catch (error) {
      console.log("Failed get latest resutls".underline.red.bold);
      if (error instanceof Error) {
        console.log(error.message);
      } else if (typeof error == "string") console.log(error);
    }
  }
}
