import { useState, createContext, useContext } from "react";
import propTypes from 'prop-types'

const FilterContext = createContext();
export function useFilterContext() {
    return useContext(FilterContext);
}

function FilterProvider({children}) {

    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState("price");
    const [sortOrder, setSortOrder] = useState("asc");

    return (
        <FilterContext.Provider value={{searchTerm, setSearchTerm, sortField, setSortField, sortOrder, setSortOrder}}>
            {children}
        </FilterContext.Provider>
        
    )
}

FilterProvider.propTypes = {
    children: propTypes.node.isRequired
}

export default FilterProvider