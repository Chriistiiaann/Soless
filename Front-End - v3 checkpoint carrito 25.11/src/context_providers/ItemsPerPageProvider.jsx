import { useState, createContext, useContext } from "react";
import propTypes from 'prop-types'

const ItemsPerPageContext = createContext();
export function useItemsPerPageContext() {
    return useContext(ItemsPerPageContext);
}

function ItemsPerPageProvider({children}) {
    const [itemsPerPage, setItemsPerPage] = useState(10);

    return (
        <ItemsPerPageContext.Provider value={{itemsPerPage, setItemsPerPage}}>
            {children}
        </ItemsPerPageContext.Provider>
        
    )
}

ItemsPerPageProvider.propTypes = {
    children: propTypes.node.isRequired
}

export default ItemsPerPageProvider