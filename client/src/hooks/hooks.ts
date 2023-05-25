import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootStateT } from 'src/reducers/store'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>
export const useAppDispatch = () => useDispatch<TypedDispatch<RootStateT>>()
export const useAppSelector: TypedUseSelectorHook<RootStateT> = useSelector
