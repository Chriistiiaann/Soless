// Componentes -------------------------------------------------------------------
import Card from "../components/Card";
import BarraBusqueda from "../components/Barra-busqueda";

// Styles -------------------------------------------------------------------
import "./styles/Module.Catalogo.css";

// Hooks -------------------------------------------------------------------
import { useEffect } from "react";

// Providers -------------------------------------------------------------------
import { useShoesContext } from "../context_providers/ShoesProvider";
import { usePaginationContext } from "../context_providers/PaginationProvider";
import { useItemsPerPageContext } from "../context_providers/ItemsPerPageProvider";
import { useFilterContext } from "../context_providers/FilterProvider";

// EndPoints -------------------------------------------------------------------
import { GET_SHOES_ENDPOINT } from "../config";

// Paginacion -------------------------------------------------------------------
import ReactPaginate from "react-paginate";


function Catalogo(){

    // Contextos -------------------------------------------------------------------

    const shoes = useShoesContext();
    const pagination = usePaginationContext();
    const itemsPerPage = useItemsPerPageContext();
    const filter = useFilterContext();

    // Función para conectar con la API -------------------------------------------------------------------

    async function connectToApi(url, data) {
        console.log("Datos enviados al backend", data);
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const datosPromesa = await response.json();
                console.log("Datos recibidos del backend", datosPromesa);

                shoes.setShoes(datosPromesa.items);

                pagination.setPagination({
                    "currentPage": datosPromesa.currentPage,
                    "totalItems": datosPromesa.totalItems,
                    "totalPages": datosPromesa.totalPages
                });

            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // UseEffects -------------------------------------------------------------------

    useEffect(() => {
        const objetoBackend = {
            "query": filter.searchTerm,
            "sortField": filter.sortField,
            "sortOrder": filter.sortOrder,
            "page": pagination.pagination.currentPage || 1,
            "limit": itemsPerPage.itemsPerPage // Corregido aquí
        };
        connectToApi(GET_SHOES_ENDPOINT, objetoBackend);
    }, [itemsPerPage.itemsPerPage, pagination.pagination.currentPage]);
    

    // Funcion de Renderizado de zapatillas -------------------------------------------------------------------

    function renderShoes() {
        return shoes.shoes.map((shoe) => {
            return (
                <Card key={shoe.id} {...shoe} />
            );
        });
    }

    // Manejadores de eventos -------------------------------------------------------------------

    // Manejar el cambio de página -------------------------------------------------------------------

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1; // +1 porque las páginas de ReactPaginate comienzan en 0

        pagination.setPagination({
            ...pagination.pagination,
            currentPage: selectedPage,
        });
    };

    // Manejar el cambio de numero de items por página -------------------------------------------------------------------

    const handleItemsPerPageChange = (event) => {
        const newItemsPerPage = parseInt(event.target.value);

        // Actualizamos el estado con el nuevo límite de items por página
        itemsPerPage.setItemsPerPage(newItemsPerPage);

        // Reiniciar la paginación a la primera página
        pagination.setPagination({
            ...pagination.pagination,
            currentPage: 1,
        });
    };
        

    //---------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <BarraBusqueda fetchFunction={connectToApi} />
            <div className="catalogo">
                {renderShoes()}
            </div>
            <div className="pagination-container">
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    pageCount={pagination.pagination.totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
                <select value={itemsPerPage.itemsPerPage} onChange={handleItemsPerPageChange} className="items-per-page">
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </select>
            </div>
        </>
    );
}

export default Catalogo;
