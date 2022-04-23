import React, {useEffect }from 'react'
import '../styles/WinPopUp.css'

export default function WinPopUp({setWin, win, setGuessed, setSelectedPlayerList, generateRandomPlayer,}) {
  return (
    <div className='winpopup-box'>
      <div className='winpopup'>
        <h1>🎉HAI VINTO🎉</h1>
        <div className='restart' onClick={() => {setWin(false);setGuessed(0); setSelectedPlayerList([]); generateRandomPlayer();}}>Nuova Partita</div>
      </div>
    </div>
  )
}
