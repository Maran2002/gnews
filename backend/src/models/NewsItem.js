import mongoose from 'mongoose'

const NewsItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: String,
    content: String,
    imageUrl: String,
    category: { type: String, required: true, index: true },
    source: {
      name: String,
      url: String,
    },
    publishedAt: { type: Date, required: true, index: true },
    link: { type: String, required: true },
    editorialNote: String,
    tldr: String,
    isCustom: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export const NewsItem = mongoose.model('NewsItem', NewsItemSchema)
