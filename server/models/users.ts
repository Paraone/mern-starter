import bcrypt from 'bcrypt-nodejs'
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

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', (next) => {
  const user: any = this
  const SALT_FACTOR = 5

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

// Method to compare password for login
UserSchema.methods.comparePassword = (candidatePassword: string, cb: any) => {
  // tslint:disable-next-line
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return cb(err) }

    cb(null, isMatch)
  })
}

export default mongoose.model<IUser>('User', UserSchema)
