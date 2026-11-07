import React, {useContext} from "react";
import { AppContext } from '../App.jsx';
import Checkbox from "./checkbox.jsx";

function Filters(props){
    const context = useContext(AppContext)
    

    function handleChange(value, checked){
        console.log(context.rand)
        let temp_filters = context.filters;
        temp_filters[value] = checked == "checked";
        context.setFilters(temp_filters)
        console.log(context.filters)
        context.filterCards();
    }
   
    return(
        <>
        <dl id="filtersContainer" >
            <dt><h3>Filters</h3></dt>
            <dd><Checkbox label="Unlabeled" change={handleChange} value="unlabeled" checked={context.filters["unlabeled"]==true}/></dd>
            <dd><Checkbox label="Favorite"  change={handleChange} value="favorite"  checked={context.filters["favorite"]==true}/></dd>
            <dd><Checkbox label="Incorrect" change={handleChange} value="incorrect" checked={context.filters["incorrect"]==true} /></dd>
            <dd><Checkbox label="Correct"   change={handleChange} value="correct"   checked={context.filters["correct"]==true} /></dd>
        </dl>
        </>
    );
}

export default Filters