import React, { useEffect, useState, useContext } from "react";
import TeamContext from "../contextTeam";

//Boostrap
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";

function Superhero(props) {
  const { addMember, removeMember } = useContext(TeamContext);

  const [cardAppearence, setCardAppearence] = useState("");
  const [viewMore, setViewMore] = useState(false);
  const [inTeam, setInTeam] = useState(false);

  const handleOnClick = () => {
    setInTeam(!inTeam);
    if (!inTeam) {
      return addMember(props.superhero);
    } else removeMember(props.superhero);
  };

  useEffect(() => {
    if (viewMore) {
      setCardAppearence(
        <Card.Body>
          <ListGroup className="list-group-flush">{listPower}</ListGroup>
        </Card.Body>
      );
    } else setCardAppearence("");
    return cardAppearence;
  }, [viewMore]);

  const listPower = [];
  const powerstats = props.superhero.powerstats;
  for (const power in powerstats) {
    listPower.push(
      <ListGroup.Item key={power}>
        <h5 className="mb-2">{power}</h5>
        <ProgressBar
          now={powerstats[power] === "null" ? 0 : powerstats[power]}
        />
      </ListGroup.Item>
    );
  }

  return (
    <div className="m-3">
      <Card style={{ width: "18rem" }}>
        <Card.Header as="h3">{props.superhero.name}</Card.Header>
        <Card.Img variant="top" src={props.superhero.image.url} />
        <Button
          onClick={handleOnClick}
          variant="primary"
          className="my-1 btn btn-secondary"
        >
          {inTeam ? "Delete" : "Add to my team"}
        </Button>
        {cardAppearence}
        <Button
          onClick={() => setViewMore(!viewMore)}
          variant="primary"
          className="my-1 btn btn-secondary"
        >
          {viewMore ? "View Less" : "View More"}
        </Button>
      </Card>

      <style>
        {`
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
  );
}

export default Superhero;
