import React from 'react'
import { useLocation } from 'react-router-dom'

function Page404() {
    let location = useLocation();
    return (
        <div>
            404. That's an error.
            The requested URL {location.pathname} was not found on this server. That's all we know    
        </div>
    )
}

export default Page404
