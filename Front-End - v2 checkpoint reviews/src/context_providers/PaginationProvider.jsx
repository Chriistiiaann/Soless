import { useState, createContext, useContext } from "react";
import propTypes from 'prop-types'

const PaginationContext = createContext();
export function usePaginationContext() {
    return useContext(PaginationContext);
}

function PaginationProvider({children}) {
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalItems: 0,
        totalPages: 0
    });
    

    return (
        <PaginationContext.Provider value={{pagination, setPagination}}>
            {children}
        </PaginationContext.Provider>
        
    )
}

PaginationProvider.propTypes = {
    children: propTypes.node.isRequired
}

export default PaginationProvider