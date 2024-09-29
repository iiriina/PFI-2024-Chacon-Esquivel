import React, { useState } from "react";
import Card from "@mui/material/Card";
import MKTypography from "components/MKTypography";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from 'prop-types';

function Sidebar({ onApplyFilters }) {
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minDimension, setMinDimension] = useState(null);
  const [maxDimension, setMaxDimension] = useState(null);
  const [minPeso, setMinPeso] = useState(null);
  const [maxPeso, setMaxPeso] = useState(null);
  const [minDuracionBateria, setMinDuracionBateria] = useState(null);
  const [maxDuracionBateria, setMaxDuracionBateria] = useState(null);
  const [selectedRam, setSelectedRam] = useState([]);
  const [selectedAlmacenamiento, setSelectedAlmacenamiento] = useState([]);

  const handleApplyFilters = () => {
    const filters = {
      min_price: minPrice,
      max_price: maxPrice,
      min_dimension: minDimension,
      max_dimension: maxDimension,
      min_peso: minPeso,
      max_peso: maxPeso,
      min_duracion_bateria: minDuracionBateria,
      max_duracion_bateria: maxDuracionBateria,
      ram: selectedRam,
      almacenamiento: selectedAlmacenamiento,
    };
    onApplyFilters(filters);
  };

  const handleRamChange = (event) => {
    const value = event.target.value;
    setSelectedRam((prevSelectedRam) =>
      prevSelectedRam.includes(value)
        ? prevSelectedRam.filter((ram) => ram !== value)
        : [...prevSelectedRam, value]
    );
  };

  const handleAlmacenamientoChange = (event) => {
    const value = event.target.value;
    setSelectedAlmacenamiento((prevSelectedAlmacenamiento) =>
      prevSelectedAlmacenamiento.includes(value)
        ? prevSelectedAlmacenamiento.filter((almacenamiento) => almacenamiento !== value)
        : [...prevSelectedAlmacenamiento, value]
    );
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
        value={[minDimension || 10, maxDimension || 17]}
        onChange={(e, newValue) => { setMinDimension(newValue[0]); setMaxDimension(newValue[1]); }}
        valueLabelDisplay="auto"
        min={10}
        max={17}
      />
      <MKTypography variant="body2" mt={1}>
        Dimensión: {minDimension || 10}&quot; - {maxDimension || 17}&quot;
      </MKTypography>

      {/* Filtro de peso */}
      <MKTypography variant="body2" mt={3} mb={1}>
        Peso (gramos)
      </MKTypography>
      <Slider
        value={[minPeso || 1120, maxPeso || 2500]}
        onChange={(e, newValue) => { setMinPeso(newValue[0]); setMaxPeso(newValue[1]); }}
        valueLabelDisplay="auto"
        min={1120}
        max={2500}
      />
      <MKTypography variant="body2" mt={1}>
        Peso: {minPeso || 1120}g - {maxPeso || 2500}g
      </MKTypography>

      {/* Filtro de duración de batería */}
      <MKTypography variant="body2" mt={3} mb={1}>
        Duración de batería (horas)
      </MKTypography>
      <Slider
        value={[minDuracionBateria || 7, maxDuracionBateria || 22]}
        onChange={(e, newValue) => { setMinDuracionBateria(newValue[0]); setMaxDuracionBateria(newValue[1]); }}
        valueLabelDisplay="auto"
        min={7}
        max={22}
      />
      <MKTypography variant="body2" mt={1}>
        Duración: {minDuracionBateria || 7}h - {maxDuracionBateria || 22}h
      </MKTypography>

      {/* Filtro de RAM */}
      <MKTypography variant="body2" mt={3} mb={1}>
        RAM (GB)
      </MKTypography>
      <FormControlLabel
        control={
          <Checkbox
            value="8"
            checked={selectedRam.includes("8")}
            onChange={handleRamChange}
          />
        }
        label="8GB"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="16"
            checked={selectedRam.includes("16")}
            onChange={handleRamChange}
          />
        }
        label="16GB"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="32"
            checked={selectedRam.includes("32")}
            onChange={handleRamChange}
          />
        }
        label="32GB"
      />

      {/* Filtro de almacenamiento */}
      <MKTypography variant="body2" mt={3} mb={1}>
        Almacenamiento (GB)
      </MKTypography>
      <FormControlLabel
        control={
          <Checkbox
            value="256"
            checked={selectedAlmacenamiento.includes("256")}
            onChange={handleAlmacenamientoChange}
          />
        }
        label="256GB"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="512"
            checked={selectedAlmacenamiento.includes("512")}
            onChange={handleAlmacenamientoChange}
          />
        }
        label="512GB"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="1024"
            checked={selectedAlmacenamiento.includes("1024")}
            onChange={handleAlmacenamientoChange}
          />
        }
        label="1024GB"
      />

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
