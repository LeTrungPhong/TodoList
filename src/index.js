import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

fetch("http://localhost:3000/table")
        .then((res) => res.json())
        .then(function (courses) {
            ReactDOM.render(
                <React.StrictMode>
                  <App 
                    APIcourse={courses} 
                  />
                </React.StrictMode>,
                document.querySelector(".container")
            );
        });

reportWebVitals();
