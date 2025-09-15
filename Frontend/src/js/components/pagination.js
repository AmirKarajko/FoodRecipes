import React from 'react';

function Pagination({ recipesPerPage, totalRecipes, currentPage, onPageChange }) {
    const pageNumbers = Math.ceil(totalRecipes / recipesPerPage);

    if (pageNumbers === 1) return null;

    return (
        <nav align="center">
            {Array.from({ length: pageNumbers }, (_, index) => (
                <button key={index + 1} onClick={() => onPageChange(index + 1)} className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}>{index + 1}</button>
            ))}
        </nav>
    );
};

export default Pagination;