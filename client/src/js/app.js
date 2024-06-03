import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './home_page';
import RecipesPage from './recipes_page';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipesData: [],
            filteredRecipesData: [],
            error: null,
            currentPageNumber: 0,
            recipesPerPage: 15,
            searchQuery: "",
        };

        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.fetchRecipesData();
    }

    fetchRecipesData = () => {
        fetch('http://localhost:5000/api/recipes')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(recipesData => {
                this.setState({
                    recipesData,
                    filteredRecipesData: recipesData,
                    error: null
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ error: error.message });
            });
    }

    handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        const { recipesData } = this.state;
        const filteredRecipesData = recipesData.filter(recipe =>
            recipe.recipe_name.toLowerCase().includes(query) || recipe.recipe_category.toLowerCase().includes(query)
        );
        this.setState({ 
            filteredRecipesData: filteredRecipesData,
            currentPageNumber: 0,
            searchQuery: query
        }, () => {
            this.inputRef.current.focus();
        });
    }

    clearSearch = () => {
        const { recipesData } = this.state;
        this.setState({ 
            filteredRecipesData: recipesData,
            currentPageNumber: 0,
            searchQuery: "",
        }, () => {
            if (this.inputRef && this.inputRef.current) {
                this.inputRef.current.focus();
            }
        });
    }

    handlePageChange = (pageNumber) => {
        this.setState({ currentPageNumber: pageNumber - 1 });
    }

    handleRowClick = (url) => {
        window.location.href = url;
    };

    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<HomePage state={this.state} handleSearch={this.handleSearch} inputRef={this.inputRef} clearSearch={this.clearSearch} handleRowClick={this.handleRowClick} handlePageChange={this.handlePageChange} />} />
                    <Route path="/recipes/:id" element={<RecipesPage />} />
                </Routes>
            </Router>
        );
    }
}

export default App;