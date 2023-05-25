import { Action } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userReducer'
import postsReducer from './posts/postsReducer'

const reducers = combineReducers({
  user: userReducer,
  posts: postsReducer,
})

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

type RootReducerT = typeof reducers
export type RootStateT = ReturnType<RootReducerT>

type PropertiesT<T> = T extends { [key: string]: infer U } ? U : never
export type ActionT<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesT<T>>

export type ThunkT<A extends Action, R = Promise<void>> = ThunkAction<R, RootStateT, unknown, A>
export type AppDispatch = typeof store.dispatch
