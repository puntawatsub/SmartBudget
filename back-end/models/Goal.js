import mongoose from 'mongoose'

const goalSchema = mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  title: String,
  monthProgress: Number,
  monthTarget: Number,
  totalSaved: Number,
  totalTarget: Number,
})

export default mongoose.model('Goal', goalSchema)
