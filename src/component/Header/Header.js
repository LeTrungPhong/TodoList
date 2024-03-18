import './Header.css'
import React from 'react';
import ReactDOM from 'react-dom';

const { useState } = React;
const { useEffect } = React;

function Header(course){
    return (
        <section class="header">
            <div class="header__dashboard-name"><i class="fab fa-trello header__dashboard-name-img"></i><p className='header__dashboard-name-text'>Trello</p></div>
            <div class="header__dashboard">
            <div class="header__dashboard-search">
                <input
                    type="text"
                    class="header__dashboard-search__input"
                    placeholder=" Search for anything..."
                />
            </div>
            <div class="header__dashboard-notification">
                <i
                    class="far fa-bell header__dashboard-notification-icon"
                ></i>
            </div>
            <div class="header__dashboard-account">
                <i class="far fa-user header__dashboard-account-avatar"></i>
                <div class="header__dashboard-account-name">
                    <p class="header__dashboard-account-name-text">
                        {course.name ? course.name : "Non-user"}
                    </p>
                </div>
                <div class="header__dashboard-account-job">
                    <p class="header__dashboard-account-job-text">
                        Sinh vien
                    </p>
                </div>
                <i
                    class="fas fa-chevron-down header__dashboard-account-nav-img"
                ></i>

                <div class="header__dashboard-account-nav dp-n">
                    <a href="#" class="header__dashboard-account-nav-item" style={{margin: 1}}
                        >Sign in</a>
                    <a href="#" class="header__dashboard-account-nav-item"
                        >Sign up</a>
                </div>  
            </div>
            </div>
        </section>
    )
}

export default Header;