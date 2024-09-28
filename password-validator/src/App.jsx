import { useState, useEffect} from 'react'
import './App.css'

function App() {

  const [isCorrect, setIsCorrect] = useState(false)
  const [password, setPassword] = useState('')

  let strongRegexPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,1600}$/;
  let minPasswordLength = 8
  const regex = new RegExp(strongRegexPattern)

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log(password)
      if (regex.test(password)) {
        setIsCorrect(true)
      } else {
        setIsCorrect(false)
      }
    }, 500)
    return () => clearTimeout(timeout)
  }, [password])

  return (
    <>
      <div className={"password-validator"}>
        <h1 className={"header"}>Checking Password Strength in ReactJS</h1>
        <form action="http://localhost/">
          <label htmlFor="password">Enter Password: </label>
          <input
            type="text"
            className={"input-password"}
            value={password}
            onChange={e => {
              setPassword(e.target.value)
              console.log(isCorrect)
            }}
          />
        </form>
        <div className={'result'}>
          {isCorrect === true ? (<p style={{ color: 'lightgreen'} }>{password} is Correct</p>) : (<p style={{ color: 'red' }}> {password} is not correct</p>)}
        </div>
      </div>
    </>
  )
}

export default App
