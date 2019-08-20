/**
 * Contains all the types for models. Models can be refactored into individual folders when needed
 */

import { Document } from 'mongoose'

export interface User {
  _id: string
  password: string
  username: string
  comparePassword?: (candidatePassword: string, cb: any) => any
}

export interface Todo {
  _id: string
  author: string
  title: string
  description: string
}
