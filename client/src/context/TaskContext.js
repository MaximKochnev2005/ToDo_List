import { createContext, useReducer } from 'react'

export const TasksContext = createContext()

export const tasksReducer = (state, action) => {
	switch (action.type) {
		case 'SET_TASKS':
			return {
				tasks: action.payload
			}
		case 'CREATE_TASK':
			if (state.tasks.length < 3) {
				return {
					tasks: [...state.tasks, action.payload]
				}
			}
		default:
			return state
	}
}

export const TasksContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(tasksReducer, {
		tasks: null
	})

	return (
		<TasksContext.Provider value={{...state, dispatch}}>
			{ children }
		</TasksContext.Provider>
	)
}