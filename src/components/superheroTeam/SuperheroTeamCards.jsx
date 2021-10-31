import React, {useEffect,useState,useContext} from 'react'
import TeamContext from '../contextTeam';

//Boostrap imports
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';


function SuperheroTeamCards(props){

    const {removeMember} = useContext(TeamContext);
    const [cardAppearence, setCardAppearence]=useState('')
    const [viewMore,setViewMore]=useState(false)
    
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

    //mismo código, armar función!
    const listPower=[]
    const powerstats= props.superhero.powerstats
    for (const power in powerstats) {
        listPower.push(
        <ListGroup.Item key={power}>
            <h6 className="mb-2">{power}: {powerstats[power]}</h6>    
        </ListGroup.Item>)
    }

    const listAppearence=[]
    const appearence=props.superhero.appearance
    for (const item in appearence) {
        listAppearence.push(
            <ListGroup.Item key={item}>
                <h6 className=" text-capitalize mb-2 d-inline-block">{item}: {appearence[item]}</h6>
            </ListGroup.Item>)
    }
    return (
        <div className="m-3 superhero-team-card">
            <Card style={{ width: '11rem' }}>
                
                <Card.Header as="h5">{props.superhero.name}</Card.Header>
                <Card.Img variant="top" src={props.superhero.image.url} />
                {cardAppearence}
                <Button onClick={() => setViewMore(!viewMore)} variant="primary" className="my-1 btn btn-secondary">
                    {viewMore? ("View Less") : ("View More")}
                </Button>
                
                <Button 
                    onClick={()=>removeMember(props.superhero)}
                    variant="primary"
                    className="my-1 btn btn-secondary">
                    Delete
                </Button>
               
            </Card>
        
        <style>{`
            .progress-bar{
                background-color:#000
            }
            .superhero-team-card .card-img-top {
                height: 10rem;
                object-fit: cover;
            }
        `}
        </style>
        </div>
    )
    
}

export default SuperheroTeamCards;