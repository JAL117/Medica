import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Button, Modal, Box, Typography, IconButton
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Visibility as VisibilityIcon, 
  Add as AddIcon, 
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';

// Estilos para el modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const HistorialClinico = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isViewReportsModalOpen, setIsViewReportsModalOpen] = useState(false);
  const [newReport, setNewReport] = useState({ details: '', asunto: '', diagnostico: '', medicacion: '', estado: '' });

  useEffect(() => {
    const mockPatients = [
      { id: 1, name: 'Juan Pérez', reports: [{ id: 1, date: '2024-07-30', details: 'Consulta de rutina', asunto: 'Consulta', diagnostico: 'Sano', medicacion: 'Ninguna', estado: 'Completo' }] },
      { id: 2, name: 'María García', reports: [] },
    ];
    setPatients(mockPatients);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewReports = (patient) => {
    setSelectedPatient(patient);
    setIsViewReportsModalOpen(true);
  };

  const handleAddReport = (patient) => {
    setSelectedPatient(patient);
    setIsReportModalOpen(true);
  };

  const handleDeletePatient = (patientId) => {
    setPatients(patients.filter(p => p.id !== patientId));
  };

  const handleReportSubmit = () => {
    if (selectedPatient && newReport.details) {
      const updatedPatients = patients.map(p => {
        if (p.id === selectedPatient.id) {
          return {
            ...p,
            reports: [...p.reports, { id: Date.now(), date: new Date().toISOString().split('T')[0], ...newReport }]
          };
        }
        return p;
      });
      setPatients(updatedPatients);
      setIsReportModalOpen(false);
      setNewReport({ details: '', asunto: '', diagnostico: '', medicacion: '', estado: '' });
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ 
      marginLeft:"5%", 
      height: "50vh",
      marginTop:"5%",
      width: "100%",
      maxWidth: "90%",
      padding: "1rem",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)", }}>
      <Typography variant="h4" gutterBottom className='mb-5' color={"#4CAF50"}>
        Reportes Clínicos
      </Typography>

      <TextField
        label="Buscar paciente"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
        style={{ marginBottom: '20px' }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre del Paciente</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell component="th" scope="row">
                  {patient.name}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleViewReports(patient)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => handleAddReport(patient)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeletePatient(patient.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

  
      <Modal
        open={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Agregar Reporte
          </Typography>
          <TextField
            label="Asunto"
            value={newReport.asunto}
            onChange={(e) => setNewReport({ ...newReport, asunto: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Diagnóstico"
            value={newReport.diagnostico}
            onChange={(e) => setNewReport({ ...newReport, diagnostico: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Medicación"
            value={newReport.medicacion}
            onChange={(e) => setNewReport({ ...newReport, medicacion: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Estado"
            value={newReport.estado}
            onChange={(e) => setNewReport({ ...newReport, estado: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Detalles del reporte"
            multiline
            rows={4}
            value={newReport.details}
            onChange={(e) => setNewReport({ ...newReport, details: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleReportSubmit} variant="contained" color="primary">
            Guardar Reporte
          </Button>
        </Box>
      </Modal>

      {/* Modal para ver reportes */}
      <Modal
        open={isViewReportsModalOpen}
        onClose={() => setIsViewReportsModalOpen(false)}
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Reportes del Paciente
          </Typography>
          {selectedPatient && selectedPatient.reports.map((report) => (
            <Box key={report.id} mt={2}>
              <Typography variant="subtitle1">Fecha: {report.date}</Typography>
              <Typography variant="subtitle1">Asunto: {report.asunto}</Typography>
              <Typography variant="subtitle1">Diagnóstico: {report.diagnostico}</Typography>
              <Typography variant="subtitle1">Medicación: {report.medicacion}</Typography>
              <Typography variant="subtitle1">Estado: {report.estado}</Typography>
              <Typography variant="body1">Detalles: {report.details}</Typography>
            </Box>
          ))}
        </Box>
      </Modal>
    </div>
  );
};

export default HistorialClinico;
