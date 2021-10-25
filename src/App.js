import './App.css';
import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchSuperheroes from './components/search/SearchSuperheros'
import Button from 'react-bootstrap/Button';
import SuperheroTeam from './components/superheroTeam/SuperheroTeam'
import Header from './components/Header'

export default function App() {
  
  const [superheroTeam,setSuperheroTeam]=useState([])
  const [teamMember,setTeamMeberw]=useState(null)

  const showTeam=()=>{
    setSuperheroTeam(localStorage.setItem('myTeam', JSON.stringify(superheroTeam))  
    )  
  }

  
  return (
    <div className="App">
     
      <Header/>   
        
      <SearchSuperheroes  />
      <Button onClick={showTeam}>View Team</Button>
      <SuperheroTeam team={superheroTeam}/>
    </div>
  );
}
