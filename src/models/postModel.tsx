import { Schema, model, models, Document } from "mongoose";

interface IPost extends Document {
  title: string;
  description: string;
  image?: string | null;
}

const postSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: null },
});

const PostModel = models.Post || model<IPost>("POST", postSchema);

export default PostModel;
