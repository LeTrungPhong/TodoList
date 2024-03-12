setTimeout(() => {
    var buttonClick = document.getElementsByTagName('button');
    for(let i = 0; i < buttonClick.length; ++i){
        if(!buttonClick[i].classList.contains('navBar__hidden')){
            buttonClick[i].addEventListener('click', () => {
                window.location.reload();
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
  
    var contentSelectDateButton = document.querySelector('.content__select-date-button');
    contentSelectDateButton.addEventListener('click',() => {
        calendar.classList.toggle('dp-n');
    })
  
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

    var contentListItem = document.querySelector('.content__list-item');
    var navBar = document.querySelector('.navBar');
    var navBarHidden = document.querySelector('.navBar__hidden');
    var navBarHiddenItem = document.getElementsByClassName('navBar__hidden-item');
    var navBarBoardAdd = document.querySelector('.navBar__board-add');
    
    navBarHidden.addEventListener('click', () => {
        if(navBar.classList.contains('check')){
            for(let i = 0; i < navBarHiddenItem.length; ++i){
                navBarHiddenItem[i].classList.toggle('dp-n');
            }
            navBar.style.width = "auto";
            contentListItem.style.margin = `10px 10px 10px ${navBar.clientWidth - 30}px`;
            navBarBoardAdd.style.justifyContent = "center";
            navBar.classList.remove('check');
        } else {
            for(let i = 0; i < navBarHiddenItem.length; ++i){
                navBarHiddenItem[i].classList.toggle('dp-n');
            }
            navBar.style.width = "300px";
            contentListItem.style.margin = `10px 10px 10px ${navBar.clientWidth + 30}px`;
            navBarBoardAdd.style.justifyContent = "space-between";
            navBar.classList.add('check');
        }
    })

  },1000);