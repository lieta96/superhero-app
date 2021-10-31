import React,{useContext} from 'react';
import { Formik, Form, useField,ErrorMessage,Field } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../components/footer/Footer'
import UserLoginContext from '../components/contextTeam';



export default function Login (){
    
    const {setUserLogin } = useContext(UserLoginContext);


    function getAPIToken (){
        let url=`http://challenge-react.alkemy.org/`
        axios.post(
            url,
            {
                email: "challenge@alkemy.org",
                password: "react"
            }
            ).then((response) => {
          if (response){
           console.log(response.data.token[0])
           localStorage.setItem('token', response.data.token)
          }else return console.log('error')
        })
      }

    return (
        <div className="login p-2 d-flex flex-column justify-content-center">
            <h1 className="font-weight-bold text-light is-uppercase mb-5">Login</h1>
            <div className="form-container mx-auto">
                 <Formik
                initialValues={{
                email: '',
                password:''
                }}
                validationSchema={Yup.object({
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                password: Yup.string()
                    .required('Required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    localStorage.setItem('user', values)
                    getAPIToken()
                    setUserLogin(false)
                    setSubmitting(false);
                    
                }, 400);
                }}
            >
                    <Form>
                        <Row>
                            <Col sm={3}>
                            <label className="text-left text-light" htmlFor="firstName"><h3>Email</h3></label>   
                            </Col>
                            <Col className="position-relative pb-3">
                                <Field name="email" placeholder="superhero@getyourteam.com" className="form-control form-control-lg mb-3" type="email" />
                                <ErrorMessage name="email">
                                    { msg => <h6 className="text-danger position-absolute" style={{ left:0,right:0 }}>{msg}</h6> }
                                </ErrorMessage>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col sm={3}>
                                <label className="text-left text-light" htmlFor="firstName"><h3>Password</h3></label>
                            </Col>
                            <Col className="position-relative pb-3">
                                <Field className="form-control form-control-lg mb-3" type="password" name="password" />
                                <ErrorMessage name="password">
                                    { msg => <h6 className="text-danger position-absolute" style={{ left:0,right:0 }}>{msg}</h6> }
                            </ErrorMessage>
                            </Col>
                            <div className="d-grid mt-3">
                            <Button variant="secondary" size="lg" className="btn" type="submit">Login</Button >
                            </div>
                        </Row>
                    </Form>
            </Formik>
            </div>
           <Footer/>
        </div>
    )
}
