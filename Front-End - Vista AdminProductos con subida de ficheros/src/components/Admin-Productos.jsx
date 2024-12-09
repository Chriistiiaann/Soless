import { useEffect, useState } from "react";
import CardProductosAdmin from "./Card-Productos-Admin";
import BarraBusqueda from "./Barra-busqueda";
import ReactPaginate from "react-paginate";
import "./styles/Module.AdminProductos.css";

const AdminProductos = ({ fetchEndpoint }) => {
  const [productos, setProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProductos = async (searchQuery = "") => {
    const params = {
        page: currentPage,
        limit: itemsPerPage,
        query: searchQuery,
    };
    try {
        const response = await fetch(fetchEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });

        if (response.ok) {
            const data = await response.json();
            setProductos(data.items);
            setTotalPages(data.totalPages);
        } else if (response.status === 404) {
            console.error("Endpoint no encontrado. Verifica la URL.");
        } else {
            console.error("Error fetching productos:", response.statusText);
        }
    } catch (error) {
        console.error("Error connecting to API:", error);
    }
};


  const handleEdit = (id) => {
    console.log("Editando producto con ID:", id);

};

const handleDelete = async (id) => {
    console.log("Eliminando producto con ID:", id);
    try {
        const response = await fetch(`/api/products/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            console.log("Producto eliminado con éxito");
            fetchProductos(); 
        } else {
            console.error("Error al eliminar el producto:", response.statusText);
        }
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
    }
};


  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchProductos();
  }, [currentPage, itemsPerPage]);

  return (
    <div className="admin-productos-container">
      <BarraBusqueda fetchFunction={fetchProductos} />
      <div className="admin-productos-grid">
        {productos.map((producto) => (
          <CardProductosAdmin
            key={producto.id}
            producto={producto}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          activeClassName={"active"}
        />
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="items-per-page"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
    </div>
  );
};

export default AdminProductos;
