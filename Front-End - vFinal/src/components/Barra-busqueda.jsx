import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './styles/Module.Barra-busqueda.css';
import { useShoesContext } from "../context_providers/ShoesProvider";
import { usePaginationContext } from "../context_providers/PaginationProvider";
import { useItemsPerPageContext } from "../context_providers/ItemsPerPageProvider";
import { useFilterContext } from "../context_providers/FilterProvider";
import { GET_SHOES_ENDPOINT } from "../config";

const BarraBusqueda = () => {

  const shoes = useShoesContext();
  const pagination = usePaginationContext();
  const itemsPerPage = useItemsPerPageContext();
  const filter = useFilterContext();

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
          currentPage: datosPromesa.currentPage,
          totalItems: datosPromesa.totalItems,
          totalPages: datosPromesa.totalPages
        });

      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  function manageSearch(event) {
    filter.setSearchTerm(event.target.value);
  }

  function manageField(event) {
    filter.setSortField(event.target.value);
  }

  function manageOrder(event) {
    filter.setSortOrder(event.target.value);
  }


  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (!isFirstLoad) {
      const objetoBackend = {
        query: filter.searchTerm,
        sortField: filter.sortField,
        sortOrder: filter.sortOrder,
        page: pagination.pagination.currentPage || 1,
        limit: itemsPerPage.itemsPerPage 
      };
      connectToApi(GET_SHOES_ENDPOINT, objetoBackend);
    } else {
      setIsFirstLoad(false);
    }
  }, [filter.searchTerm, filter.sortField, filter.sortOrder]);

  return (
    <form className="search-form">
      <div className="barra-busqueda">
        <input
          type="text"
          placeholder="Buscar..."
          value={filter.searchTerm}
          onChange={manageSearch}
          className="input-busqueda"
        />
        <button type="button" className="boton-busqueda" onClick={(e) => e.preventDefault()}>
          <FaSearch />
        </button>
      </div>

      <div className='filters'>
        <select id="categoria" name="categoria" onChange={manageField}>
            <option value="price">Precio</option>
            <option value="name">Nombre</option>
        </select>

        <select id="orden" name="orden" onChange={manageOrder}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
        </select>
      </div>
    </form>
  );
};

BarraBusqueda.propTypes = {
  itemsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
};

export default BarraBusqueda;
