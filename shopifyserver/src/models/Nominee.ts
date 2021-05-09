import mongoose from "mongoose";

const NomineeSchema = new mongoose.Schema({
  UUID: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
});

const Nominee = mongoose.model("nomineedb", NomineeSchema);
export { Nominee };
