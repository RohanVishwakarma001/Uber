import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // 1 hour
  },
});

const BlacklistToken = mongoose.model("blacklistToken", blacklistTokenSchema);

export default BlacklistToken;
