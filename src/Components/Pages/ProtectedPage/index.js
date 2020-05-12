import React, { useContext } from 'react'
import { UserContext } from '../../Utilities/UserContext'

export default () => {
const { user } = useContext(UserContext)  
return <div><h2>Protected page.</h2>
        <p>Your secret details.</p>
        <pre>{JSON.stringify(user, null, 2)}</pre></div>
        }