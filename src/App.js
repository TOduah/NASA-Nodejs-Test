import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {

  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [isloading, setIsLoading] = useState(false)

  const DEMO_KEY = 'facaW9vznPbhOla4DOt5hfkXqNb9flcRNjlvAIKV'  //your key here
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=${DEMO_KEY}` //CAN CHANGE: earth_date: input from website
  
  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);

      try {
          const res = await fetch(url);
          const json = await res.json();
          setResponse(json)
          setIsLoading(false)

      } catch (error){
        setError(error)

    }
  }
   fetchData();
  }, []) //watcher variables
  
  return (
    <div className="App">
      <div className="text-header">
        <h3>Photos from Curiosity Rover <span role="img" aria-label="Rocket"> 🚀 </span></h3>
      </div>
      <div className="body-container"> 
          { isloading ?
               <div>
                <img className="loader" src={'https://d2vrnm4zvhq6yi.cloudfront.net/assets/loader_puntos-df9857dfaf7eeb01c9cb2c2d1d208a8365ea4cdab85e1adeadaceff0c8f27964.gif'} alt="Loading..."/>
               </div>
            : response ? 
               Object.entries(response.photos).map(([key, values]) => {
                 return <div key={key} className="image-container">
                         <img key={key} className="image-rover" src={values.img_src} alt="image_from_rover"/>
                        </div>

            })
            :
            <p>{error}</p>

            

          }
      </div>
    </div>
  );
}

export default App;
