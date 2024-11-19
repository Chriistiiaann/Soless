import Header from "../components/Header";
import Footer from "../components/Footer";

import { Outlet } from "react-router-dom";
import ShoesProvider from "../context_providers/ShoesProvider";
import PaginationProvider from "../context_providers/PaginationProvider";
import ItemsPerPageProvider from "../context_providers/ItemsPerPageProvider";
import FilterProvider from "../context_providers/FilterProvider";


export default function BigLayout() {
    return (
        <div>
            <PaginationProvider>
                <FilterProvider>
                    <ItemsPerPageProvider>
                        <ShoesProvider >
                            <Header />
                            <Outlet />
                            <Footer />
                        </ShoesProvider>
                    </ItemsPerPageProvider>
                </FilterProvider>
            </PaginationProvider>
        </div>
    )
}