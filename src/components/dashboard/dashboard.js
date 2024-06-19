import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Registrar os componentes do Chart.js
Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [empresa, setEmpresa] = useState('');
    const [reconhecimentos, setReconhecimentos] = useState([]);
    const [canteiro, setCanteiro] = useState('');
    const [funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const empresaUsuario = JSON.parse(localStorage.getItem('usuarioLogado'));
                const { empresaID } = empresaUsuario;

                const response = await fetch(`https://localhost:8080/ReconhecimentoEPI/total-reconhecimentos-por-dia-semana/${empresaID}`);
                if (!response.ok) {
                    throw new Error('Falha ao buscar dados');
                }

                const data = await response.json();
                setEmpresa(data.empresa);
                setReconhecimentos(data.totalReconhecimentosPorDia);

                const response1 = await fetch(`https://localhost:8080/Empresas/${empresaID}/detalhes`);
                if (!response1.ok) {
                    throw new Error('Falha ao buscar dados');
                }

                const data1 = await response1.json();
                if (data1.length > 0) {
                    const detalhes = data1[0];
                    setCanteiro(detalhes.canteiroDeObra);
                    setFuncionarios(detalhes.funcionarios);
                }
                debugger;

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    const totalReconhecimentosPorFuncionario = () => {
        const total = {};
        if (funcionarios && Array.isArray(funcionarios)) {
            funcionarios.forEach(funcionario => {
                if (!total[funcionario.funcionario]) {
                    total[funcionario.funcionario] = 0;
                }
                total[funcionario.funcionario]++;
            });
        }
        return total;
    };

    const conformidadeUsoEPI = () => {
        const conformidade = [];
        if (funcionarios && Array.isArray(funcionarios)) {
            funcionarios.forEach(funcionario => {
                conformidade.push({
                    dataHora: funcionario.dataHora,
                    usoEPI: funcionario.usoEPI ? 1 : 0
                });
            });
        }
        return conformidade;
    };

    const barData = {
        labels: reconhecimentos.map(item => new Date(item.data).toLocaleDateString()),
        datasets: [
            {
                label: 'Total Reconhecimentos',
                data: reconhecimentos.map(item => item.totalReconhecimentos),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const lineData = {
        labels: reconhecimentos.map(item => new Date(item.data).toLocaleDateString()),
        datasets: [
            {
                label: 'Total Reconhecimentos',
                data: reconhecimentos.map(item => item.totalReconhecimentos),
                fill: false,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    const barData1 = {
        labels: Object.keys(totalReconhecimentosPorFuncionario()),
        datasets: [
            {
                label: 'Total Reconhecimentos por Funcionário',
                data: Object.values(totalReconhecimentosPorFuncionario()),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const lineData1 = {
        labels: conformidadeUsoEPI().map(item => new Date(item.dataHora).toLocaleTimeString()),
        datasets: [
            {
                label: 'Conformidade do Uso de EPI',
                data: conformidadeUsoEPI().map(item => item.usoEPI),
                fill: false,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
            },
        ],
    };

    const barOptions1 = {
        responsive: true,
        maintainAspectRatio: false,
    };

    const lineOptions1 = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard - {empresa}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                    <Paper sx={{ p: 2, height: 300 }}>
                        <Typography variant="h6" gutterBottom>
                            Total de Reconhecimentos Diários
                        </Typography>
                        <Bar data={barData} options={barOptions} />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Paper sx={{ p: 2, height: 300 }}>
                        <Typography variant="h6" gutterBottom>
                            Reconhecimentos ao Longo do Tempo
                        </Typography>
                        <Line data={lineData} options={lineOptions} />
                    </Paper>
                </Grid>
            </Grid>
            <Box sx={{ flexGrow: 1, p: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Dashboard - {canteiro}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                        <Paper sx={{ p: 2, height: 300 }}>
                            <Typography variant="h6" gutterBottom>
                                Total de Reconhecimentos por Funcionário
                            </Typography>
                            <Bar data={barData1} options={barOptions1} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Paper sx={{ p: 2, height: 300 }}>
                            <Typography variant="h6" gutterBottom>
                                Conformidade do Uso de EPI ao Longo do Tempo
                            </Typography>
                            <Line data={lineData1} options={lineOptions1} />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Dashboard;
