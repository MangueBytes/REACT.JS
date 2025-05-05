const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Adicionamos o Axios para fazer requisições HTTP
const app = express();

app.use(cors());
app.use(express.json());

// Rota que consulta a API ViaCEP
app.get('/cep/:cep', async (req, res) => {
  try {
    const { cep } = req.params;
    const cepNumerico = cep.replace(/\D/g, '');
    
    if (cepNumerico.length !== 8) {
      return res.status(400).json({ error: 'CEP deve conter 8 dígitos' });
    }

    // Faz a requisição para a API ViaCEP
    const response = await axios.get(`https://viacep.com.br/ws/${cepNumerico}/json/`);
    
    if (response.data.erro) {
      return res.status(404).json({ error: 'CEP não encontrado' });
    }

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    res.status(500).json({ error: 'Erro ao consultar o serviço de CEP' });
  }
});

// Rota para servir o front-end
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/REACT_FalandoComBack1.html');
});

app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
