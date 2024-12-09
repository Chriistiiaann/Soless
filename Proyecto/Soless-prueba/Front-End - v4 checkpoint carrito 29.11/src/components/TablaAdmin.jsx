import React, { useEffect, useState } from "react";
import "./styles/Module.TablaAdmin.css";
import { useShoesContext } from "../context_providers/ShoesProvider";
import { GET_SHOES_ENDPOINT } from "../config";
import { URL_IMAGES } from "../config";
import { ADD_PRODUCT_ENDPOINT, PUT_SHOES_ENDPOINT } from "../config";

function TablaAdmin() {
    const shoes = useShoesContext(); 
    const [isModalOpen, setModalOpen] = useState(false); 
    const [isAddModalOpen, setAddModalOpen] = useState(false); 
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
        setAddModalOpen(true); 
    };

    // Cerrar modal de agregar producto
    const handleCloseAddModal = () => {
        setAddModalOpen(false); 
    };

    // Función para guardar cambios en el producto editado
    const handleSave = async (e) => {
        e.preventDefault();
    
        if (!selectedShoe || !selectedShoe.id) {
            console.error("El zapato seleccionado no tiene un ID válido.");
            return;
        }
    
        const updatedShoe = {
            id: selectedShoe.id, 
            model: e.target.model.value,
            description: e.target.description.value,
            stock: parseInt(e.target.stock.value, 10),
        };
    
        try {
            const response = await fetch(PUT_SHOES_ENDPOINT, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedShoe),
            });
    
            if (!response.ok) {
                const errorDetails = await response.text();
                console.error("Error al actualizar el zapato:", response.status, errorDetails);
            } else {
                console.log("Zapato actualizado con éxito.");
                fetchShoes(); // Recarga los productos después de la actualización
                setModalOpen(false); // Cierra el modal
            }
        } catch (error) {
            console.error("Error al conectar con el backend:", error);
        }
    };

    // Función para agregar un nuevo producto
    const handleAddProduct = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const newShoe = {
            model: formData.get("model"),
            description: formData.get("description"),
            stock: parseInt(formData.get("stock"), 10),
            price: parseFloat(formData.get("price")),
            composition: formData.get("composition"),
            brand: formData.get("brand"),
            image: formData.get("image"),
        };
    
        try {
            const response = await fetch(ADD_PRODUCT_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newShoe),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error en el servidor: ${response.status}`, errorText);
            } else {
                console.log("Producto agregado con éxito.");
                fetchShoes(); // Recarga los productos después de agregar uno nuevo
                setAddModalOpen(false); // Cierra el modal
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
                        <tr key={shoe.id}>
                            <td>
                                <img
                                    src={Imagen(shoe.image)} className="shoe-image"
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

            {/* Modal de edición */}
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

            {/* Modal de agregar producto */}
            {isAddModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Agregar Producto</h3>
                        <form onSubmit={handleAddProduct}>
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
                            <label>
                                Imagen URL:
                                <input name="image" type="text" />
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