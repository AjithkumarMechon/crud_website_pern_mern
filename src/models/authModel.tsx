import { Schema, model, Document } from "mongoose";

// Interface for the combined document
interface IAuth extends Document {
  role: string;
  username: string;
  password: string;

  // Fields for OAuth
  provider?: string;
  providerId?: string;
  accessToken?: string;
  refreshToken?: string;
}

const authSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: false },

  // OAuth fields
  provider: { type: String },
  providerId: { type: String },
  accessToken: { type: String },
  refreshToken: { type: String },
});

const AuthModel = model<IAuth>("Auth", authSchema);

export default AuthModel;
