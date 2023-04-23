const express = require('express');
const mysql = require('mysql');
require('dotenv').config();

const app = express();

// Cria uma conexão com o banco de dados
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Realiza a conexão com o banco de dados
connection.connect((error) => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida!');
});

// Define a rota para buscar os dados da tabela
app.get('/', (req, res) => {
  // Executa a consulta no banco de dados
  connection.query('SELECT nome, telefone FROM tabela', (error, results) => {
    if (error) {
      console.error('Erro ao executar consulta:', error);
      res.status(500).send('Erro ao buscar dados da tabela');
      return;
    }

    // Envia os resultados para o navegador
    res.send(results);
  });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
