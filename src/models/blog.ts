import mongoose, { Document, Schema } from "mongoose";

export interface IBlog extends Document {
  title: string;
  author: string;
  content: string;
  category: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [10, "Content must be at least 10 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["Technology", "Lifestyle", "Programming", "Design", "Other"],
        message: "{VALUE} is not a supported category",
      },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
blogSchema.index({ userId: 1, createdAt: -1 });
blogSchema.index({ category: 1 });

export default mongoose.model<IBlog>("Blog", blogSchema);
