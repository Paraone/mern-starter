import React, { useEffect } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { Todo as TodoType } from 'Types'
import { loadTodo, finishTodo } from '@/actions/Todos'

interface TodoProps extends RouteComponentProps<any> {
  todo: TodoType,
  loadTodo: (_id: any) => any
  finishTodo: (_id: any) => any
}

const Todo: React.FunctionComponent<TodoProps> = ({ 
  loadTodo, 
  finishTodo, 
  match: { 
    params: { 
      todoId 
    } 
  },
  todo
}) => {
  const finish = () => finishTodo(todoId)

  useEffect(() => loadTodo(todoId), [])
  
  if (!todo) {
    return (
      <div className='container'><p>Loading</p></div>
    )
  }
  const { title, description, author } = todo

  return (
    <div className='container'>
      <Link to='/todos'>Back</Link>
      <h1>{title}</h1>
      <p>By {author}</p>
      <p>{description}</p>
      <button
        className='btn'
        onClick={finish}
      >
        Mark as done
      </button>
    </div>
  )
}

function mapStateToProps (state: any) {
  return {
    todo: state.todos.todo
  }
}

export default connect(mapStateToProps, { loadTodo, finishTodo })(Todo)
