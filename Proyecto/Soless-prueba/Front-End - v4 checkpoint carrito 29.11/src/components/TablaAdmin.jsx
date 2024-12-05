import React, { useEffect, useState } from "react";
import "./styles/Module.TablaAdmin.css";
import { useShoesContext } from "../context_providers/ShoesProvider";
import { GET_SHOES_ENDPOINT, ADD_PRODUCT_ENDPOINT } from "../config"; // Asegurarnos de importar ADD_PRODUCT_ENDPOINT
import { URL_IMAGES } from "../config";

function TablaAdmin(URL_IMAGES) {
    const shoes = useShoesContext(); 
    const [isModalOpen, setModalOpen] = useState(false); 
    const [isAddModalOpen, setAddModalOpen] = useState(false); // Modal para agregar producto
    const [selectedShoe, setSelectedShoe] = useState(null);

    // Función para obtener todos los productos
    async function fetchShoes() {
        try {
            const response = await fetch(GET_SHOES_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: "",
                    filters: {},
                    limit: 50,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                shoes.setShoes(data.items);
            } else {
                console.error("Error al obtener los datos:", response.status);
            }
        } catch (error) {
            console.error("Error al conectar con el backend:", error);
        }
    }

    // Llamar al backend cuando se carga el componente
    useEffect(() => {
        fetchShoes();
    }, []);

    // Abrir el modal de edición
    const handleEditClick = (shoe) => {
        setSelectedShoe(shoe); 
        setModalOpen(true);
    };

    // Cerrar modal de edición
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedShoe(null);
    };

    // Abrir modal para agregar nuevo producto
    const handleAddProductClick = () => {
        setAddModalOpen(true); // Abrir el modal de agregar producto
    };

    // Cerrar modal de agregar producto
    const handleCloseAddModal = () => {
        setAddModalOpen(false); // Cerrar el modal
    };

    // Función para guardar cambios en el producto editado
    const handleSave = async (e) => {
        e.preventDefault();
        const updatedShoe = {
            ...selectedShoe,
            model: e.target.model.value,
            description: e.target.description.value,
            stock: parseInt(e.target.stock.value, 10),
        };

        try {
            const response = await fetch(`${GET_SHOES_ENDPOINT}/${selectedShoe.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedShoe),
            });

            if (response.ok) {
                window.location.reload(); // Recargar la página para mostrar los cambios
            } else {
                console.error("Error al actualizar el zapato:", response.status);
            }
        } catch (error) {
            console.error("Error al conectar con el backend:", error);
        }
    };


    const [productId, setProductId] = useState(0);  // Estado para llevar el contador del ID

    // Función para agregar un nuevo producto (modificada para usar ADD_PRODUCT_ENDPOINT)
    const handleAddProduct = async (e) => {
        e.preventDefault(); 
    
        // Recopilar los datos del formulario
        const newShoe = {
            id: productId,  // Asignamos el ID actual
            model: e.target.model.value,
            description: e.target.description.value,
            stock: parseInt(e.target.stock.value, 10),
            price: parseFloat(e.target.price.value),
            composition: e.target.composition.value,
            brand: e.target.brand.value,
            image: e.target.image.value,
        };
    
        // Verifica que todos los campos requeridos estén completos y con el formato adecuado
        if (!newShoe.model || !newShoe.description || !newShoe.stock || !newShoe.price || !newShoe.composition || !newShoe.brand || !newShoe.image) {
            console.error("Todos los campos son necesarios.");
            return; // Si algún campo es obligatorio está vacío, no enviamos la solicitud
        }
    
        try {
            // Aquí estamos enviando un objeto con un array de productos bajo la clave `productsToAdd`
            const response = await fetch(ADD_PRODUCT_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productsToAdd: [newShoe] }), // Enviamos el producto dentro de un array
            });
    
            if (response.ok) {
                console.log("Producto agregado correctamente");
                setProductId(productId + 1);  // Incrementar el ID después de agregar un producto
                window.location.reload(); // Recargar la página para reflejar el nuevo producto
            } else {
                const errorData = await response.json();
                console.error("Error al agregar el zapato:", errorData); // Mostrar más detalles del error del servidor
            }
        } catch (error) {
            console.error("Error al conectar con el backend:", error);
        }
    };
    
    
    
    

    const Imagen = (image) => URL_IMAGES + image;

    return (
        <div className="tabla-admin-container">
            <h2>Productos</h2>
            <button className="agregar-btn" onClick={handleAddProductClick}>Agregar producto</button>
            <table className="tabla-admin">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Stock</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {shoes.shoes.map((shoe) => (
                        <tr key={shoe.id}> {/* Usar 'id' único como key */}
                            <td>
                                <img
                                    src={Imagen(shoe.image)} className="shoe-image"
                                    alt={shoe.model}
                                />
                            </td>
                            <td>{shoe.model}</td>
                            <td>{shoe.stock}</td>
                            <td className="acciones">
                                <button
                                    className="edit-btn"
                                    onClick={() => handleEditClick(shoe)} 
                                >
                                    ✏️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para editar producto */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Editar Producto</h3>
                        <form onSubmit={handleSave}>
                            <label>
                                Nombre:
                                <input
                                    name="model"
                                    type="text"
                                    defaultValue={selectedShoe.model}
                                />
                            </label>
                            <label>
                                Descripción:
                                <textarea
                                    name="description"
                                    defaultValue={selectedShoe.description || ""}
                                ></textarea>
                            </label>
                            <label>
                                Stock:
                                <input
                                    name="stock" 
                                    type="number"
                                    defaultValue={selectedShoe.stock}
                                />
                            </label>
                            <div className="modal-actions">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="cancel-btn"
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className="save-btn">
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal para agregar un nuevo producto */}
            {isAddModalOpen && (
    <div className="modal-overlay">
        <div className="modal-content">
            <h3>Agregar Producto</h3>
             <form onSubmit={handleAddProduct}>
                    <label>
                        ID:
                        <input 
                            name="id" 
                            type="text" 
                            value={productId}  // Mostrar el ID actual
                            readOnly 
                        />
                    </label>
                    <label>
                        URL de Imagen:
                        <input name="image" type="text" />
                    </label>
                    <label>
                        Nombre:
                        <input name="model" type="text" />
                    </label>
                    <label>
                        Descripción:
                        <textarea name="description"></textarea>
                    </label>
                    <label>
                        Stock:
                        <input name="stock" type="number" />
                    </label>
                    <label>
                        Precio:
                        <input name="price" type="number" />
                    </label>
                    <label>
                        Composición:
                        <textarea name="composition"></textarea>
                    </label>
                    <label>
                        Marca:
                        <input name="brand" type="text" />
                    </label>
                    <div className="modal-actions">
                        <button
                            type="button"
                            onClick={handleCloseAddModal}
                            className="cancel-btn"
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="save-btn">
                            Agregar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )}

        </div>
    );
}

export default TablaAdmin;
