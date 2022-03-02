import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TodoSchema = new Schema(
  {
    completed: { type: Boolean, required: true, default: false },
    description: { type: String, required: true },
    user: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
