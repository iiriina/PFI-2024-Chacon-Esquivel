import React, { useState } from "react";
import Card from "@mui/material/Card";
import MKTypography from "components/MKTypography";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import PropTypes from 'prop-types';
import FormControl from "@mui/material/FormControl";

function SideBarCelulares({ onApplyFilters }) {
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minDimension, setMinDimension] = useState(null);
  const [maxDimension, setMaxDimension] = useState(null);
  const [minPeso, setMinPeso] = useState(null);
  const [maxPeso, setMaxPeso] = useState(null);
  const [minResolucionPpi, setMinResolucionPpi] = useState(null);
  const [maxResolucionPpi, setMaxResolucionPpi] = useState(null);
  const [selectedAlmacenamiento, setSelectedAlmacenamiento] = useState('');
  const [minCameraMp, setMinCameraMp] = useState(null);
  const [maxCameraMp, setMaxCameraMp] = useState(null);

  const handleApplyFilters = () => {
    const filters = {
      min_price: minPrice,
      max_price: maxPrice,
      min_dimension: minDimension,
      max_dimension: maxDimension,
      min_peso: minPeso,
      max_peso: maxPeso,
      min_resolucion_ppi: minResolucionPpi,
      max_resolucion_ppi: maxResolucionPpi,
      min_almacenamiento: selectedAlmacenamiento || null,
      max_almacenamiento: selectedAlmacenamiento || null,
      min_camera_mp: minCameraMp,
      max_camera_mp: maxCameraMp,
    };
    onApplyFilters(filters);
  };

  const handleAlmacenamientoChange = (value) => {
    if (selectedAlmacenamiento === value) {
      setSelectedAlmacenamiento('');
    } else {
      setSelectedAlmacenamiento(value);
    }
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

      {/* Filtro de dimensiones */}
      <MKTypography variant="body2" mt={3} mb={1}>
        Dimensiones (pulgadas)
      </MKTypography>
      <Slider
        value={[minDimension || 4, maxDimension || 7]}
        onChange={(e, newValue) => { setMinDimension(newValue[0]); setMaxDimension(newValue[1]); }}
        valueLabelDisplay="auto"
        min={4}
        max={7}
        step={0.1} // Permitir pasos de 0.1 para manejar valores decimales
      />
      <MKTypography variant="body2" mt={1}>
        Dimensión: {minDimension || 4}&quot; - {maxDimension || 7}&quot;
      </MKTypography>

      {/* Filtro de peso */}
      <MKTypography variant="body2" mt={3} mb={1}>
        Peso (gramos)
      </MKTypography>
      <Slider
        value={[minPeso || 100, maxPeso || 300]}
        onChange={(e, newValue) => { setMinPeso(newValue[0]); setMaxPeso(newValue[1]); }}
        valueLabelDisplay="auto"
        min={100}
        max={300}
      />
      <MKTypography variant="body2" mt={1}>
        Peso: {minPeso || 100}g - {maxPeso || 300}g
      </MKTypography>

      {/* Filtro de resolución (ppi) */}
      <MKTypography variant="body2" mt={3} mb={1}>
        Resolución (ppi)
      </MKTypography>
      <Slider
        value={[minResolucionPpi || 200, maxResolucionPpi || 600]}
        onChange={(e, newValue) => { setMinResolucionPpi(newValue[0]); setMaxResolucionPpi(newValue[1]); }}
        valueLabelDisplay="auto"
        min={200}
        max={600}
      />
      <MKTypography variant="body2" mt={1}>
        Resolución: {minResolucionPpi || 200} ppi - {maxResolucionPpi || 600} ppi
      </MKTypography>

      {/* Filtro de almacenamiento */}
      <MKTypography variant="body2" mt={3} mb={1}>
        Almacenamiento (GB)
      </MKTypography>
      <FormControl component="fieldset">
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedAlmacenamiento === "64"}
              onChange={() => handleAlmacenamientoChange("64")}
            />
          }
          label="64GB"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedAlmacenamiento === "128"}
              onChange={() => handleAlmacenamientoChange("128")}
            />
          }
          label="128GB"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedAlmacenamiento === "256"}
              onChange={() => handleAlmacenamientoChange("256")}
            />
          }
          label="256GB"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedAlmacenamiento === "512"}
              onChange={() => handleAlmacenamientoChange("512")}
            />
          }
          label="512GB"
        />
      </FormControl>

      {/* Filtro de cámara (MP) */}
      <MKTypography variant="body2" mt={3} mb={1}>
        Cámara (MP)
      </MKTypography>
      <Slider
        value={[minCameraMp || 8, maxCameraMp || 108]}
        onChange={(e, newValue) => { setMinCameraMp(newValue[0]); setMaxCameraMp(newValue[1]); }}
        valueLabelDisplay="auto"
        min={8}
        max={108}
      />
      <MKTypography variant="body2" mt={1}>
        Cámara: {minCameraMp || 8} MP - {maxCameraMp || 108} MP
      </MKTypography>

      {/* Botón aplicar filtros */}
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleApplyFilters}>
        Aplicar Filtros
      </Button>
    </Card>
  );
}

// Validación de PropTypes para onApplyFilters
SideBarCelulares.propTypes = {
  onApplyFilters: PropTypes.func.isRequired,
};

export default SideBarCelulares;
