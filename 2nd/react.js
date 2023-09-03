import React, {useEffect, useState} from 'react'
import axios from 'axios'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Train Schedule App</h1>
      </header>
      <main>
        <Trains />
      </main>
    </div>
  )
}

function Trains() {
  const [trains, setTrains] = useState([])

  useEffect(() => {
    // Simulated API call to fetch train data (replace with actual API endpoint)
    axios
      .get('http://20.244.56.144/train/all')
      .then((response) => {
        setTrains(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  return (
    <div>
      <h2>All Trains</h2>
      <ul>
        {trains.map((train) => (
          <li key={train.trainNumber}>
            <a href={`/train/${train.trainNumber}`}>{train.trainName}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TrainDetail({match}) {
  const trainNumber = match.params.trainNumber
  const [train, setTrain] = useState(null)

  useEffect(() => {
    // Simulated API call to fetch train details (replace with actual API endpoint)
    axios
      .get(`http://20.244.56.144/train/trains/${trainNumber}`)
      .then((response) => {
        setTrain(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [trainNumber])

  if (!train) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Train Details</h2>
      <h3>{train.trainName}</h3>
      <p>Train Number: {train.trainNumber}</p>
      <p>
        Departure Time: {train.departureTime.Hours}:
        {train.departureTime.Minutes}
      </p>
      <p>Seats Available (Sleeper): {train.seatsAvailable.sleeper}</p>
      <p>Seats Available (AC): {train.seatsAvailable.AC}</p>
      <p>Price (Sleeper): {train.price.sleeper}</p>
      <p>Price (AC): {train.price.AC}</p>
      <p>Delay: {train.delayedBy} minutes</p>
    </div>
  )
}

export default App
