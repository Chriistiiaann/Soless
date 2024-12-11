import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App'
import { AuthProvider } from "./context_providers/AuthProvider";
import ShoesProvider from "./context_providers/ShoesProvider";
import PaginationProvider from "./context_providers/PaginationProvider";
import ItemsPerPageProvider from "./context_providers/ItemsPerPageProvider";
import FilterProvider from "./context_providers/FilterProvider";
import CartProvider from "./context_providers/CartProvider";


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <PaginationProvider>
                        <FilterProvider>
                            <ItemsPerPageProvider>
                                <ShoesProvider >
                                    <App />
                                </ShoesProvider>
                            </ItemsPerPageProvider>
                        </FilterProvider>
                    </PaginationProvider>
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
)
