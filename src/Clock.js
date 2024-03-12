import React from 'react';
import ReactDOM from 'react-dom';

const { useState } = React;
const { useEffect } = React;

function Clock(){

    // <clock>
    const borders = Array.from({ length: 60 },(x,index) => {
        if(index % 5 === 0) return index/5 + 1;
    });
    // </clock>

    return (
        <section className="clock dp-n">
            <div className="clock__border">
                <React.Fragment>
                    {
                        borders.map((index) => {
                            return (
                                <React.Fragment>
                                    <div className="clock__border-block">
                                        <div className="clock__border-block-item"></div>
                                    </div>
                                </React.Fragment>        
                            )
                        })
                    }
                </React.Fragment>
            </div>
            <div className="clock__number">
                <React.Fragment>
                    {
                        borders.map((index) => {
                            return (
                                <React.Fragment>
                                    <div className="clock__number-block">
                                        <div className="clock__number-block-item">{index}</div>
                                    </div>
                                </React.Fragment>        
                            )
                        })
                    }
                </React.Fragment>
            </div>
            <div className="clock__second">
                <div className="clock__second-stick"></div>
            </div>
            <div className="clock__minute">
                <div className="clock__minute-stick"></div>
            </div>
            <div className="clock__hour">
                <div className="clock__hour-stick"></div>
            </div>
            <i className="fas fa-circle clock__dot"></i>
        </section>
    )
}

export default Clock;