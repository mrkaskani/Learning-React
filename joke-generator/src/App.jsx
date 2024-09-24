import {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css'


function App() {
    let url = 'https://sv443.net/jokeapi/v2/joke/Programming?type=single'
    const {joke, isLoading, isError, fetchData} = useFetch(url)



  function clearText(){
    if (joke === "") return;
    if ( typeof joke['joke'] === "undefined") return;
    return joke['joke'].toString();
  }

  return (
    <>
      <div className={"joke-title-div"}>
        <h2 className={'joke-title'}>Joke Generator Using React and Joke API</h2>
        <button onClick={fetchData} className={'button'}>Click to generate a joke</button>
        {
          isLoading ? <p className='joke'>Loading...</p> : <p className='joke'>{clearText()}</p>}
      </div>
    </>

  )
}

function useFetch(url){
  const [joke, setJoke] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(true)

  const fetchData = () => {
    const source = axios.CancelToken.source();
    axios.get(url, {cancelToken: source.token})
      .then(res => {
        setJoke(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        setIsError(true)
        console.log(err)
      })
    return () => source.cancel


  }

  return {joke, isLoading, isError, fetchData}
}

export default App
