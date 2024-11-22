import { useState, createContext, useContext } from "react";
import propTypes from 'prop-types'

const ShoesContext = createContext();
export function useShoesContext() {
    return useContext(ShoesContext);
}

function ShoesProvider({children}) {
    const [shoes, setShoes] = useState([]);

    return (
        <ShoesContext.Provider value={{shoes, setShoes}}>
            {children}
        </ShoesContext.Provider>
        
    )
}

ShoesProvider.propTypes = {
    children: propTypes.node.isRequired
}

export default ShoesProvider