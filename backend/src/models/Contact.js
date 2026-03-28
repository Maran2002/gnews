import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: String,
    phone: String,
    subject: String,
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export const Contact = mongoose.model('Contact', ContactSchema)
