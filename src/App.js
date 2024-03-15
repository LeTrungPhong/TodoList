import './assets/App.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';
import Clock from './Clock';
import Calendar from './Calendar';
import NavBar from './NavBar';
import Header from './Header';
import Sign from './Sign';

const { useState } = React;
const { useEffect } = React;

function App(){
    // add-table
    const [nameTable,setNameTable] = useState('');

    const addTable = () => {
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

    useEffect(() => {
        let arrayBoard = [];
        fetch("http://localhost:3000/board")
        .then((res) => res.json())
        .then(function(courses) {
            for(let i = 0; i < courses.length; ++i){
                if(localStorage.getItem('idUser') === courses[i].idUser){
                    arrayBoard.push(courses[i]);
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
                });
        });
    }, []);

    function handleFollowBoard(course){
        for(let i = 0; i < arrBoard.length; ++i){
            if(course.id === arrBoard[i].id){
                localStorage.setItem('index',i);
                return;
            }
        }
    }

    const [nameBoard, setNameBoard] = useState('');

    const addBoard = () => {
        const newItem = {
            id: `${Date.now().toString(36) + Math.random().toString(36).substring(2)}`,
            title: `${nameBoard}`,
            idUser: `${localStorage.getItem('idUser')}`
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

    const deleteData = (id) => {
        fetch(`http://localhost:3000/item-table/${id}`,{
            method: 'DELETE'
        }).then(res => {
            if(!res.ok){
                console.log("Problem");
                return;
            }
            return res.json();
        })
        .then(data => {
            console.log('succesful');
        })
        .then(error => {
            console.log(error);
        });
    }

    const deleteTable = (idDeleteTable) => {
        fetch(`http://localhost:3000/table/${idDeleteTable}`,{
            method: 'DELETE'
        }).then(res => {
            if(!res.ok){
                console.log("Problem");
                return;
            }
            return res.json();
        })
        .then(data => {
            console.log('succesful');
        })
        .then(error => {
            console.log(error);
        });

        fetch(`http://localhost:3000/item-table`)
            .then((res) => res.json())
            .then(courses => {
                for(let i = 0; i < courses.length; ++i){
                    if(courses[i].idTable === idDeleteTable){
                        deleteData(courses[i].id);
                    }
                }
            })
    }

    const deleteBoard = (idDeleteBoard) => {
        fetch(`http://localhost:3000/board/${idDeleteBoard}`,{
            method: 'DELETE'
        }).then(res => {
            if(!res.ok){
                console.log("Problem");
                return;
            }
            return res.json();
        })
        .then(data => {
            console.log('succesful');
        })
        .then(error => {
            console.log(error);
        });

        fetch(`http://localhost:3000/table`)
            .then((res) => res.json())
            .then(courses => {
                for(let i = 0; i < courses.length; ++i){
                    if(courses[i].idBoard === idDeleteBoard){
                        deleteTable(courses[i].id);
                    }
                }
            })
    }
    // /navBar


    //
    var navBoardListItem = document.getElementsByClassName('navBar__board-list-item');

    if(navBoardListItem[localStorage.getItem('index')]){
        navBoardListItem[localStorage.getItem('index')].style.backgroundColor = '#9c9c9c'
    }
    //

    // sign
        const [name, setName] = useState('');
    
        const [userNameSignUp, setUserNameSignUp] = useState('');

        const [passwordSignUp, setPasswordSignUp] = useState('');

        const [userNameSignIn, setUserNameSignIn] = useState('');

        const [passwordSignIn, setPasswordSignIn] = useState('');

        const [idUser, setIdUser] = useState(localStorage.getItem('id') ? localStorage.getItem('id') : '');

        const [nameUser, setNameUser] = useState(localStorage.getItem('nameUser') ? localStorage.getItem('nameUser') : '');

        const addAccount = () => {
            const newItem = {
                id: `${Date.now().toString(36) + Math.random().toString(36).substring(2)}`,
                name: `${name}`,
                username: `${userNameSignUp}`,
                password: `${passwordSignUp}`
            };
            const arrAccount = [];
            fetch('http://localhost:3000/account')
                .then((res) => res.json())
                .then((courses) => {
                    let check = true;
                    for(let i = 0; i < courses.length; ++i){
                        if(name === courses[i].name || userNameSignUp === courses[i].username || passwordSignUp === courses[i].password){
                            check = false;
                        }
                        if(name === "" || userNameSignUp === "" || passwordSignUp === ""){
                            check = false;
                        }
                    }
                    if(check){
                        fetch('http://localhost:3000/account',{
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

                        setName('');
                        setUserNameSignUp('');
                        setPasswordSignUp('');
                        alert('Dang ki thanh cong');
                    } else {
                        setName('');
                        setUserNameSignUp('');
                        setPasswordSignUp('');
                        alert('Error... (da ton tai || trong)');
                    }
                })
        }

        const signIn = () => {
            fetch('http://localhost:3000/account')
                .then((res) => res.json())
                .then((courses) => {
                    let check = false;
                    for(let i = 0; i < courses.length; ++i){
                        if(courses[i].username === userNameSignIn && courses[i].password === passwordSignIn){
                            check = true;
                            setNameUser(courses[i].name);
                            setIdUser(courses[i].id);
                            localStorage.setItem('idUser',courses[i].id);
                            localStorage.setItem('nameUser',courses[i].name);
                        }
                    }
                    if(check){
                        alert('Dang nhap thanh cong ' + localStorage.getItem('nameUser'));
                        localStorage.setItem('index',0);
                    } else {
                        alert('ten dang nhap hoac mat khau sai !');
                    }
                })
        }
    // /sign

    return (
        <React.Fragment>
            <section className='loading'><i class="fas fa-spinner loading__img"></i></section>
            <Clock/>
            <Calendar/>
            <Header
                id = {idUser}
                name = {nameUser}
            />
            <React.Fragment>
                <section class="background-sign"></section>
                <section class="sign background-color-sign box-shadow-sign">
                    <div class="sign-times">
                        <i class="fas fa-cut sign-times__img"></i>
                    </div>
                    <div class="sign-account">
                        <div class="sign-account-in">
                            <h1 class="sign-account-in__title">Sign in</h1>
                            <div class="sign-account-in__network">
                                <i
                                    class="fas fa-user sign-account-in__network-item"
                                ></i>
                                <i
                                    class="fas fa-user-tag sign-account-in__network-item"
                                ></i>
                                <i
                                    class="fas fa-user-cog sign-account-in__network-item"
                                ></i>
                            </div>
                            <p class="sign-account-in__desc">or use your account</p>
                            <form action="" class="sign-account-in-form" method="">
                                <input
                                    value={userNameSignIn}
                                    onChange={e => setUserNameSignIn(e.target.value)}
                                    type="text"
                                    class="sign-account-in-form__input"
                                    placeholder=" Username"
                                    name=""
                                />
                                <input
                                    value={passwordSignIn}
                                    onChange={e => setPasswordSignIn(e.target.value)}
                                    type="text"
                                    class="sign-account-in-form__input"
                                    placeholder=" Password"
                                    name=""
                                />
                                <a href="#" class="sign-account-in-form__link-forget"
                                    >Forgot your password ?</a>
                                <button
                                    onClick={() => signIn()}
                                    className='sign-account-in-form__submit'
                                >
                                    SIGN IN
                                </button>
                            </form>
                        </div>
                        <div class="sign-account-up">
                            <h1 class="sign-account-up__title">Create Account</h1>
                            <div class="sign-account-up__network">
                                <i
                                    class="fab fa-facebook-f sign-account-up__network-item"
                                ></i>
                                <i
                                    class="fab fa-google-plus-g sign-account-up__network-item"
                                ></i>
                                <i
                                    class="fab fa-linkedin-in sign-account-up__network-item"
                                ></i>
                            </div>
                            <p class="sign-account-up__desc">
                                or use your email for registration
                            </p>
                            <form action="" class="sign-account-up-form" method="">
                                <input
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    type="text"
                                    class="sign-account-up-form__input"
                                    placeholder=" Name"
                                    name=""
                                />
                                <input
                                    value={userNameSignUp}
                                    onChange={e => setUserNameSignUp(e.target.value)}
                                    type="text"
                                    class="sign-account-up-form__input"
                                    placeholder=" Usename"
                                    name=""
                                />
                                <input
                                    value={passwordSignUp}
                                    onChange={e => setPasswordSignUp(e.target.value)}
                                    type="text"
                                    class="sign-account-up-form__input"
                                    placeholder=" Password"
                                    name=""
                                />
                                <button 
                                    onClick={() => addAccount()}
                                    className='sign-account-up-form__submit'
                                >
                                    SIGN UP
                                </button>
                            </form>
                        </div>
                    </div>
                    <div class="sign-move">
                        <div class="sign-move-up">
                            <h1 class="sign-move-up__title">Hello, Friend!</h1>
                            <p class="sign-move-up__desc">
                                Enter your personal details and start journey with us
                            </p>
                            <button class="sign-move-up__button non-button">SIGN UP</button>
                        </div>
                        <div class="sign-move-in">
                            <h1 class="sign-move-in__title">Welcome Back!</h1>
                            <p class="sign-move-in__desc">
                                To keep connected with us please login with your
                                personal info
                            </p>
                            <button class="sign-move-in__button non-button">SIGN IN</button>
                        </div>
                    </div>
                </section>
            </React.Fragment>
            <section className='navBar check'>
                <button 
                    className='navBar__hidden non-button'
                    onClick={() => clickHidden()}
                >
                    <i class="fas fa-angle-right navBar__hidden-item dp-n"></i>
                    <i class="fas fa-angle-left navBar__hidden-item"></i>
                </button>
                <section className='navBar__tool'>
                    <div className='navBar__tool-title'><p className='navBar__tool-title-text'>Your tools</p></div>
                    <button className='navBar__tool-item non-button'><i class="fas fa-calendar-alt navBar__tool-item-img" style={{ fontSize: 24 }}></i><p className='navBar__tool-item-text'>Calendar</p></button>
                    <button className='navBar__tool-item non-button'><i class="far fa-clock navBar__tool-item-img" style={{ fontSize: 24 }}></i><p className='navBar__tool-item-text'>Clock</p></button>
                </section>
                <section className='navBar__board'>
                    <div className='navBar__board-add'>
                        <p className={`navBar__board-add-text ${hidden ? "" : "dp-n"}`}>Your boards</p>
                        <button onClick={() => {addBoard()}}  className={`navBar__board-add-button ${hidden ? "" : "dp-n"}`}><i className="fas fa-plus navBar__board-add-button-img"></i></button>
                    </div>
                    <input value={nameBoard} onChange={e => setNameBoard(e.target.value)} type='text' className={`navBar__board-input ${hidden ? "" : "dp-n"}`} placeholder=' Write your new board'/>
                    <div className='navBar__board-list'>
                        {
                            arrBoard.map((course) => {
                                return (
                                    <React.Fragment>
                                        <div className='navBar__board-list-item-form'>
                                            <button
                                                className="navBar__board-list-item"
                                                onClick={() => {handleFollowBoard(course)}}
                                            >
                                                <i className="fas fa-chalkboard navBar__board-list-item-img"></i><p className={`navBar__board-list-item-title ${hidden ? "" : "dp-n"}`}>{course.title}</p>
                                            </button>
                                            <button 
                                                className='navBar__board-list-item-hidden non-button'
                                            >
                                                <i class="fas fa-ellipsis-h navBar__board-list-item-hidden-img"></i>
                                            </button>
                                            <div className='navBar__board-list-item-tool dp-n'>
                                                <div className="navBar__board-list-item-tool-form">
                                                    <i className="fas fa-times navBar__board-list-item-tool-form-times"></i>
                                                    <div style={{"color": "#d3d3d3", "text-align": "center", "padding": "5px", "border-bottom": "1px solid #5e5e5e"}}>List actions</div>
                                                    <button 
                                                        className="navBar__board-list-item-tool-form-delete"
                                                        onClick={() => deleteBoard(course.id)}
                                                    >
                                                        delete board
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
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
