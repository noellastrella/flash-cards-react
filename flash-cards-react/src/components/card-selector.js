import React, {useContext} from 'react';
import {AppContext} from '../App';

function CardSelector(props){
    const [favoritesChecked, setFavoritesChecked]    = React.useState(true);
    const [incorrectChecked, setIncorrectChecked]    = React.useState(true);
    const [correctChecked, setCorrectChecked]        = React.useState(true);
    const [unlabeledChecked, setUnlabeledChecked]    = React.useState(true);

    const context = useContext(AppContext)

    let filters = context.filters;

    const changeFilters = () =>{
        context.setFilters(context.filters);
        console.log(context.filters)
    }

    const toggleFavorites   =   ()  => {
        setFavoritesChecked(!favoritesChecked);

        filters.favorite = !favoritesChecked;
        changeFilters();
    }
    
    const toggleIncorrect   =   ()  => {
        setIncorrectChecked(!incorrectChecked);
        
        filters.incorrect = !incorrectChecked;
        changeFilters();
    }
    
    const toggleCorrect     =   ()  => {
        setCorrectChecked(!correctChecked);

        filters.correct = correctChecked;
        changeFilters();
    }
    
    const toggleUnlabeled   =   ()  => {
        setUnlabeledChecked(!unlabeledChecked);

        filters.unlabeled = !unlabeledChecked;
        changeFilters();
    }

    return(
        <section >
            <div id="card-filters">
                <fieldset>
                    <legend>Card Filter</legend>

                    <label>
                        <input type="checkbox" name="card-filter" value="favorites" onClick={toggleFavorites} checked={favoritesChecked}></input>
                        &nbsp;Favorites 
                    </label>
                    <label>
                        <input type="checkbox" name="card-filter" value="incorrect" onClick={toggleIncorrect} checked={incorrectChecked}></input>
                        &nbsp;Incorrect 
                    </label>
                    <label>
                        <input type="checkbox" name="card-filter" value="correct" onClick={toggleCorrect} checked={correctChecked}></input>
                        &nbsp;Correct
                    </label>
                    <label>
                        <input type="checkbox" name="card-filter" value="unlabeled" onClick={toggleUnlabeled} checked={unlabeledChecked}></input>
                        &nbsp;Unlabeled
                    </label>
                </fieldset>
            </div>
        </section>
    );
}

export default CardSelector