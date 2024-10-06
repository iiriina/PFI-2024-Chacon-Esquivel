import React, { useState } from "react";
import Card from "@mui/material/Card";
import MKTypography from "components/MKTypography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PropTypes from 'prop-types';

function Sidebar({ onApplyFilters }) {
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const handleApplyFilters = () => {
    const filters = {
      min_price: minPrice,
      max_price: maxPrice
    };
    onApplyFilters(filters);
  };



  return (
    <Card sx={{ p: 2, borderRadius: "lg", boxShadow: "lg", backgroundColor: "white", height: "100%" }}>
      <MKTypography variant="h6" mb={2}>
        Filtros
      </MKTypography>

      {/* Filtro de precio */}
      <MKTypography variant="body2" mb={1}>
        Rango de Precio
      </MKTypography>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
        <TextField
          label="Mínimo"
          type="number"
          value={minPrice || ''}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          label="Máximo"
          type="number"
          value={maxPrice || ''}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          variant="outlined"
          size="small"
          fullWidth
        />
      </div>


      {/* Botón aplicar filtros */}
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleApplyFilters}>
        Aplicar Filtros
      </Button>
    </Card>
  );
}

// Validación de PropTypes para onApplyFilters
Sidebar.propTypes = {
  onApplyFilters: PropTypes.func.isRequired,
};

export default Sidebar;
