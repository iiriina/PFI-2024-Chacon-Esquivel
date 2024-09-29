import React, { useState, useEffect } from 'react';
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CenteredBlogCard from "examples/Cards/BlogCards/CenteredBlogCard";
import { FaSearch } from 'react-icons/fa';
import './index.css';
import Sidebar from 'components/SideBar';
import { getComputadoras } from 'controllers/getComputadoras';

// Routes
import routes from "routes";

function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (filtros = {}) => {
    setLoading(true);
    try {
      const resultados = await getComputadoras(filtros);

      if (Array.isArray(resultados.data)) {
        setProducts(resultados.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error al buscar computadoras:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts({ query: '', filtros: {} });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    fetchProducts({ query: searchQuery });
  };

  const handleApplyFilters = (filters) => {

    console.log("que hay adentro de filters", filters);
    const transformedFilters = {
      query: searchQuery || '', // Añadir la query si existe
      min_price: filters.min_price || undefined,
      max_price: filters.max_price || undefined,
      min_dimension: filters.min_dimension || undefined,
      max_dimension: filters.max_dimension || undefined,
      min_peso: filters.min_peso || undefined,
      max_peso: filters.max_peso || undefined,
      min_duracion_bateria: filters.min_duracion_bateria || undefined,
      max_duracion_bateria: filters.max_duracion_bateria || undefined,
      min_ram: filters.ram.length > 0 ? Math.min(...filters.ram.map(Number)) : undefined,
      max_ram: filters.ram.length > 0 ? Math.max(...filters.ram.map(Number)) : undefined,
      min_almacenamiento: filters.almacenamiento.length > 0 ? Math.min(...filters.almacenamiento.map(Number)) : undefined,
      max_almacenamiento: filters.almacenamiento.length > 0 ? Math.max(...filters.almacenamiento.map(Number)) : undefined,
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
            <Grid item xs={12} md={3} lg={2}>
              <Sidebar onApplyFilters={handleApplyFilters} />
            </Grid>

            <Grid item xs={12} md={9} lg={10}>
              <Grid container spacing={3}>
                {loading ? (
                  <p style={{ textAlign: 'center', width: '100%' }}>Cargando...</p>
                ) : products.length === 0 ? (
                  <p style={{ textAlign: 'center', width: '100%' }}>No se encontraron productos :( Prueba con otra búsqueda</p>
                ) : (
                  products.map((product, index) => (
                    <Grid item xs={12} sm={6} md={3} key={product._id || index}>
                      <CenteredBlogCard
                        image={product.imagen}
                        title={`${product.marca} - ${product.modelo}`}
                        description={product.descripcion.split('.')[0] + '.'}
                        action={{
                          type: "internal",
                          route: "/product-detail",
                          color: "info",
                          label: "Ver detalles",
                        }}
                      />
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
