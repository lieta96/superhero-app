import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, {useEffect,useState,useContext} from 'react'
import axios from "axios";
import SuperheroCard from '../superheroCard/SuperheroCard'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as Yup from 'yup';
import TeamContext from '../contextTeam';


export default function SearchSuperheros (props) {

  const {addMember } = useContext(TeamContext);

  const [superheroResults, setSuperheroResults] =useState([])
  const [allResults,setAllResults]=useState([])
  
  useEffect(
    () => {      
      return setAllResults(superheroResults.map ((superhero)=>
      <SuperheroCard
        superhero={superhero}
        key={superhero.id}
        addToTheTeam={props.addToTheTeam}
      />))
    },
    [superheroResults],
  );

  const [errorMessageAPI, setErrorMessageAPI]=useState(null)
  function getSuperhero (value){
    let token= localStorage.getItem('token')
    // deberia usar el token dentro del url pero no me da acceso a la api, no veo el error
    //let url=`https://superheroapi.com/api.php/${token}/search/${value}`
    let url=`https://superheroapi.com/api.php/4895369843807603/search/${value}`
    axios.get(url).then((response) => {
      if (response.data.results){
        setSuperheroResults(response.data.results);
        setErrorMessageAPI(null)
      }else return setErrorMessageAPI('Enter a valid Superhero')
    })
  }

  return (
    <>
      <div xs={12} sm={8} className="container mx-sm-auto">
          <Formik
          initialValues={{
            newSuperhero: '',
          }}
          
          validationSchema={Yup.object({
            newSuperhero: Yup.string()
              .min(2, 'Too Short!')
              .max(15, 'Must be 15 characters or less')
              .required('Required')
          })}

          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              const value=values.newSuperhero
              getSuperhero(value)
              setSubmitting(false);
            }, 400);
          }}
        >
         
          <Form> 
            <Row className="justify-content-md-center">
              <Col xs={12} sm={8} md={6}>
                <label className="d-none" htmlFor="newSuperhero">First Name</label>
                <Field  name="newSuperhero"type="text" placeholder="Batman" className="form-control form-control-lg mb-3 "/>
                <ErrorMessage className="d-block text-light" name="newSuperhero" >
              { msg => <h6 className="text-light m-2">{msg}</h6> }
              </ErrorMessage>
              </Col>
              <Col sm={4} md={3}>
              <div className="d-grid">
                <Button size="lg" className="btn btn-secondary mt-xs-3" type="submit">Search</Button>
                </div>
              </Col>
              
            </Row> 
          </Form>
     
        </Formik>
        <h6 className="text-light m-2">{errorMessageAPI}</h6>

      </div>

      <div className="d-flex flex-wrap justify-content-center">
        {allResults}
      </div>
     


    </>

  );
};