const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para parsear o corpo das requisições
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Lista para armazenar os dados de cadastro
let usuarios = [];

// Rota para exibir o formulário HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'G58cadastro.html'));
});

// Rota para lidar com a submissão do formulário
app.post('/cadastro-usuario', (req, res) => {
    const { nome, idade, nickname, email, senha } = req.body;
    // Armazenar os dados no array de usuários
    usuarios.push({ nome, idade, nickname, email, senha });
    // Redirecionar para a página de gerenciamento após o cadastro
    res.redirect('/gerenciamento');
});

// Rota para exibir a página de gerenciamento
app.get('/gerenciamento', (req, res) => {
    // Enviar o HTML com os dados de usuários
    res.send(`
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Gerenciamento de Conta</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
          </head>
          <body class="bg-light">
            <div class="container mt-5">
              <div class="row">
                <div class="col-md-6">
                  <div class="card">
                    <div class="card-header">
                      <h3>Gerenciar Seus Dados</h3>
                    </div>
                    <div class="card-body">
                      <form>
                        <div class="mb-3">
                          <label for="nome" class="form-label">Nome</label>
                          <input type="text" class="form-control" id="nome" value="${usuarios[usuarios.length - 1].nome}" required>
                        </div>
                        <div class="mb-3">
                          <label for="idade" class="form-label">Idade</label>
                          <input type="number" class="form-control" id="idade" value="${usuarios[usuarios.length - 1].idade}" required>
                        </div>
                        <div class="mb-3">
                          <label for="nickname" class="form-label">Nickname de Usuário</label>
                          <input type="text" class="form-control" id="nickname" value="${usuarios[usuarios.length - 1].nickname}" required>
                        </div>
                        <div class="mb-3">
                          <label for="email" class="form-label">E-mail</label>
                          <input type="email" class="form-control" id="email" value="${usuarios[usuarios.length - 1].email}" required>
                        </div>
                        <div class="mb-3">
                          <label for="senha" class="form-label">Senha</label>
                          <input type="password" class="form-control" id="senha" value="${usuarios[usuarios.length - 1].senha}" required>
                        </div>
                        <div class="d-grid">
                          <button type="submit" class="btn btn-primary">Atualizar Dados</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card">
                    <div class="card-header">
                      <h3>Dados de Outros Usuários</h3>
                    </div>
                    <div class="card-body">
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Idade</th>
                            <th scope="col">Nickname</th>
                            <th scope="col">E-mail</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${usuarios.map(usuario => `
                            <tr>
                              <td>${usuario.nome}</td>
                              <td>${usuario.idade}</td>
                              <td>${usuario.nickname}</td>
                              <td>${usuario.email}</td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
          </body>
        </html>
    `);
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
