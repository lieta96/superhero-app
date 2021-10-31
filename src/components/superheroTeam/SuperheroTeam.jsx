//tengo que poder guardar en un array al equipo
// tengo que poder guardar el promedio de sus habilidades en distintas variables y que se actualicen cada vez que agrego a un miembro nuevo 

import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SuperheroTeamCard from './SuperheroTeamCards'
import {useContext,useState,useEffect} from 'react'
import TeamContext from '../contextTeam';

import './superheroTeam.css'
import { ListGroupItem } from 'react-bootstrap';

export default function SuperheroTeam (){

    const {team} = useContext(TeamContext);

    function checkNullValue(value){
        if ( value==='null') return 0
        else return parseFloat(value)
    }

    const intelligenceArray= team.map(superhero=>
        checkNullValue(superhero.powerstats.intelligence)    
    )
    const strengthArray= team.map(superhero=>checkNullValue(superhero.powerstats.strength))
    const speedArray= team.map(superhero=>checkNullValue(superhero.powerstats.speed))
    const durabilityArray= team.map(superhero=>checkNullValue(superhero.powerstats.durability))
    const powerArray= team.map(superhero=>checkNullValue(superhero.powerstats.power))
    const combatArray= team.map(superhero=>checkNullValue(superhero.powerstats.combat))

    const heightArray= team.map(superhero=>checkNullValue(parseInt(superhero.appearance.height[1])))
    const weightArray= team.map(superhero=>checkNullValue(parseInt(superhero.appearance.weight[1])))
    console.log(weightArray)

    let intelligenceTeam = 0;
    let strengthTeam = 0;
    let speedTeam = 0;
    let durabilityTeam = 0
    let powerTeam = 0;
    let combatTeam = 0;
    let heightTeam=0
    let weightTeam=0
    
    strengthArray.forEach (function(value){
        strengthTeam += value;
    });
    intelligenceArray.forEach (function(value){
        intelligenceTeam += value;
    });
    speedArray.forEach (function(value){
        speedTeam += value;
    });
    durabilityArray.forEach (function(value){
       durabilityTeam += value;
    });
    powerArray.forEach (function(value){
       powerTeam += value;
    });
    combatArray.forEach (function(value){
        combatTeam += value;
    });
    heightArray.forEach (function(value){
        heightTeam += value;
    });
    weightArray.forEach (function(value){
        weightTeam += value;
    });
    
    const teamPowerstats={
        intelligence:intelligenceTeam,
        strength:strengthTeam,
        speed:speedTeam,
        durability:durabilityTeam,
        power:powerTeam,
        combat:combatTeam,
    }

    const teamAppearance={
        height: heightTeam,
        weight:weightTeam
    }

    const listPower=[]
    //Ordenamos de mayor a menor los valores de cada poder
    let teamPowerStatsValues=Object.values(teamPowerstats) 
    teamPowerStatsValues=teamPowerStatsValues.sort(function(a, b) {
        return a - b;
      }
    )
    teamPowerStatsValues=teamPowerStatsValues.reverse()
    const highValuePower= teamPowerStatsValues[0]
    const highKeyPower= Object.keys(teamPowerstats).find(key => teamPowerstats[key] === highValuePower);

    for (const power in teamPowerstats){
        if(power==highKeyPower){
        }else
        listPower.push(
            <ListGroup.Item key={power}>
                <h5 className="mb-2">{power}:
                    {team.length>0? parseInt(teamPowerstats[power]/team.length):
                    0
                    }
                </h5>
            </ListGroup.Item>
        )    
    }

    const listAppearance=[]
    for (const appearance in teamAppearance){
        listAppearance.push(
            <ListGroup.Item key={appearance}>
                <h5 className="mb-2">{appearance}:
                    {team.length>0? parseInt(teamAppearance[appearance]/team.length):
                    0
                    }
                </h5>
            </ListGroup.Item>
        )    
    }


    const teamGallery=[]
    team.forEach(
        (superhero)=>teamGallery.push(<SuperheroTeamCard superhero={superhero} key={superhero.id}/>))
    // for (const superhero in team){
    //     console.log(superhero)
    //     teamGallery.push(<SuperheroTeamCard superhero={superhero} key={superhero.id}/>)
    // }
    // if (team.length>0){
    //     teamGallery= team.map(superhero=>
    //         <SuperheroTeamCard superhero={superhero} key={superhero.id}/>)
    // }else return teamGallery
    
    return(
        <div className="mb-5">
            <h1 className="text-uppercase text-light my-5">Superheroes Team</h1>
            <Container className="pb-5">
                <Row className="d-flex mt-3">
                    <Col xs={12} sm={4} md={3}className="auto px-5 px-sm-0">
                        <ListGroup>
                            <ListGroupItem><h4 className="mb-2">Power</h4></ListGroupItem>
                            <ListGroup.Item key={highKeyPower}>
                                <h5 className="mb-2">{highKeyPower}:
                                    {team.length>0? parseInt(teamPowerstats[highKeyPower]/team.length):
                                    0
                                    }
                                </h5>
                                
                            </ListGroup.Item>
                            {listPower}
                        </ListGroup>
                        <ListGroup>
                        <ListGroupItem><h4 className="mb-2">Appearance</h4></ListGroupItem>
                            {listAppearance}
                        </ListGroup>
                    </Col>
                    <Col xs={12} sm={8} md={9}>
                        <div className="d-flex flex-wrap justify-content-center">
                            {teamGallery}
                        </div>
                    </Col>

                </Row>
                </Container>
            
            {/* FUNCOINA EL MAP DEL TEAM IMPRIMIENDO LA INFO EN ESTE COMPONENTE, PERO NO FUNCIONA LA PASAR LA INFO A OTRO COMPONENTE
            {
                team.map(superhero=><h5>{superhero.name}</h5>)
            } */}
            
            <div>
            
            </div>
        </div>
    )
}