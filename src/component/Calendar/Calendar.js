import './Calendar.css'
import React from 'react';
import ReactDOM from 'react-dom';

const { useState } = React;
const { useEffect } = React;

function Calendar(){
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
    
    return (
        <section className="calendar dp-n">
            <div className="calendar__choice">
                <button 
                    className="calendar__choice-back non-button"
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
                                        className="calendar__choice-month-list-item non-button"
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
                                        className="calendar__choice-year-list-item non-button"
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
                    className="calendar__choice-continue non-button"
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
                                    className="calendar__form-day-item non-button"
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
    )
}

export default Calendar;