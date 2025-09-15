import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DeleteRecipePage = () => {
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/api/delete_recipe/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete recipe');
            }
            console.log('Recipe deleted successfully');

            window.location.href = '/';
        })
        .catch(error => {
            console.error('Error deleting recipe:', error);
        });
    });
}

export default DeleteRecipePage;