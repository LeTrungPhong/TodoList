import './assets/App.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table/Table';
import Clock from './Clock/Clock';
import Calendar from './Calendar/Calendar';
import NavBar from './NavBar';
import Header from './Header/Header';
import Sign from './Sign/Sign';
import Board from './Board/Board';

const { useState } = React;
const { useEffect } = React;

function App(){
    
    // add-table
    const [nameTable,setNameTable] = useState('');

    const addTable = () => {
        if(nameTable === ""){
            alert("Khong duoc de trong ten bang !");
            return;
        }

        const newItem = {
            id: `${Date.now().toString(36) + Math.random().toString(36).substring(2)}`,
            title: `${nameTable}`,
            idBoard: `${arrBoard[localStorage.getItem('index')].id}`
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

    // navBar
    const [hidden, setHidden] = useState(true);

    function clickHidden(){
        setHidden(prev => prev?false:true);
    }

    const [arrBoard, setArrBoard] = useState([]);
    const [table,setTable] = useState([]);

    const [show,setShow] = useState(false);

    useEffect(() => {
        let arrayBoard = [];
        fetch("http://localhost:3000/board")
        .then((res) => res.json())
        .then(function(courses) {
            if(!localStorage.getItem('indexCommunity')){
                localStorage.setItem('indexCommunity',0);
            }
            if(localStorage.getItem('indexCommunity') == 0){
                for(let i = 0; i < courses.length; ++i){
                    if(courses[i].accessModifier === 'public'){
                        arrayBoard.push(courses[i]);
                    }
                }
            } else {
                for(let i = 0; i < courses.length; ++i){
                    if(localStorage.getItem('idUser') === courses[i].idUser){
                        arrayBoard.push(courses[i]);
                    }
                }
            }
            setArrBoard(arrayBoard);

            let arrayTable = [];
            fetch("http://localhost:3000/table")
                .then((res) => res.json())
                .then(function (courses) {
                    
                    if(!localStorage.getItem('index')){
                        localStorage.setItem('index',0);
                    }
                    if(!arrayBoard[localStorage.getItem("index")]){
                        localStorage.setItem('index',0);
                    }
                    if(arrayBoard.length != 0){
                        for(let i = 0; i < courses.length; ++i){
                            if(courses[i].idBoard === arrayBoard[localStorage.getItem("index")].id){
                                arrayTable.push(courses[i]);
                            }
                        }
                    }
                    setTable(arrayTable);
                    console.log(localStorage.getItem('idUser') + " " + arrayBoard[localStorage.getItem('index')].idUser);
                    if(localStorage.getItem('idUser') === arrayBoard[localStorage.getItem('index')].idUser){
                        setShow(true);
                    } else {
                        setShow(false);
                    }

                });
        });
    }, []);

    const [nameBoard, setNameBoard] = useState('');

    const addBoard = () => {
        const newItem = {
            id: `${Date.now().toString(36) + Math.random().toString(36).substring(2)}`,
            title: `${nameBoard}`,
            idUser: `${localStorage.getItem('idUser')}`,
            accessModifier: "private"
        };
        if(!localStorage.getItem('idUser')) return;
        fetch('http://localhost:3000/board', {
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
        setNameBoard('');
    };

    const clickCommunity = () => {
        localStorage.setItem('indexCommunity',0);
    }

    const clickYourSelf = () => {
        localStorage.setItem('indexCommunity',1);
    }
    // /navBar

    //
    var navBoardListItem = document.getElementsByClassName('navBar__board-list-item');

    if(navBoardListItem[localStorage.getItem('index')]){
        navBoardListItem[localStorage.getItem('index')].style.backgroundColor = '#9c9c9c';
    }

    var navBarCommunity = document.getElementsByClassName('navBar__community-button'); 

    console.log(navBarCommunity);
    for(let i = 0; i < navBarCommunity.length; ++i){
        if(localStorage.getItem('indexCommunity') == 0){
            navBarCommunity[0].style.backgroundColor = '#9c9c9c';
        } else {
            navBarCommunity[1].style.backgroundColor = '#9c9c9c';
        }
    }
    //

    return (
        <React.Fragment>
            <section className='loading'><i class="fas fa-spinner loading__img"></i></section>
            <Clock/>
            <Calendar/>
            <Header
                id = {localStorage.getItem('idUser')}
                name = {localStorage.getItem('nameUser')}
            />
            <Sign/>
            <section className='navBar check'>
                <button 
                    className='navBar__hidden non-button'
                    onClick={() => clickHidden()}
                >
                    <i class="fas fa-angle-right navBar__hidden-item dp-n"></i>
                    <i class="fas fa-angle-left navBar__hidden-item"></i>
                </button>
                <section className='navBar__community'>
                    <div className='navBar__community-title'><p className={`navBar__community-title-text ${hidden ? "" : "dp-n"}`}>Community</p></div>
                    <button 
                        className='navBar__community-button'
                        onClick={() => clickCommunity()}
                    >
                        <i class="fas fa-globe navBar__community-button-img"></i><p className={`navBar__community-button-text ${hidden ? "" : "dp-n"}`}>Public board</p>
                    </button>
                    <button 
                        className='navBar__community-button'
                        onClick={() => clickYourSelf()}
                    >
                        <i class="far fa-user navBar__community-button-img"></i><p className={`navBar__community-button-text ${hidden ? "" : "dp-n"}`}>Your board</p>
                    </button>
                </section>
                <section className='navBar__tool'>
                    <div className='navBar__tool-title'><p className={`navBar__tool-title-text ${hidden ? "" : "dp-n"}`}>Your tools</p></div>
                    <button className='navBar__tool-item non-button'><i class="fas fa-calendar-alt navBar__tool-item-img" style={{ fontSize: 24 }}></i><p className={`navBar__tool-item-text ${hidden ? "" : "dp-n"}`}>Calendar</p></button>
                    <button className='navBar__tool-item non-button'><i class="far fa-clock navBar__tool-item-img" style={{ fontSize: 24 }}></i><p className={`navBar__tool-item-text ${hidden ? "" : "dp-n"}`}>Clock</p></button>
                </section>
                <section className='navBar__board'>
                    <div className='navBar__board-add'>
                        <p className={`navBar__board-add-text ${hidden ? "" : "dp-n"}`}>Your boards</p>
                        <button onClick={() => {addBoard()}}  className={`navBar__board-add-button ${hidden ? "" : "dp-n"}`}><i className="fas fa-plus navBar__board-add-button-img"></i></button>
                    </div>
                    <input value={nameBoard} onChange={e => setNameBoard(e.target.value)} type='text' className={`navBar__board-input ${hidden ? "" : "dp-n"}`} placeholder=' Write your new board'/>
                    <div className='navBar__board-list'>
                        {
                            arrBoard.map((course) => { ///
                                return (
                                    <Board
                                        course={course}
                                        hidden={hidden}
                                        arrBoard={arrBoard}
                                    />
                                ) 
                            })
                        }
                    </div>
                </section>
            </section>
            <div className="content-list-table">
                <div className='content-list-table__title'>{arrBoard[localStorage.getItem('index')] ? arrBoard[localStorage.getItem('index')].title : ""}</div>
                {
                    table.map((course) => {
                        return (
                            <Table
                                id={course.id}
                                title={course.title}
                                boolean={show}
                            />
                        );
                    })
                }
            </div>
            <section className={`add-table-form ${show ? "" : "dp-n"}`}>
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
