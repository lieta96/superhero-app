//tengo que poder guardar en un array al equipo
// tengo que poder guardar el promedio de sus habilidades en distintas variables y que se actualicen cada vez que agrego a un miembro nuevo 

import ListGroup from 'react-bootstrap/ListGroup';
import {useState} from 'react'

export default function SuperheroTeam ({team}){

    const [teamPowerstats,setTeamPowerstats]=useState({
        intelligence:0,
        strength:0,
        speed:0,
        durability:0,
        power:0,
        combat:0,
    })
    
    const powerstats=Object.keys(teamPowerstats)
    console.log(team)
     

    // setTeamPowerstats(
    //     powerstats.map( powerstat=> {
            
    //         team.map(superhero=>superhero.powerstats.powerstat)}
    //     )
    // )

    

    return(
        <>
            <div>
            <ListGroup>
                
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>   
            </div>
        </>
    )
}