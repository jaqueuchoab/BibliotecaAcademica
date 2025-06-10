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

<b>2. Criação dos Models:</b>

<p>Models com funcionalidades de busca, inserção e atualização de dados.</p>
<p>Com um padrão de criar a função, indicar seus parâmetros, declarar a constante da query, utilizar a conexão para ter acesso a função <strong>connection.query</strong> que é capaz de manipular o banco com os dados necessários. Como por exemplo:</p>

```
create: (data, callback) => {
  const query = 'INSERT INTO orientadores (nome) VALUES (?)';
  connection.query(query, [data.nome], callback);
}
```

<i>creatre:</i> -> Indica o nome da funcionalidade
<i>(data, callback)</i>  -> Parâmetros a serem utilizados:
<ul>
<li> <i>data:</i> Já que a funcionalidade é a criação de um orientador/trabalho ele precisa de um nome, então receberemos como dado um nome, mas data também pode ser um objeto com varias informações como por exemplo: nome, ano de publicação, revistas (em caso de criação de um trabalho).</i>
</ul>