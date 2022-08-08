import mongoose from "mongoose";

const schema = new mongoose.Schema({
  seatNo: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  school: String,
  org: String,
  status: String,
  kind: String,
  branch: String,
  arabic: String,
  firstLang: String,
  secondLang: String,
  pureMath: String,
  appliedMath: String,
  history: String,
  geography: String,
  philosophy: String,
  pychology: String,
  chemistry: String,
  biology: String,
  geology: String,
  physics: String,
  total: String,
  religiousEdu: String,
  nationalEdu: String,
  ecoAndStats: String,
  percentage: String,
});

export default mongoose.model("studentResult", schema);
