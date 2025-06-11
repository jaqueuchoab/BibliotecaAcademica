### Prova III | Desenvolvimento Web

#### Biblioteca Academica
<p> Criação de uma API RestFull capaz de relacionar um orientador e um trabalho, realizando inserção, atualização, leitura e delete.</p>

#### Etapas de Desenvolvimento
<b>1. Configuração:</b>

```config/database.js```

Arquivo que configura e testa a conexão com o Banco de Dados por meio da dependência ```mysql2``` e do arquivo ```.env``` que contém as credênciais do BD.

Além da configuração da conexão com o BD, também houve a adição do script:

 `"dev": "nodemon src/app.js"`

Auxiliar no desenvolvimento no que diz respeito a mudanças de código.

`mkdir -p src/{config,controllers,models,services,routes}`

Estruturação de páginas.

<b>2. Criação dos Models:</b>

<p>Camada que tem como objetivo fornecer funções que executam operações no banco de dados, usando SQL, de forma organizada e reutilizável.</p>

<p>Models com funcionalidades de busca, inserção e atualização de dados.</p>
<p>Com um padrão de criar a função, indicar seus parâmetros, declarar a constante da query, utilizar a conexão para ter acesso a função <strong>connection.query</strong> que é capaz de manipular o banco com os dados necessários. Como por exemplo:</p>

```
create: (data, callback) => {
  const query = 'INSERT INTO orientadores (nome) VALUES (?)';
  connection.query(query, [data.nome], callback);
}
```

<code>creatre:</code> &rarr; Indica o nome da funcionalidade
<code>(data, callback)</code> &rarr; Parâmetros a serem utilizados:
<ul>
<li> 
  <code>data:</code>
  <p>
    Já que a funcionalidade é a criação de um orientador/trabalho ele precisa de um nome, então receberemos como dado um nome, mas data também pode ser um objeto com varias informações como por exemplo: nome, ano de publicação, revistas (em caso de criação de um trabalho).
  </p>
</li>

<li><code>callback:</code>
  <p>
    Ao passo que a query for completa no banco alguma funcionalidade por ser chamada. Uma reação, como por exemplo: exibir ao user "Orientador criado!" ou direcionar ao perfil do Orientador.
  </p>
</li>
</ul>

<code>const query = 'INSERT INTO orientadores (nome) VALUES (?);'</code> &rarr; Criação do código SQL capaz de inserir na tabela chamada <b>orientadores</b> no campo <b>nome</b> um valor <b>?</b>, que foi passado por parâmetro.

<code>connection.query(query, [data.nome], callback);</code> &rarr; Acessando na <b>connection</b> a função <b>query</b> indicando como parâmetro a constante com o <b>código SQL</b> (query), o valor que será inserido <b>[data.nome]</b> e a função de <b>callback</b>.

Todos os models seguem esse padrão de criação.

<b>3. Criação dos Services:</b>

<p>Camada responsável por aplicar as <b>regras de negócio</b> e fazer a ponte entre o controller e o model.</p>

> <p>Enquanto o model lida com o banco diretamente, o service lida com a lógica do que é <b>permitido ou necessário</b> fazer antes de acessar o banco.</p>

<p><b>
<center>[ CAMADA CONTROLLER ]</center>
<center>↓</center>
<center>[ CAMADA SERVICE ]</center>
<center><code>OrientadorService.create(data, callback)`</code></center>

<center><i>faz validações</i></center>
<center>↓</center>
<center>[ CAMADA MODEL]</center>
<center><code>OrientadorModel.create(data, callback)`</code></center>
<center>↓</center>
<center>Executa SQL no banco</center>
</b></p>

<p>Exemplo de função da Camada Service:</p>

```
update: (id, data, callback) => {
    if (!data.nome) {
      return callback(new Error('O campo "nome" é obrigatório.'));
    }
    OrientadorModel.update(id, data, callback);
  },
```
<p>A função se chama <code>update</code> recebe como parâmetro um <code>id</code>, <code>data</code>, o dado que vai substituir o antigo, <code>callback</code>, o que será feito quando a query for aceita.</p>

<p>Perceba que há dentro da função um <code>if</code> verificando se o dado <code>[data.nome]</code> <b>não existe</b>, pois se ele não existir um erro será disparado.</p>

<p>Após essa validação é garantido que é possível passar para Model e realizar a atualização no Bando de Dados</p>

<b>3. Criação dos Controllers:</b>

<p>Os controllers são a ponte entre a rota (requisição HTTP) e a lógica da aplicação (services e models). 

> O controller recebe a requisição do cliente, extrai os dados necessários, chama o service e depois envia a resposta de volta ao cliente (normalmente em JSON).</p>

<p>Exemplo de controller:</p>

```
getById: (req, res) => {
  //  Guarda o ID a ser buscado que será extraido da req
  const id = parseInt(req.params.id); 

  // Chamamos o service e passamos dois parâmetros:
  // 1. o ID
  // 2. a função de callback que lida com o resultado ou erro

  OrientadorService.getById(id, (err, result) => {
    if (err) return res.status(500).json({ erro: err.message }); // se deu erro, responde com status 500
    res.json(result[0]); // se deu certo, devolve o resultado em JSON
  });
}
```

##### Fluxo do Callback no padrão MVC (Model-Service-Controller)

- O **controller** cria uma função `callback`, que define o que fazer com o resultado da operação (ex: enviar resposta com sucesso ou erro).
- Essa função é passada como argumento para o **service**, que por sua vez a repassa para o **model**.
- O **model** executa a query no banco de dados com `connection.query(...)` e chama `callback(err, result)`, retornando:
  - `err`: se houver erro
  - `result`: se a consulta for bem-sucedida
- A função `callback` então **"sobe de volta"** até o **controller**, que usa os dados para responder ao cliente (`res.json(...)` ou `res.status(...).json(...)`).

> Esse fluxo permite separar responsabilidades e manter o código organizado e reutilizável.

<b>4. Criação das Rotas:</b>

As rotas definem quais caminhos (URLs) da aplicação estão disponíveis para o cliente acessar, e qual função deve ser executada quando esses caminhos são acessados.

> As rotas são como "portas de entrada" da aplicação. Elas ligam uma requisição HTTP (GET, POST, PUT, DELETE, etc) a uma função específica no controller.

Para a definição de rotas é necessário: Express, Express.Router() e acesso a camada de Controller

```
const express = require('express');
const router = express.Router();
const OrientadorController = require('../controllers/orientadorController');
```

A constante `router` pode acessar qualquer um dos métodos HTTP e definir um caminho e qual função chamar.

Exemplo: `router.post('/', OrientadorController.create);`

<b>5. Conectar as Rotas no App.js:</b>

```
// Rota padrão
app.get('/', (req, res) => {
  res.send('API Biblioteca Acadêmica - Online');
});

// Conecta as rotas
app.use('/api/orientadores', orientadorRoutes);
app.use('/api/trabalhos', trabalhoRoutes);
```