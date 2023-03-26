import { Action } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import { configureStore, combineReducers  } from '@reduxjs/toolkit'
import authReducer from './authReducer'

const reducers = combineReducers({
  login: authReducer
})

export const store = configureStore({
  reducer: reducers,
  middleware: [thunk]
})

type RootReducerType = typeof reducers
export type RootStateType = ReturnType<RootReducerType>

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type ActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

export type ThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, RootStateType, unknown, A>
export type AppDispatch = typeof store.dispatch


export default reducers