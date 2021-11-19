import SuperheroTeamCard from "./SuperheroTeamCards";
import "./superheroTeam.css";
import { getTotal,orderValues} from "../../services/teamFunctions";

//Context
import { useContext } from "react";
import TeamContext from "../contextTeam";

//Bostrap
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ListGroupItem } from "react-bootstrap";

export default function SuperheroTeam() {
  const { team } = useContext(TeamContext);

  let weightTeam = getTotal("weight", team);
  let heightTeam = getTotal("height", team);
  let combatTeam = getTotal("combat", team);
  let powerTeam = getTotal("power", team);
  let durabilityTeam = getTotal("durability", team);
  let speedTeam = getTotal("speed", team);
  let intelligenceTeam = getTotal("intelligence", team);
  let strengthTeam = getTotal("strength", team);

  const teamPowerstats = {
    intelligence: intelligenceTeam,
    strength: strengthTeam,
    speed: speedTeam,
    durability: durabilityTeam,
    power: powerTeam,
    combat: combatTeam,
  };

  const teamAppearance = {
    height: heightTeam ,
    weight: weightTeam ,
  };

  let teamPowerStatsValues=orderValues(teamPowerstats)
  
  // Definimos el valor y el key del poder más alto
  const highValuePower = teamPowerStatsValues[0];
  const highKeyPower = Object.keys(teamPowerstats).find(
    (key) => teamPowerstats[key] === highValuePower
  );

  const listPower = [];
  for (const power in teamPowerstats) {
    if (power == highKeyPower) {
    } else
      listPower.push(
        <ListGroup.Item key={power}>
          <h5 className="mb-2">
            {power}:{team.length > 0 ? parseInt(teamPowerstats[power]) : 0}
          </h5>
        </ListGroup.Item>
      );
  }

  const listAppearance = [];
  for (const appearance in teamAppearance) {
    listAppearance.push(
      <ListGroup.Item key={appearance}>
        <h5 className="mb-2">
          {appearance}:
          {team.length > 0 ? parseInt(teamAppearance[appearance]) : 0}
        </h5>
      </ListGroup.Item>
    );
  }

  const teamGallery = [];
  team.forEach((superhero) =>
    teamGallery.push(
      <SuperheroTeamCard superhero={superhero} key={superhero.id} />
    )
  );

  return (
    <div className="mb-5">
      <h1 className="text-uppercase text-light my-5">Superheroes Team</h1>
      <Container className="pb-5">
        <Row className="d-flex mt-3">
          <Col xs={12} sm={4} md={3} className="auto px-5 px-sm-0">
            <ListGroup>
              <ListGroupItem>
                <h4 className="mb-2">Power</h4>
              </ListGroupItem>
              <ListGroup.Item key={highKeyPower}>
                <h5 className="mb-2">
                  {highKeyPower}:
                  {team.length > 0 ? parseInt(teamPowerstats[highKeyPower]) : 0}
                </h5>
              </ListGroup.Item>
              {listPower}
            </ListGroup>
            <ListGroup>
              <ListGroupItem>
                <h4 className="mb-2">Appearance</h4>
              </ListGroupItem>
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
    </div>
  );
}
