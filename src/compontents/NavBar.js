import React from 'react'

const NavBar = () => {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday"];
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const date = new Date();
    const showTime = weekday[date.getDay()] + " , " + date.getDate() + " " + month[date.getMonth()];

    return (
        <div className="container .bg-light mb-10">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <a className="navbar-brand" href="/">ToDo List</a>
                
            </nav>
            <p className="text-2xl font-bold text-gray-600 mx-8 " >{showTime}</p>
        </div>
    )
}

export default NavBar