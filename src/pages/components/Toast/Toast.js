import React, { useEffect } from 'react'
import { chooseColor } from './toast_functions'
import { Spinner } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { setToast } from '@/pages/store/reducers/interactions'

const Toast = () => {
    const {message, loading, status} = useSelector(state => state.interactions.toast)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     setTimeout(() => {
    //         dispatch(setToast({show: false, message: '', status: '', loading: false}))
    //     }, 3000)
    // }, [message])

  return (
    <div className='absolute bottom-20 w-full my-5 '>
        <div className={`shadow-sm rounded-md mx-3 p-3 flex items-center flex-row  ${chooseColor(status)}`}>
            {loading &&
        <svg
    className={`animate-spin h-5 w-5 ${chooseColor(status)}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
>
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
</svg>}
            <p className={`${chooseColor(status)} text-wrap ml-3 ${loading ? 'w-3/4' : 'w-full'}`}>{message}</p>
        </div>
    </div>
  )
}

export default Toast