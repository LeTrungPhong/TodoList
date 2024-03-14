import React from 'react';
import ReactDOM from 'react-dom';

const { useState } = React;
const { useEffect } = React;

function Sign(){

    const [name, setName] = useState('');
   
    const [userNameSignUp, setUserNameSignUp] = useState('');

    const [passwordSignUp, setPasswordSignUp] = useState('');

    const [userNameSignIn, setUserNameSignIn] = useState('');

    const [passwordSignIn, setPasswordSignIn] = useState('');

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
                let Ten = '';
                for(let i = 0; i < courses.length; ++i){
                    if(courses[i].username === userNameSignIn && courses[i].password === passwordSignIn){
                        check = true;
                        Ten = courses[i].name;
                    }
                }
                if(check){
                    alert('Dang nhap thanh cong ' + Ten);
                } else {
                    alert('ten dang nhap hoac mat khau sai !');
                }
            })
    }

    return (
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
                                className='sign-account-in-form__submit non-button'
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
                                className='sign-account-up-form__submit non-button'
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
    )
}

export default Sign;