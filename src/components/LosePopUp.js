import React, {useEffect }from 'react'
import '../styles/LosePopUp.css'

export default function LosePopUp({setWin, win, setGuessed, setSelectedPlayerList, generateRandomPlayer,RandomPlayerName}) {
  return (
    <div className='losepopup-box'>
      <div className='losepopup'>
        <h1>😢HAI PERSO😢</h1>
        <h3>Il giocatore era {RandomPlayerName}</h3>
        <div className='restart' onClick={() => {setWin(false); setGuessed(0); 
    setSelectedPlayerList([]); 
    generateRandomPlayer();}}>Nuova Partita</div>
      </div>
    </div>
  )
}
