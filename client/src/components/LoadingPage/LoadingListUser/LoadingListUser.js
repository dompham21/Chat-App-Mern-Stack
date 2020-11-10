import React from 'react'
import './LoadingListUser.css';

function LoadingListUser() {
    let item = [1,2,3,4]
    return (
        <>
            {
                item.map(i=>{
                    return (
                        <div className="skeleton" key={i}>
                            <div className="skeleton-avatar"></div>
                            <div className="tweet-content">
                                <div className="tweet-header">
                                    <div className="skeleton-line heading" style={{width:"60%"}}></div>
                                </div>
                                <div className="tweet-text">
                                    <div className="skeleton-line" style={{width:"90%"}}></div>
                                    <div className="skeleton-line" style={{width:"1000%"}}></div>
                                    <div className="skeleton-line" style={{width:"30%"}}></div>
                                </div>
                            </div> 
                        </div>
                    )
                })
            }
        </>
        
)}

export default LoadingListUser
