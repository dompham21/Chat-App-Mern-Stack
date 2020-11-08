import React from 'react'
import './LoadingListUser.css';

function LoadingListUser(props) {
    const { count } = props;
    let item = [1,2,3,4]
    return (
        <>
            {
                item.map(i=>{
                    return (
                        <div class="skeleton" >
                            <div class="skeleton-avatar"></div>
                            <div class="tweet-content">
                                <div class="tweet-header">
                                    <div class="skeleton-line heading" style={{width:"60%"}}></div>
                                </div>
                                <div class="tweet-text">
                                    <div class="skeleton-line" style={{width:"90%"}}></div>
                                    <div class="skeleton-line" style={{width:"1000%"}}></div>
                                    <div class="skeleton-line" style={{width:"30%"}}></div>
                                </div>
                            </div> 
                        </div>
                    )
                })
            }
        </>
        
)}

export default LoadingListUser
