import React from 'react';

function Navbar () {
    return (
        <nav>
            <ul className="topnav">
            <li><a className="active" href="/">Home</a></li>
            <li><a href="/add_new_recipe">Add New Recipe</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;