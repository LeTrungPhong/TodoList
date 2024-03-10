import './assets/App.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';

const { useState } = React;
const { useEffect } = React;

function App(courses){

    // <calendar>

    const dayOfWeek = ["Mo","Tu","We","Th","Fr","Sa","Su"];

    // <Date>

    const currentDate = new Date();

    // Lấy thông tin ngày, tháng và năm hiện tại
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    const currentYear = currentDate.getFullYear();


    const [monthYear,setMonthYear] = useState([currentMonth,currentYear]);
    const [day,setDay] = useState(() => {
        const arrDay = Array.from({length: 36});
        const startDay = new Date(monthYear[1],monthYear[0]-1,1).getDay() - 1;
        const numberOfMonth = new Date(monthYear[1],monthYear[0],0).getDate();

        let count = startDay;
        for(let i = 1; i <= numberOfMonth; ++i){
            arrDay[count] = i;
            ++count;
        }
        
        return arrDay;
    });


    function handleDay(my){
        setDay(() => {
            const arrDay = Array.from({length: 35});
            const startDay = new Date(my[1],my[0]-1,1).getDay() - 1;
            const numberOfMonth = new Date(my[1],my[0],0).getDate();

            let count = startDay;
            for(let i = 1; i <= numberOfMonth; ++i){
                arrDay[count] = i;
                ++count;
            }
            
            return arrDay;
        })
    }

    function handleBackMonthYear(){
        if(monthYear[0] == 1) {
            setMonthYear( prev => [12,prev[1] - 1]);
            handleMonth(12);
            handleYear(monthYear[1] - 1);
            handleDay([12,monthYear[1] - 1]);
        }
        else {
            setMonthYear( prev => [prev[0] - 1, prev[1]]);
            handleMonth(monthYear[0] - 1);
            handleYear(monthYear[1]);
            handleDay([monthYear[0] - 1,monthYear[1]]);
        }
    }

    function handleContinueMonthYear(){
        if(monthYear[0] == 12) {
            setMonthYear( prev => [1,prev[1] + 1]);
            handleMonth(1);
            handleYear(monthYear[1] + 1);
            handleDay([1,monthYear[1] + 1]);
        }
        else {
            setMonthYear( prev => [prev[0] + 1, prev[1]]);
            handleMonth(monthYear[0] + 1);
            handleYear(monthYear[1]);
            handleDay([monthYear[0] + 1,monthYear[1]]);
        }
    }

    function handleChoiceMonth(course){
        handleMonth(course);
        handleDay([course, monthYear[1]]);
    }

    function handleChoiceYear(course){
        handleYear(course);
        handleDay([monthYear[0],course]);
    }

    // </Date>

    // <Month>
        const arrMonth = [1,2,3,4,5,6,7,8,9,10,11,12];
        const [month,setMonth] = useState(() => {
            return monthYear[0];
        });

        const handleMonth = (course) => {
            setMonth(() => {
                return course;
            });
        }
    // </Month>

    // <Year>
        const arrYear = [];
        const [year,setYear] = useState(monthYear[1]);

        for(let i = 2000; i < 2031; ++i){
            arrYear.push(i);
        }

        const handleYear = (course) => {
            setYear(() => {
                return course;
            })
        }
    // <Year>

    // <Day>
        const [days,setDays] = useState(currentDay);

        function handleDays(course){
            if(course === undefined){
            } else {
                setDays(prev => course);
            }
        }
    // </Day>

    // </calendar>

    // <clock>
        const borders = Array.from({ length: 60 },(x,index) => {
            if(index % 5 === 0) return index/5 + 1;
        });
    // </clock>

    // add-table

        const [nameTable,setNameTable] = useState('');

        console.log(nameTable)

        const addTable = () => {
            const newItem = {
                id: `${Date.now().toString(36) + Math.random().toString(36).substring(2)}`,
                title: `${nameTable}`
            };
            fetch('http://localhost:3000/table', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newItem)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add item');
                }
                console.log('New item added successfully.');
            })
            .catch(error => {
                console.error('Error adding item:', error);
            });
            setNameTable('');
        }
    // /add-table

    return (
        <React.Fragment>
            <section className="block">

            </section>
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
            <section className="calendar dp-n">
                <div className="calendar__choice">
                    <button 
                        className="calendar__choice-back"
                        onClick={handleBackMonthYear}
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <div className="calendar__choice-month">
                        <input type="text" className="calendar__choice-month-input dp-n"/>
                        <div className="calendar__choice-month-value">
                            <div className="calendar__choice-month-value-button">{month}</div>
                        </div>
                        <div className="calendar__choice-month-list dp-n">
                            {
                                arrMonth.map((course) => {
                                    return (
                                        <button 
                                            className="calendar__choice-month-list-item"
                                            onClick={() => handleChoiceMonth(course)}
                                        >
                                            {course}
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="calendar__choice-year">
                        <input type="text" className="calendar__choice-year-input dp-n"/>
                        <div className="calendar__choice-year-value">
                            <div className="calendar__choice-year-value-button">{year}</div>
                        </div>
                        <div className="calendar__choice-year-list dp-n">
                            {
                                arrYear.map((course) => {
                                    return (
                                        <button 
                                            className="calendar__choice-year-list-item"
                                            onClick={() => handleChoiceYear(course)}
                                        >
                                            {course}
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <button 
                        className="calendar__choice-continue"
                        onClick={handleContinueMonthYear}
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div className="calendar__form">
                    <div className="calendar__form-dayOfWeek">
                        <React.Fragment>
                            {
                                dayOfWeek.map((course) => {
                                        return (
                                            <div className="calendar__form-dayOfWeek-item">{course}</div>
                                        )
                                    })
                            }
                        </React.Fragment>
                    </div>
                    <div className="calendar__form-day">
                        {
                            day.map((course) => {
                                return (
                                    <button 
                                        className="calendar__form-day-item"
                                        onClick={() => handleDays(course)}
                                    >
                                        {course}
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
            
            <section className="content__select dp-n">
                <div className="content__select-date">
                    <div className="content__select-date-form">
                        <p className="content__select-date-form-item">{days}</p>
                        /
                        <p className="content__select-date-form-item">{month}</p>
                        /
                        <p className="content__select-date-form-item">{year}</p>
                    </div>
                    <button className="content__select-date-button"><i className="fas fa-calendar-alt"></i></button>
                </div>
            </section>
            <div className="content-list-table">
                {
                    courses.APIcourse.map((course) => {
                        return (
                            <Table
                                id={course.id}
                                title={course.title}
                            />
                        );
                    })
                }
            </div>
            <section className="add-table-form">
                <div className="add-table">
                    <input 
                        value={nameTable}
                        type="text" className="add-table__input" id=""
                        onChange={e => setNameTable(e.target.value)}
                    />
                    <button 
                        className="add-table__button"
                        onClick={() => {addTable()}}
                    >
                    <i className="fas fa-plus add-table__button-img"></i> Add another list
                    </button>
                </div>
            </section>
        </React.Fragment>
    )
}

export default App;
