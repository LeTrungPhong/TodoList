import React from 'react';
import ReactDOM from 'react-dom';

const { useState } = React;
const { useEffect } = React;

function Table(course){
    const [job,setJob] = useState('');
    const [jobs,setJobs] = useState([]);

    useEffect(() => {
        let arrayJob = [];
        fetch("http://localhost:3000/item-table")
        .then((res) => res.json())
        .then(function(courses) {
            for(let i = 0; i < courses.length; ++i){
                if(courses[i].idTable === course.id){
                    arrayJob.push(courses[i]);
                }
            }
            setJobs(arrayJob);
        });
    }, []);
    
    const handleSubmit = () => {
        const newItem = {
            id: `${Date.now().toString(36) + Math.random().toString(36).substring(2)}`,
            name: `${job}`,
            idTable: `${course.id}`
        };
        fetch('http://localhost:3000/item-table', {
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
        setJob('');
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

    const resetData = (id) => {
        fetch("http://localhost:3000/item-table")
        .then((res) => res.json())
        .then(function(courses) {
            for(let i = 0; i < courses.length; ++i){
                if(courses[i].idTable === course.id){
                    fetch(`http://localhost:3000/item-table/${courses[i].id}`,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete items');
                }
                console.log('Items deleted successfully');
                })
                .catch(error => {
                console.error('Error deleting items:', error);
                });
                }
            }
        });
    }

    const deleteTable = () => {
        fetch(`http://localhost:3000/table/${course.id}`,{
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

    return (
        <React.Fragment>
            <div className="content-item">
                <article className="content">
                    <section className="content__bar">
                        <i className="fas fa-ellipsis-h content__bar-hidden"></i>
                        <div className="content__bar-form dp-n">
                            <i class="fas fa-times content__bar-form-times"></i>
                            <div style={{"color": "#d3d3d3", "text-align": "center", "padding": "5px", "border-bottom": "1px solid #5e5e5e"}}>List actions</div>
                            <button 
                                className="content__bar-form-delete"
                                onClick={() => {deleteTable()}}
                            >
                                delete table
                            </button>
                        </div>
                    </section>
                    <h1 className="content__title">{course.title}</h1>
                    <section className="content__insert">
                        <input 
                            value={job} 
                            className="content__insert-input" type="text" placeholder="Add your new todo..."
                            onChange={e => setJob(e.target.value)}
                        />
                        <button 
                            className="content__insert-submit" type="submit"
                            onClick={() => {handleSubmit()}}
                        >
                            <i className="fas fa-plus content__insert-submit-img"></i>
                        </button>
                    </section>
                    <ul className={`content__list `}>
                        {
                            jobs.map((job) => {
                                return (
                                    <React.Fragment>
                                        <li className="content__list-item">
                                            <p className="content__list-item-text">{job.name}</p>
                                            <button 
                                                className="content__list-item-delete" 
                                                type="submit"
                                                onClick={() => {deleteData(job.id)}}
                                            >
                                                <i className="content__list-item-delete-img fas fa-trash"></i>
                                            </button>
                                        </li>
                                    </React.Fragment>
                                )
                            })
                        }
                    </ul>
                    <div className={`content__undefined ${jobs.length ? "dp-n" : ""} `}>You should create todo</div>
                    <section className="content__footer">
                        <p className="content__footer-count">{`You have ${jobs.length} pending tasks`}</p>
                        <button 
                            className="content__footer-clear"
                            onClick={() => {resetData()}}
                        >
                            Clear All
                        </button>
                    </section>
                </article>
            </div>
        </React.Fragment>
    )
}

export default Table;