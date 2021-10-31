
import React, {useEffect,useState} from 'react'

//Boostrap imports
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import TeamContext from '../contextTeam';
import {useContext} from 'react'


function Superhero(props){

    const { addMember,removeMember } = useContext(TeamContext);

    const [cardAppearence, setCardAppearence]=useState('')
    const [viewMore,setViewMore]=useState(false)
    const [inTeam,setInTeam]=useState(false)
    
    const handleOnClick=()=>{
        setInTeam(!inTeam)
        if(!inTeam){
            return  addMember(props.superhero)
        }else removeMember(props.superhero)
        // setInTeam(true)
        // let myTeam = JSON.parse(localStorage.getItem('superheroTeam'))
        // let newMember= props.superhero
        // let newTeam=myTeam.push(newMember)
        // localStorage.setItem('superheroTeam', JSON.stringify(myTeam));        
    }
    
    useEffect(() => {
        if (viewMore) {
            setCardAppearence(
                <Card.Body>
                    <ListGroup className="list-group-flush">
                    {listPower}
                    </ListGroup>
                    <ListGroup viewMore className="list-group-flush">
                        {listAppearence}
                    </ListGroup>
                </Card.Body>
            )
        }else setCardAppearence('')
        return cardAppearence
    }, [viewMore])

    const listPower=[]
    const powerstats= props.superhero.powerstats
    for (const power in powerstats) {
        listPower.push(
        <ListGroup.Item key={power}>
            <h5 className="mb-2">{power}</h5>
            <ProgressBar now={powerstats[power]==='null'? 0 : powerstats[power]} />
        </ListGroup.Item>)
    }
    const listAppearence=[]
    const appearence=props.superhero.appearance
    for (const item in appearence) {
        listAppearence.push(
            <ListGroup.Item key={item}>
                <h5 className=" text-capitalize mb-2 d-inline-block">{item}: {
                item=='height' || item=='weight'? appearence[item][1]: appearence[item]}</h5>
            </ListGroup.Item>)
    }
    
    return (
        <div className="m-3">
            <Card style={{ width: '18rem' }}>
                
                <Card.Header as="h3">{props.superhero.name}</Card.Header>
                <Card.Img variant="top" src={props.superhero.image.url} />
                <Button 
                    onClick={handleOnClick}
                    variant="primary"
                    className="my-1 btn btn-secondary">
                    {inTeam? ("Delete") : ("Add to my team")}
                </Button>
                {cardAppearence}
                <Button onClick={() => setViewMore(!viewMore)} variant="primary" className="my-1 btn btn-secondary">
                    {viewMore? ("View Less") : ("View More")}
                </Button>
                 
                    
               
            </Card>

        <style>{`
            .progress-bar{
                background-color:#000
            }
            .card-img-top {
                height: 15rem;
                object-fit: cover;
            }
        `}
        </style>
        </div>
    )
}

export default Superhero;