import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { auth } from '../_actions/user_action';

export default function(ComposedClass,option, adminRoute = null){
    function AuthenticationCheck(props){
     const user = useSelector(state => state.user);;
     const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then( async res=>{
                if(await !res.payload.isAuth){
                    //didn't login 
                    console.log(res)
                    if(option){
                        props.history.push('/login')
                    }
                }
                else{
                    //did login
                    if (adminRoute && !res.payload.isAdmin) {
                        //didn't admin 
                        props.history.push('/')
                    }
                    else {
                        //did login and option of componet was false you can't went to this component
                        if (option === false) {
                            props.history.push('/');
                        
                        }
                    }
                }
            })
           
        }, [dispatch, props.history])
        return (
            <ComposedClass {...props} user={user} />
        )
    }
    return AuthenticationCheck;
}