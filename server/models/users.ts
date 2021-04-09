import mongoose, { Document } from 'mongoose'

const Schema = mongoose.Schema

export interface IUser extends Document {
  username: string,
  password: string,
  todos: []
}

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
})

export default mongoose.model<IUser>('User', UserSchema)
