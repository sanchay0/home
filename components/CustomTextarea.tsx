import { useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { checkUserLoggedIn, login, useAuth } from '../utils/authHandler'

interface IProps {
    id: string;
    width: string;
    callback: (value: string, name: string) => void;
    value: string;
}

export default function MyTextarea({ id, width, callback, value }: IProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // 'comment as' state
  const currentUser: User = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [customName, setCustomName] = useState('')

  const toggleCommentAsDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleCommentAsChange = (option) => {
    if (option) {
      setSelectedOption(option)
      setIsOpen(false)
    }
  }

  useEffect(() => {
    checkUserLoggedIn(setIsLoggedIn)
    if (currentUser) {
      setSelectedOption(currentUser.displayName)
    }
  }, [currentUser])

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
      callback('', selectedOption)
    } else {
      callback(e.target.value, selectedOption)
    }
  }

  return (
    <div className={`relative ${width}`}>

      {isLoggedIn && (
        <button
          type="button"
          className="flex items-center px-3 py-2 rounded-md"
          onClick={toggleCommentAsDropdown}
        >
          Comment as: {selectedOption}
          <svg
            className={`w-4 h-4 ml-1 transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      )}
      {isLoggedIn && isOpen && (
        <div className="absolute z-10 w-40 mt-2 py-2 text-sm bg-white border rounded-md shadow">
          <button
            type="button"
            className="block px-4 py-2"
            onClick={() => handleCommentAsChange(currentUser.displayName)}
          >
            {currentUser.displayName}
          </button>
          <button
            type="button"
            className="block px-4 py-2"
            onClick={() => handleCommentAsChange('anonymous')}
          >
            Anonymous
          </button>
          <button
            type="button"
            className="block px-4 py-2"
            onClick={() => handleCommentAsChange(customName)}
          >
            Custom Name
          </button>
          <input
            type="text"
            className="block w-full px-4 py-2 border-t focus:outline-none border-gray-300"
            placeholder="Enter custom name"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
          />
        </div>
      )}

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
            </button> with your Google account (you can comment anonymously).
          </p>
        </div>
      )}
    </div>
  )
}