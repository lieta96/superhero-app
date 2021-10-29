import React from 'react'
import './Header.css';
import Superhero_1 from '../images/superhero_1.svg'
import Superhero_2 from '../images/superhero_2.svg'
import Superhero_3 from '../images/superhero_3.svg'
import Superhero_4 from '../images/superhero_4.svg'

export default function Header(){
    return (
    <>
        <div className="p-sm-5 p-3 d-flex justify-content-between masks-container">
            <img width={100} src={Superhero_1} alt="Superhero's mask icon"/>
            <img width={100} src={Superhero_2} alt="Superhero's mask icon"/>
            <img width={100} src={Superhero_3} alt="Superhero's mask icon"/>
            <img width={100} src={Superhero_4} alt="Superhero's mask icon"/>
        </div>
        <h1 className="text-uppercase text-light my-3">Superheroes</h1>
    </>)
}