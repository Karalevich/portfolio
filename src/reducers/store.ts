import { Action } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userReducer'

const reducers = combineReducers({
  user: userReducer,
})

export const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
})

type RootReducerT = typeof reducers
export type RootStateT = ReturnType<RootReducerT>

type PropertiesT<T> = T extends { [key: string]: infer U } ? U : never
export type ActionT<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesT<T>>

export type ThunkT<A extends Action, R = Promise<void>> = ThunkAction<R, RootStateT, unknown, A>
export type AppDispatch = typeof store.dispatch
