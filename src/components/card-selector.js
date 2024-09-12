import React, {useContext} from 'react';
import {AppContext} from '../App';

function CardSelector(props){
    const [favoritesChecked,    setFavoritesChecked]    = React.useState(true);
    const [incorrectChecked,    setIncorrectChecked]    = React.useState(true);
    const [correctChecked,      setCorrectChecked]      = React.useState(true);
    const [unlabeledChecked,    setUnlabeledChecked]    = React.useState(true);

    const context = useContext(AppContext)

    let filters = context.filters;

    const toggleFavorites   =   ()  => {
        setFavoritesChecked(!favoritesChecked);
        context.setFilters({...filters, favorite : !favoritesChecked});
    }
    
    const toggleIncorrect   =   ()  => {
        setIncorrectChecked(!incorrectChecked);
        context.setFilters({...filters, incorrect : !incorrectChecked});
    }
    
    const toggleCorrect     =   ()  => {
        setCorrectChecked(!correctChecked);
        context.setFilters({...filters, correct : !correctChecked});
    }
    
    const toggleUnlabeled   =   ()  => {
        setUnlabeledChecked(!unlabeledChecked);
        context.setFilters({...filters, unlabeled : !unlabeledChecked});
    }

    return(
        <section >
            <div id="card-filters">
                <fieldset>
                    <legend>Card Filter</legend>

                    <label>
                        <input type="checkbox" onClick={toggleFavorites} checked={favoritesChecked}/>
                        &nbsp;Favorites 
                    </label>
                    <label>
                        <input type="checkbox" onClick={toggleIncorrect} checked={incorrectChecked}/>
                        &nbsp;Incorrect 
                    </label>
                    <label>
                        <input type="checkbox" onClick={toggleCorrect} checked={correctChecked}/>
                        &nbsp;Correct
                    </label>
                    <label>
                        <input type="checkbox" onClick={toggleUnlabeled} checked={unlabeledChecked}/>
                        &nbsp;Unlabeled
                    </label>
                </fieldset>
            </div>
        </section>
    );
}

export default CardSelector