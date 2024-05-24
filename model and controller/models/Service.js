import mongoose from "mongoose";
const ServiceSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  }
});

export default mongoose.model("Service", ServiceSchema)