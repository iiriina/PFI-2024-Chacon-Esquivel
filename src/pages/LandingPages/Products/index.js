import React, { useState, useEffect } from 'react';
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CenteredBlogCard from 'examples/Cards/BlogCards/CenteredBlogCardCompus'; // Tarjeta para computadoras
import { FaSearch } from 'react-icons/fa';
import './index.css';
import Sidebar from 'components/SideBar';
import { getComputadoras } from 'controllers/getComputadoras';  // Función para obtener las computadoras

// Rutas
import routes from "routes";

function Products() {
  const [searchQuery, setSearchQuery] = useState('');  // Estado para la búsqueda
  const [products, setProducts] = useState([]);  // Estado para los productos (computadoras)
  const [loading, setLoading] = useState(false);  // Estado de carga

  // Función para obtener los productos (computadoras)
  const fetchProducts = async (filtros = {}) => {
    setLoading(true);
    try {
      const resultados = await getComputadoras(filtros);  // Llamada a la función para obtener computadoras

      if (Array.isArray(resultados.data)) {
        setProducts(resultados.data);  // Establecer los productos en el estado
      } else {
        setProducts([]);  // Si no hay resultados, vaciar la lista de productos
      }
    } catch (error) {
      console.error("Error al buscar computadoras:", error);
      setProducts([]);  // Manejo de errores
    } finally {
      setLoading(false);  // Terminar el estado de carga
    }
  };

  // UseEffect para obtener productos cuando el componente se monta
  useEffect(() => {
    fetchProducts({ query: '', filtros: {} });
  }, []);

  // Función para manejar cambios en la búsqueda
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Función para realizar la búsqueda
  const handleSearchSubmit = () => {
    fetchProducts({ query: searchQuery });
  };

  // Función para aplicar filtros desde la barra lateral
  const handleApplyFilters = (filters) => {
    console.log("que hay adentro de filters", filters);
    const transformedFilters = {
      query: searchQuery || '',  // Añadir la query si existe
      min_price: filters.min_price || undefined,
      max_price: filters.max_price || undefined
    };

    const cleanedFilters = Object.fromEntries(
      Object.entries(transformedFilters).filter(([, value]) => value !== undefined)
    );

    fetchProducts(cleanedFilters);
  };

  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%" zIndex={10}>
        <DefaultNavbar
          routes={routes}
          action={{
            type: "external",
            route: "https://www.creative-tim.com/product/material-kit-react",
            label: "INICIAR SESIÓN",
            color: "info",
          }}
        />
      </MKBox>
      <MKBox component="section" py={0.5} mt={10}>
        <div className="search-bar-container">
          <FaSearch className="search-icon" onClick={handleSearchSubmit} />
          <input
            type="text"
            placeholder="Buscar computadoras"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
          />
        </div>

        <Container>
          <Grid container spacing={3}>
            {/* Sidebar de filtros */}
            <Grid item xs={12} md={3} lg={2}>
              <Sidebar onApplyFilters={handleApplyFilters} />
            </Grid>

            {/* Listado de productos */}
            <Grid item xs={12} md={9} lg={10}>
              <Grid container spacing={3}>
                {loading ? (
                  <p style={{ textAlign: 'center', width: '100%' }}>Cargando...</p>
                ) : products.length === 0 ? (
                  <p style={{ textAlign: 'center', width: '100%' }}>No se encontraron productos :( Prueba con otra búsqueda</p>
                ) : (
                  products.map((product, index) => (
                    <Grid item xs={12} sm={6} md={3} key={product?._id || index}>
                      {product ? (
                        <CenteredBlogCard
                          image={Array.isArray(product.imagenes) ? product.imagenes[0] : product.imagen}
                          title={`${product.nombre}`}
                          description={product.precio}
                          action={{
                            type: "internal",
                            route: `/computadora/${product._id}`,
                            color: "info",
                            label: "Ver Más",
                          }}
                          product={product} // Pasar el producto completo
                        />
                      ) : (
                        <p>Producto no disponible</p>  // Mostrar un mensaje alternativo si el producto no está disponible
                      )}
                    </Grid>
                  ))
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </MKBox>
    </>
  );
}

export default Products;
