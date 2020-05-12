import React, { Fragment } from 'react'
import { Link, Route } from 'react-router-dom'
import { NotFound } from '../Errors'
import Training from './Training'

//export default props => {
//console.log(props) ||
export default ({match: { url }, match, trainings }) => 
    <Fragment>
        {/* <h2>Trainings in progress</h2> //to w pages*/}
        <ul>
            {trainings.map(({ id, name, excesises }) =>
                <li key={id}>
                    <Link to={`${url}/${id}`}>{name}</Link> {/* //{`${url}/${id}`} */}
                </li>
            )}
        </ul>

        <Route exact path={url} render = {
            () => <h3>Please select training</h3>
        } />
        <Route path={`${url}/:trainingId`} render={ 
            props => {
                const training = trainings.find(training => training.id === props.match.params.trainingId)
                console.log("trainingS", training)
                if(!training) { 
                    /*return <Redirect to="/404" /> //suprisingly it takes message from Error/404*/
                     return <NotFound />  
                }
                return <Training {...props} {...training}/>
            }
        } />
    </Fragment>



/*if(!training) {
        return <h3>Page not found, please select training</h3> 
    }  
    if(!training) { <Redirect to="/404" /> }
*/

//.trainings.find(training => training.id === props.match.params.id)
/* 
<Route path={`${url}/:trainingId`} render={ 
                ({match}) => <Training training = { trainings.find(training => training.id === match.params.trainingId) } match = {match}/>
        } />
*/

/* if(!training) {
                return <h3>Page not found, please select training</h3> 
            }  */
            /* <Redirect to="/404" /> */




//!!!!!!!!!!!!!!!!!//get trainings for trainings
    /* useEffect(asynch ) - https://www.robinwieruch.de/react-hooks-fetch-data
    const data = await (await fetch('http://www.andysekula.com/server/get_unique_trainings.php')).json()

    if (data.success === 1) {
      this.setState({
        trainings: data.trainings.reverse()
        }
        /* , () => {
          console.log("fetch this.state.trainings: ", this.state.trainings)
        } */
        /*)
    }
     */