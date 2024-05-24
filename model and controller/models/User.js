import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    Firstname: {
      type: String,
      required: true,
    },   
    Lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  
  services: {
   type:[String],
   required:false
  }
}
);

export default mongoose.model("User", UserSchema);
