import './Board.css'
import React from "react";
import ReactDOM from "react";

const { useState } = React;
const { useEffect } = ReactDOM;

function Board(course){
    function handleFollowBoard(item){
        for(let i = 0; i < course.arrBoard.length; ++i){
            if(item.id === course.arrBoard[i].id){
                localStorage.setItem('index',i);
                return;
            }
        }
    }

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

    const changeAccessModifier = (course) => {
        const newItem = {
            "accessModifier": `${course.accessModifier === 'public' ? 'private' : 'public'}`
        }
        fetch(`http://localhost:3000/board/${course.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        }).then(res => {
            if(!res.ok){
                console.log("Problem");
                return;
            }
            return res.json();
        })
        .then(data => {
            console.log("success");
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className='navBar__board-list-item-form'>
            <button
                className="navBar__board-list-item"
                onClick={() => {handleFollowBoard(course.course)}}
            >
                <i className="fas fa-chalkboard navBar__board-list-item-img"></i><p className={`navBar__board-list-item-title ${course.hidden ? "" : "dp-n"}`}>{course.course.title}</p>
            </button>
            <button 
                className={`navBar__board-list-item-hidden non-button ${course.hidden ? "" : "dp-n"} ${course.course.idUser === localStorage.getItem('idUser') ? "" : "dp-n"}`}
            >
                <i class="fas fa-ellipsis-h navBar__board-list-item-hidden-img"></i>
            </button>
            <div className='navBar__board-list-item-tool dp-n'>
                <div className="navBar__board-list-item-tool-form">
                    <i className="fas fa-times navBar__board-list-item-tool-form-times"></i>
                    <div style={{"color": "#d3d3d3", "text-align": "center", "padding": "5px", "border-bottom": "1px solid #5e5e5e"}}>List actions</div>
                    <button 
                        className="navBar__board-list-item-tool-form-delete navBar__board-list-item-tool-form-item"
                        onClick={() => deleteBoard(course.course.id)}
                    >
                        Delete board
                    </button>
                    <button 
                        className='navBar__board-list-item-tool-form-accessModifier navBar__board-list-item-tool-form-item'
                        onClick={() => changeAccessModifier(course.course)}
                    >
                        {` Change to ${course.course.accessModifier === "public" ? "private" : "public"}`}
                    </button>
                    <button 
                        className="navBar__board-list-item-tool-form-collab navBar__board-list-item-tool-form-item"
                    >
                        Collab
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Board;