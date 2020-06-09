import React, { Fragment } from 'react'
import { Link, Route } from 'react-router-dom'
import { NotFound } from '../../Errors'
import Exercise from './Exercise'

export default ({ match: { url }, name, excesises, description }) =>  //training and match
//export default props =>  //training and match
//console.log("training props", props) 
//console.log("1-training excercises", url) ||
//becasue we get trainingId we need to create a class so we can fetch trainingId
<Fragment>
    {/* <h1> {props.training['name']} </h1> 
        * if link underfin -> ktoś wszedł z linka to przenieś go na stronę treining
        ? czyli dlaczego się nie robi cała aplikacja?*/}
    <h1>Name: {name}</h1>
    {/* <img scr={image} alt={name} style={{maxWidth:300}} />  //i image z bazy danych przekazany z argumentów*/}
    <p>
        {description ? `({description})` : <i>No description</i>}

    </p>
    
    <ul>
        {excesises.map(({ id, name }) => 
            <li>
               < Link to={`${url}/exercises/${id}`}>
                   {name}
               </Link>
            </li>
        )}
    </ul>

    <Route path={`${url}/exercises/:exerciseId`} render={
        props => {
            const exercise = excesises.find(({id}) => id === props.match.params.exerciseId)

            console.log("Training route excercise:", exercise)

            if(!exercise) {
                return <NotFound />
            }

            return <Exercise {...exercise} />
        }
    } />
</Fragment>
