import mongoose from "mongoose";

const schema = new mongoose.Schema({
  seatNo: {
    type: Number,
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
  total: {
    type: Number,
    required: true,
  },
  religiousEdu: String,
  nationalEdu: String,
  ecoAndStats: String,
  percentage: Number,
});

export default mongoose.model("studentResult", schema);
