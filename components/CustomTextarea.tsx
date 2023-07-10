import { useEffect, useState } from 'react'
import { checkUserLoggedIn, login } from '../utils/authHandler';

interface IProps {
    id: string;
    width: string;
    callback: (value: string) => void;
    value: string;
}

export default function MyTextarea({ id, width, callback, value }: IProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    checkUserLoggedIn(setIsLoggedIn)
  }, [])

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleLogin = async () => {
    await login()
  }

  const handleChange = (e) => {
    if (!isLoggedIn) {
      e.preventDefault()
      callback('')
    } else {
      callback(e.target.value)
    }
  }

  return (
    <div className={`relative ${width}`}>
      <textarea
        id={id}
        rows={1}
        className={`overlay-textarea focus:outline-none ${
          !isLoggedIn && isFocused ? 'pointer-events-none' : ''
        } font-light resize-none block w-full p-2.5 border-b border-white focus:border-gray-600 mt-2 placeholder-gray-400`}
        placeholder="Write a comment"
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange} />
      {!isLoggedIn && isFocused && (
        <div className="overlay absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
          <p className="text-center">
            To avoid spam, please <button
                type="button"
                className="font-normal text-black items-center text-sm duration-200 hover:no-underline underline"
                // onClick here won't fire since OnBlur has precedence in event order
                onMouseDown={handleLogin}
            >
                login
            </button> with your google account.
          </p>
        </div>
      )}
    </div>
  )
}