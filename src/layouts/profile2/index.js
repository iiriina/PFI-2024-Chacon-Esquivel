// @mui material components
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";

// Overview page components
import Header from "./componentes/Header2";

// Data
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import MKBox from "components/MKBox";
import routes from "routes";
import defaultComputerImage from "assets/images/268868_u7nsk3.png"; // Cambia esto por la ruta correcta de tu imagen.

// API URL
const API_URL = "http://localhost:4000/api/computer-prediction/computerPorId";

function Overview() {
  const { id } = useParams(); // Obtener el ID de la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product data by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {

        console.log("API url ", API_URL)
        console.log("id ", id)

        const response = await fetch(`${API_URL}?id_computer=${id}`);
        const data = await response.json();

        if (response.ok) {
          setProduct(data.data);
        } else {
          console.error("Error fetching product:", data.message);
        }
      } catch (error) {
        console.error("Error al obtener el producto", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>; // Mostrar un mensaje de carga mientras se obtienen los datos
  }

  // Si el producto es null o undefined, retornar un mensaje de error
  if (!product) {
    return <p>No se encontró la computadora.</p>;
  }

  // Conditionally render only fields that are not "N/A" or null
  const productInfo = {
    "Procesador": product?.procesador || "No disponible",
    "Sistema Operativo": product?.OS || product?.sistema_operativo || "No disponible",
    "Placa Gráfica": product?.placaGrafica || "No disponible",
    "RAM": product?.RAM || "No disponible",
    "Almacenamiento": product?.almacenamiento || "No disponible",
    "Tamaño Pantalla": product?.tamanio || "No disponible",
    "Resolución Pantalla": product?.resolucionPantalla || "No disponible",
    "Batería": product?.bateria || "No disponible",
    "Peso": product?.peso || "No disponible",
    Precio: product?.precio ? `$${product.precio}` : "No disponible",
    "Precio en Argentina": product?.precioArg ? `$${product.precioArg}` : "No disponible",
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
          transparent
          light
        />
      </MKBox>

      <Header title={product?.nombre || "Producto"} />
      <SoftBox mt={6} mb={3}>
        <Grid container spacing={3}>
          {/* Columna para la imagen del producto */}
          <Grid item xs={12} md={4} xl={3}>
            <SoftBox
              sx={{
                position: "relative",
                mt: -8,
                ml: 3,
                mr: 3,
                p: 2,
                borderRadius: "lg",
                backgroundColor: "white", // Fondo blanco
                boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
              }}
            >
              <img
                src={Array.isArray(product?.imagenes) ? product?.imagenes[0] : defaultComputerImage} // Imagen del producto o una imagen por defecto
                alt={product?.nombre || "Producto"}
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </SoftBox>
          </Grid>

          {/* Columna para la información del producto */}
          <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="Información Del Producto"
              description={`Marca: ${product?.marca || "N/A"} - Modelo: ${product?.modelo || "N/A"}`}
              info={productInfo} // Render filtered info
            />
          </Grid>

          {/* Columna para ProfilesList */}
          <Grid item xs={12} xl={4}>
            {/* Pass the product price as a prop */}
            <ProfilesList title="Impuestos" productPrice={product?.precio} />
          </Grid>
        </Grid>
      </SoftBox>
    </>
  );
}

export default Overview;
