import { Formik, Form, Field, useField,ErrorMessage } from 'formik';
import React, {useEffect,useState} from 'react'
import axios from "axios";
import SuperheroCard from '../superheroCard/SuperheroCard'
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';

export default function SearchSuperheros (props) {

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
    let url=`https://superheroapi.com/api/4895369843807603/search/${value}`
    axios.get(url).then((response) => {
      if (response.data.results){
        setSuperheroResults(response.data.results);
        setErrorMessageAPI(null)
      }else return setErrorMessageAPI('Enter a valid Superhero')
    })
  }

  return (
    <>
      <div className="col-8 mx-auto">
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
            <label className="d-none" htmlFor="newSuperhero">First Name</label>
            <Field  name="newSuperhero"type="text" placeholder="Batman" className="form-control form-control-lg"/>
            <ErrorMessage className="d-block text-light" name="newSuperhero" >
              { msg => <h6 className="text-light m-2">{msg}</h6> }
            </ErrorMessage>
            <Button className="btn btn-secondary btn-lg m-3" type="submit">Search</Button>
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