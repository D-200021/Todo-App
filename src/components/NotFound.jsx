import React from 'react'
import { curYear } from '../App'
const NotFound = () => {
    return (
        <center>
            <section className='scollable'>
                <div className='todoListAlignment'>
                    <section className='todoTaskListOuterPage'>
                        <div className='todoListTaskAligment'>
                            <h1>404:Not Found</h1>
                        </div>
                    </section>
                </div>
            </section>
            <footer className="notFoundTodoFooter">
                Copyright &#169; {curYear} Dhruv Sheth - All Right Reserves
            </footer>
        </center>
    )
}

export default NotFound
