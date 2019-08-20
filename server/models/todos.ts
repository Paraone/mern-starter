import mongoose from 'mongoose'

export interface ITodo extends mongoose.Document {
  author: string,
  title: string,
  description: string,
  timestamps: boolean
}

const TodoSchema = new mongoose.Schema({
  author: {
    type: String,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
},                                     {
  timestamps: true
})

const Todo = mongoose.model<ITodo>('Todo', TodoSchema)

export default Todo
