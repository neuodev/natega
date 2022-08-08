import mongoose from "mongoose";
export const SEPERATOR = "##";
export const basicInfoKeys = [
  "name",
  "school",
  "org",
  "status",
  "kind",
  "branch",
];
export const gradesKeys = [
  "arabic",
  "first_lang",
  "second_lang",
  "pure_math",
  "applied_math",
  "history",
  "geography",
  "philosophy",
  "pychology",
  "chemistry",
  "biology",
  "geology",
  "physics",
  "religious_edu",
  "national_edu",
  "eco_and_stats",
];
const schema = new mongoose.Schema({
  seatNo: {
    type: Number,
    required: true,
    unique: true,
  },
  // name: String,
  // school: String,
  // org: String,
  // status: String,
  // kind: String,
  // branch: String,
  basicInfo: {
    // name##school##org##status##kind##branch
    type: String,
    required: true,
  },
  grades: {
    // arabic##firstLang##secondLang##pureMath##appliedMath##history##geography##philosophy##pychology##chemistry##biology##geology##physics##religious_edu##national_edu##eco_and_stats
    type: String,
    required: true,
  },
  // arabic: String,
  // firstLang: String,
  // secondLang: String,
  // pureMath: String,
  // appliedMath: String,
  // history: String,
  // geography: String,
  // philosophy: String,
  // pychology: String,
  // chemistry: String,
  // biology: String,
  // geology: String,
  // physics: String,
  // religiousEdu: String,
  // nationalEdu: String,
  // ecoAndStats: String,
  total: {
    type: Number,
    required: true,
  },
  percentage: Number,
});

export default mongoose.model("studentResult", schema);
