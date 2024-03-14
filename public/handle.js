document.addEventListener('DOMContentLoaded', () => {
    var loading = document.querySelector('.loading');
    var loadingImg = document.querySelector('.loading__img');
    setTimeout(() => {
        loadingImg.style.transform = "rotate(180deg)";
    },0);
    setTimeout(() => {
        loading.classList.add('dp-n');
    },1000);
})

setTimeout(() => {
    var buttonClick = document.getElementsByTagName('button');
    for(let i = 0; i < buttonClick.length; ++i){
        if(!buttonClick[i].classList.contains('non-button')){
            buttonClick[i].addEventListener('click', () => {
                setTimeout(() => {
                    window.location.reload();
                },100);
            });
        }
    }
  
    var calendar = document.querySelector('.calendar');
    var calendarChoiceMonthValue = document.querySelector('.calendar__choice-month-value');
    var calendarChoiceMonthList = document.querySelector('.calendar__choice-month-list');
    var calendarChoiceMonthListItem = document.getElementsByClassName('calendar__choice-month-list-item');
    
    calendarChoiceMonthValue.addEventListener('click', () => {
        calendarChoiceMonthList.classList.toggle('dp-n');
    });
    for(let i = 0; i < calendarChoiceMonthListItem.length; ++i){
        calendarChoiceMonthListItem[i].addEventListener('click', () => {
            calendarChoiceMonthList.classList.toggle('dp-n');
        })
    }
  
    var calendarChoiceYearValue = document.querySelector('.calendar__choice-year-value');
    var calendarChoiceYearList = document.querySelector('.calendar__choice-year-list');
    var calendarChoiceYearListItem = document.getElementsByClassName('calendar__choice-year-list-item');
    calendarChoiceYearValue.addEventListener('click', () => {
        calendarChoiceYearList.classList.toggle('dp-n');
    });
    for(let i = 0; i < calendarChoiceYearListItem.length; ++i){
        calendarChoiceYearListItem[i].addEventListener('click', () => {
            calendarChoiceYearList.classList.toggle('dp-n');
        })
    }
  
    var clockBorderBlock = document.getElementsByClassName('clock__border-block');
    var clockBorderBlockItem = document.getElementsByClassName('clock__border-block-item');
    var clockNumberBlock = document.getElementsByClassName('clock__number-block');
    var clockNumberBlockItem = document.getElementsByClassName('clock__number-block-item');
    for(let i = 0; i < clockBorderBlock.length; ++i){
        if(i % 5 === 0){
            clockBorderBlockItem[i].style.width = "10px";
        }
        clockNumberBlock[i].style.transform = `rotate(${i*6 + 30}deg)`;
        clockBorderBlock[i].style.transform = `rotate(${i*6 + 44}deg)`;
    }
  
    var clock = document.querySelector('.clock');
    var clockSecond = document.querySelector('.clock__second');
    var clockMinute = document.querySelector('.clock__minute');
    var clockHour = document.querySelector('.clock__hour');
  
    let rotateSecond = new Date().getSeconds() * 6;
    let rotateMinute = new Date().getMinutes() * 6;
    let rotateHour = new Date().getHours() * 6 * 5 + (rotateMinute / 12);
  
    setInterval(() => {
        rotateSecond = rotateSecond + 6;
        if(rotateSecond % 360 === 0) rotateMinute = rotateMinute + 6;
        if(rotateSecond % 4320 === 0) rotateHour = rotateHour + 6;
        clockSecond.style.transform = `rotate(${rotateSecond}deg)`;
        clockMinute.style.transform = `rotate(${rotateMinute}deg)`;
        clockHour.style.transform = `rotate(${rotateHour}deg)`;
    },1000);
  
    var contentBarHidden = document.getElementsByClassName('content__bar-hidden');
    var contentBarForm = document.getElementsByClassName('content__bar-form');
    var contentBarFormTimes = document.getElementsByClassName('content__bar-form-times');
  
    for(let i = 0; i < contentBarHidden.length; ++i){
        contentBarHidden[i].addEventListener('click', () => {
            contentBarForm[i].classList.toggle('dp-n');
        });
        contentBarFormTimes[i].addEventListener('click', () => {
            contentBarForm[i].classList.toggle('dp-n');
        })
    }

    var contentListTable = document.querySelector('.content-list-table');
    var navBar = document.querySelector('.navBar');
    var navBarHidden = document.querySelector('.navBar__hidden');
    var navBarHiddenItem = document.getElementsByClassName('navBar__hidden-item');
    var navBarBoardAdd = document.querySelector('.navBar__board-add');
    ////
    var clock = document.querySelector('.clock');
    var navBarToolItem = document.getElementsByClassName('navBar__tool-item');
    var navBarToolItemText = document.getElementsByClassName('navBar__tool-item-text');
    var navBarToolTitleText = document.querySelector('.navBar__tool-title-text');

    for(let i = 0; i < navBarToolItem.length; ++i){
        navBarToolItem[i].addEventListener('click', () => {
            if(i === 0){
                calendar.classList.toggle('dp-n');
            } else if(i === 1){
                clock.classList.toggle('dp-n');
            }
        })
    }
    
    navBarHidden.addEventListener('click', () => {
        if(navBar.classList.contains('check')){
            for(let i = 0; i < navBarHiddenItem.length; ++i){
                navBarHiddenItem[i].classList.toggle('dp-n');
            }
            navBar.style.width = "auto";
            contentListTable.style.margin = `0px 10px 10px ${navBar.clientWidth - 100}px`;
            navBarBoardAdd.style.justifyContent = "center";
            navBar.classList.remove('check');
            for(let i = 0; i < navBarToolItemText.length; ++i){
                navBarToolItemText[i].classList.toggle('dp-n');
            }
            navBarToolTitleText.classList.toggle('dp-n');
        } else {
            for(let i = 0; i < navBarHiddenItem.length; ++i){
                navBarHiddenItem[i].classList.toggle('dp-n');
            }
            navBar.style.width = "300px";
            contentListTable.style.margin = `0px 10px 10px ${navBar.clientWidth + 30}px`;
            navBarBoardAdd.style.justifyContent = "space-between";
            navBar.classList.add('check');
            for(let i = 0; i < navBarToolItemText.length; ++i){
                navBarToolItemText[i].classList.toggle('dp-n');
            }
            navBarToolTitleText.classList.toggle('dp-n');
        }
    })
    
    var contentHiddenInsert = document.getElementsByClassName('content__hidden-insert');
    var contentInsert = document.getElementsByClassName('content__insert');
    var contentInsertClose = document.getElementsByClassName('content__insert-close');

    for(let i = 0; i < contentHiddenInsert.length; ++i){
        contentHiddenInsert[i].addEventListener('click', () => {
            contentInsert[i].classList.remove('dp-n');
            contentHiddenInsert[i].classList.add('dp-n');
        })

        contentInsertClose[i].addEventListener('click', () => {
            contentInsert[i].classList.add('dp-n');
            contentHiddenInsert[i].classList.remove('dp-n');
        })
    }
},1000);

setTimeout(() => {
    let headerWidth = 200;
    let headerWidthBar = 50;

    // body
    var bodyContainer = document.querySelector('.container');

    // header - account - dashboard - nav - item
    var header = document.querySelector('.header');
    var headerAccount = document.querySelector('.header__dashboard-account');
    var headerAccountNav = document.querySelector('.header__dashboard-account-nav');
    var headerAccountNavItem = document.getElementsByClassName('header__dashboard-account-nav-item');
    var headerAccountNavImg = document.querySelector('.header__dashboard-account-nav-img');

    headerAccount.addEventListener('click',() => {
        let heightheaderitems = 50;
        if(headerAccountNav.classList.contains("dp-n")){
            headerAccountNav.classList.remove('dp-n');
            setTimeout(() => {
                for(let i = 0; i < headerAccountNavItem.length; ++i){
                    headerAccountNavItem[i].style.transform = `translate(0px, ${heightheaderitems*(i+1)}px`;
                    headerAccountNavItem[i].style.opacity = 1;
                    headerAccountNavImg.style.transform = 'rotate(180deg)';
                }
            },0);
        }
        else
        {
            setTimeout(() => {
                for(let i = 0; i < headerAccountNavItem.length; ++i){
                    headerAccountNavItem[i].style.transform = 'translate(0px, 20px)';
                    headerAccountNavItem[i].style.opacity = 0;
                    headerAccountNavImg.style.transform = 'rotate(0deg)';
                }
            },0);
            setTimeout(() => {
                headerAccountNav.classList.add('dp-n');
            },1000);
        }
    });

    // header - dashboard - notification - icon
    var headerDashboardNotification = document.querySelector('.header__dashboard-notification');
    var headerDashboardNotificationIcon = document.querySelector('.header__dashboard-notification-icon');

    if(1){
        setInterval(() => {    
            setTimeout(() => {
                headerDashboardNotificationIcon.style.transform = `rotate(100deg)`;
            },500);
            headerDashboardNotificationIcon.style.transform = `rotate(-100deg)`;
        },1000);    
    }
},1000);

setTimeout(() => {
    var sign = document.querySelector('.sign');
    var signAccount = document.querySelector('.sign-account');
    var signAccountIn = document.querySelector('.sign-account-in');
    var signAccountUp = document.querySelector('.sign-account-up');
    var signMove = document.querySelector('.sign-move');
    var signMoveIn = document.querySelector('.sign-move-in');
    var signMoveUp = document.querySelector('.sign-move-up');
    var signMoveUpButton = document.querySelector('.sign-move-up__button');
    var signMoveInButton = document.querySelector('.sign-move-in__button');

    signMoveUpButton.addEventListener('click',() => {
        signMove.style.transform = "translatex(-100%)";
        signAccount.style.transform = "translatex(100%)";
        signAccountIn.style.opacity = 0;
        signMoveUp.style.opacity = 0;
        setTimeout(() => {
            signAccountIn.style.display = 'none';
            signMoveUp.style.display = 'none';
        },250);

        signAccountUp.style.display = 'flex';
        signMoveIn.style.display = 'flex';
        setTimeout(() => {
            signAccountUp.style.opacity = 1;
            signMoveIn.style.opacity = 1;
        },0);
    });

    signMoveInButton.addEventListener('click',() => {
        signMove.style.transform = "translatex(0%)";
        signAccount.style.transform = "translatex(0%)";
        signAccountUp.style.opacity = 0;
        signMoveIn.style.opacity = 0;
        setTimeout(() => {
            signAccountUp.style.display = 'none';
            signMoveIn.style.display = 'none';
        },250);

        signAccountIn.style.display = 'flex';
        signMoveUp.style.display = 'flex';
        setTimeout(() => {
            signAccountIn.style.opacity = 1;
            signMoveUp.style.opacity = 1;
        },0);
    });

    var signTimes = document.querySelector('.sign-times');
    var backgroundSign = document.querySelector('.background-sign');

    backgroundSign.style.display = 'none';

    signTimes.addEventListener('click',() => {
        signTimes.style.transform = `translatey(${sign.clientHeight}px)`;
        if(1){
            sign.classList.remove('box-shadow-sign');
            sign.classList.remove('background-color-sign');
            signAccount.style.transform = 'translatex(-100%)';
            signMove.style.transform = 'translatex(100%)';
            signAccount.style.opacity = 0;
            signMove.style.opacity = 0;
            setTimeout(() => {
                sign.style.display = 'none';
                sign.style.transform = 'translate(-50%,-70%)';
            },250);
            backgroundSign.style.opacity = 0;
            setTimeout(() => {
                backgroundSign.style.display = 'none';
            },250);
        }
    });

    var headerDashboardAccountNavItem = document.getElementsByClassName('header__dashboard-account-nav-item');

    document.addEventListener('DOMContentLoaded',() => {
        sign.style.display = 'none';
        backgroundSign.style.display = 'none';
    })

    for(let i = 0; i < headerDashboardAccountNavItem.length; ++i){
        if(i == 0){
            headerDashboardAccountNavItem[i].addEventListener('click',() => {
                backgroundSign.style.display = 'block';
                setTimeout(() => {
                    backgroundSign.style.opacity = 1;
                },0)
                sign.style.display = 'flex';
                setTimeout(() => {
                    sign.classList.add('background-color-sign');
                    sign.style.opacity = 1;
                    sign.style.transform = 'translate(-50%, -50%)';
                },0);

                signAccountIn.style.display = 'flex';
                signAccountIn.style.opacity = 1;
                signAccount.style.transform ='translatex(0px)';
                signAccount.style.opacity = 1;
                signAccountUp.style.display = 'none';
                signAccountUp.style.opacity = 0;
                signMoveUp.style.display = 'flex';
                signMoveUp.style.opacity = 1;
                signMove.style.transform = 'translatex(0px)';
                signMove.style.opacity = 1;
                signMoveIn.style.display = 'none';
                signMoveIn.style.opacity = 0;
                signTimes.style.transform = 'translate(0px, -40px)';
                sign.classList.add('box-shadow-sign');
            });
        }
        else
        {
            headerDashboardAccountNavItem[i].addEventListener('click',() => {
                backgroundSign.style.display = 'block';
                setTimeout(() => {
                    backgroundSign.style.opacity = 1;
                },0)
                sign.style.display = 'flex';
                setTimeout(() => {
                    sign.classList.add('background-color-sign');
                    sign.style.opacity = 1;
                    sign.style.transform = 'translate(-50%, -50%)';
                },0);
                signTimes.style.transform = 'translate(0px, -40px)';
                signAccountUp.style.display = 'flex';
                signAccountUp.style.opacity = 1;
                signAccount.style.transform ='translatex(100%)';
                signAccount.style.opacity = 1;
                signAccountIn.style.display = 'none';
                signAccountIn.style.opacity = 0;
                signMoveIn.style.display = 'flex';
                signMoveIn.style.opacity = 1;
                signMove.style.transform = 'translatex(-100%)';
                signMove.style.opacity = 1;
                signMoveUp.style.display = 'none';
                signMoveUp.style.opacity = 0;
                sign.classList.add('box-shadow-sign');
            });
        }
    }
},1000);