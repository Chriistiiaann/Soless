import React, { useEffect, useState } from "react";
import "./styles/Module.TablaAdmin.css";
import { useShoesContext } from "../context_providers/ShoesProvider";
import { GET_SHOES_ENDPOINT, ADD_PRODUCT_ENDPOINT, PUT_SHOES_ENDPOINT } from "../config";
import { URL_IMAGES } from "../config";

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
            brand: e.target.brand.value,
            model: e.target.model.value,
            description: e.target.description.value,
            composition: e.target.composition.value,
            original_Price: parseFloat(e.target.price.value),
            discount_Price: parseFloat(e.target.discount_price.value),
            stock: parseInt(e.target.stock.value, 10),
        };
    
        try {
            
            const response = await fetch(PUT_SHOES_ENDPOINT + updatedShoe.id, {
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
                window.location.reload();
            }
        } catch (error) {
            console.error("Error al conectar con el backend:", error);
        }
    };
    

    // Función para agregar un nuevo producto
    const handleAddProduct = async (e) => {
        e.preventDefault(); 
    
        const newShoe = {
            id: 0,
            brand: e.target.brand.value,
            model: e.target.model.value,
            description: e.target.description.value,
            composition: e.target.composition.value,
            img_Name: e.target.image.value,
            original_Price: parseFloat(e.target.price.value),
            discount_Price: parseFloat(e.target.discount_price.value),
            stock: parseInt(e.target.stock.value, 10),
        };
    
        console.log(newShoe);//poner ! a la descripcion
        if (!newShoe.model || !newShoe.description || !newShoe.stock || !newShoe.original_Price || !newShoe.composition || !newShoe.brand || !newShoe.img_Name || !newShoe.discount_Price) {
            console.error("Todos los campos son necesarios.");
            return; 
        }
    
        try {
            const response = await fetch(ADD_PRODUCT_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newShoe),
            });
    
            if (response.ok) {
                console.log("Producto agregado correctamente");
                window.location.reload(); 
            } else {
                const errorData = await response.json();
                console.error("Error al agregar el zapato:", errorData);
            }
        } catch (error) {
            console.error("Error al conectar con el backend:", error);
        }
    };

    return (
        <div className="tabla-admin-container">
            <h2>Productos</h2>
            <button className="agregar-btn" onClick={handleAddProductClick}>Agregar producto</button>
            <table className="tabla-admin">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Marca</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Composición</th>
                        <th>Precio</th>
                        <th>Precio en descuento</th>
                        <th>Stock</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {shoes.shoes.map((shoe) => {
                        console.log(shoe);
                        return (
                            <tr key={shoe.id}>
                                <td>

                                    <img
                                        src={URL_IMAGES + shoe.img_Name} className="shoe-image" alt={shoe.model}
                                    />
                                </td>
                                <td>{shoe.brand}</td>
                                <td>{shoe.model}</td>
                                <td>{shoe.description}</td>
                                <td>{shoe.composition}</td>
                                <td>{shoe.original_Price}€</td>
                                <td>{shoe.discount_Price}€</td>

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
                        );
                    })}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Editar Producto</h3>
                        <form onSubmit={handleSave}>
                            <label>
                                Marca:
                                <input
                                    name="brand"
                                    type="text"
                                    defaultValue={selectedShoe.brand}
                                />
                            </label>
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
                                Composición:
                                <textarea
                                    name="composition"
                                    defaultValue={selectedShoe.composition}
                                ></textarea>
                            </label>
                            <label>
                                Precio:
                                <input
                                    name="price"
                                    type="number"
                                    defaultValue={selectedShoe.original_Price}
                                />
                            </label>
                            <label>
                                Precio en descuento:
                                <input
                                    name="discount_price"
                                    type="number"
                                    defaultValue={selectedShoe.discount_Price}
                                />
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

            {isAddModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Agregar Producto</h3>
                        <form onSubmit={handleAddProduct}>
                        <label>
                                Marca:
                                <input
                                    name="brand"
                                    type="text"
                                />
                            </label>
                            <label>
                                Nombre:
                                <input
                                    name="model"
                                    type="text"
                                />
                            </label>
                            <label>
                                Descripción:
                                <textarea
                                    name="description"
                                ></textarea>
                            </label>
                            <label>
                                Composición:
                                <textarea
                                    name="composition"
                                ></textarea>
                            </label>
                            <label>
                                Imagen:
                                <input
                                    name="image"
                                    type="text"
                                />
                            </label>
                            <label>
                                Precio:
                                <input
                                    name="price"
                                    type="number"
                                />
                            </label>
                            <label>
                                Precio en descuento:
                                <input
                                    name="discount_price"
                                    type="number"
                                />
                            </label>
                            <label>
                                Stock:
                                <input
                                    name="stock" 
                                    type="number"
                                />
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