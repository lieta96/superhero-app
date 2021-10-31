import './style.css';
import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchSuperheroes from '../components/search/SearchSuperheros'
import Button from 'react-bootstrap/Button';
import SuperheroTeam from '../components/superheroTeam/SuperheroTeam'
import Header from '../components/Header'
import TeamContext from '../components/contextTeam';
import { array } from 'yup/lib/locale';
import SuperheroTeamCards from '../components/superheroTeam/SuperheroTeamCards';
import Footer from '../components/footer/Footer'


export default function Home() {
  const [team, setTeam]=useState([])
  let goodTotal;
  let badTotal
  
  function goodSuperheroesTotal(){
    let goodSuperheroArray= team.filter(superhero=>superhero.biography.alignment=='good')
    goodTotal=goodSuperheroArray.length
    return goodTotal
  }

  function badSuperheroesTotal(){
    let badSuperheroArray= team.filter(superhero=>superhero.biography.alignment=='bad')
    badTotal=badSuperheroArray.length
    return badTotal
  }

  const [completeMessage,setCompleteMessage]=useState('')

  function checkInTeam(superhero){
    if(team.includes(superhero)) setCompleteMessage('You already have this superhero in you team')
    else return superhero 
  }


  function addMember(newSuperhero){
    
    if(team.length>5) setCompleteMessage('Your team is complete!')
    else {
      if(team.some(superhero=>superhero.id==newSuperhero.id)) return setCompleteMessage(`${newSuperhero.name} is in your team!`)      
      else{
        if(newSuperhero.biography.alignment=='good'){
          goodSuperheroesTotal()
          if(goodTotal>2) setCompleteMessage("there's enough good superheroes")
          else setTeam(team=>[...team,newSuperhero])
        }else if (newSuperhero.biography.alignment=='bad') {
          badSuperheroesTotal()
          if(badTotal>2) setCompleteMessage("there's enough good superheroes")
          else setTeam(team=>[...team,newSuperhero])
        }else setTeam(team=>[...team,newSuperhero])
      return team}
    }
  }

  function removeMember(deleteSuperhero){
    setCompleteMessage('')
    setTeam(team.filter(superhero=>superhero.id!==deleteSuperhero.id))
    return team
  }

  const [viewTeam,setViewTem]=useState(false)

  function handleOnClick(){
    setViewTem(!viewTeam)
    setCompleteMessage('')
  }
  return (
    <div className="App pb-5">

      <TeamContext.Provider value={{ team,setTeam, addMember,removeMember}}>
         <Button 
         variant="dark"
         className="mt-5 float-right "
         onClick={handleOnClick}>
           {!viewTeam? 'View Team': 'Return'} 
          </Button>

         {!viewTeam?
          <div className="pb-5">
            <Header/>   
            <h4 className="text-light">{completeMessage}</h4>
            <SearchSuperheroes/> 
          </div>   
          :
          <SuperheroTeam/>
         }
      </TeamContext.Provider>
      <Footer/>
    </div>

  );
}
