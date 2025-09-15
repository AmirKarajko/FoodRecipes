import React from 'react';

function Navbar () {
    return (
        <nav>
            <ul className="topnav">
            <li><a className="active" href="/">Dashboard</a></li>
            <li><a href="/add_new_recipe">Add New Recipe</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;