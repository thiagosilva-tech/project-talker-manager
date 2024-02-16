## Talker Manager

Este projeto consiste em uma API para gerenciar pessoas palestrantes. A API permite criar, listar, atualizar e excluir palestrantes, além de fornecer funcionalidades de busca e autenticação de usuários.

### Tecnologias Utilizadas

    - **Node.js**
    - **Express.js**
    - **MySQL**
    - **JWT (JSON Web Token)**

### Requisitos Obrigatórios

1 - **Endpoint GET /talker**
Este endpoint retorna um array com todas as pessoas palestrantes cadastradas.

2 - **Endpoint GET /talker/:id**
Este endpoint retorna uma pessoa palestrante com base no id fornecido na rota.

3 - **Endpoint POST /login**
Este endpoint recebe os campos "email" e "password" no corpo da requisição e retorna um token de autenticação válido.

4 - **Validações para o endpoint /login**
Adicione validações para os campos recebidos na requisição. Caso os valores sejam inválidos, o endpoint deve retornar o código de status 400 com a respectiva mensagem de erro.

5 - **Endpoint POST /talker**
Este endpoint permite adicionar uma nova pessoa palestrante.

6 - **Endpoint PUT /talker/:id**
Este endpoint permite atualizar os dados de uma pessoa palestrante com base no id fornecido na rota.

7 - **Endpoint DELETE /talker/:id**
Este endpoint permite excluir uma pessoa palestrante com base no id fornecido na rota.

8 - **Endpoint GET /talker/search e parâmetro de consulta q=searchTerm**
Este endpoint permite buscar pessoas palestrantes com base em um termo de busca fornecido como parâmetro.

### Requisitos Bônus

9 - **Parâmetro de consulta rate=rateNumber no endpoint GET /talker/search**
Este parâmetro permite filtrar pessoas palestrantes com base em sua avaliação.

10 - **Parâmetro de consulta date=watchedDate no endpoint GET /talker/search**
Este parâmetro permite filtrar pessoas palestrantes com base na data em que foram assistidas.

11 - **Endpoint PATCH /talker/rate/:id**
Este endpoint permite atualizar a avaliação de uma pessoa palestrante com base no id fornecido na rota.

12 - **Endpoint GET /talker/db**
Este endpoint retorna a lista de pessoas palestrantes recuperadas de um banco de dados MySQL.

## Conclusão

O projeto Talker Manager oferece uma solução completa para gerenciamento de pessoas palestrantes, com funcionalidades essenciais e opcionais para manipulação e consulta dos dados. Utilizando tecnologias modernas como Node.js, Express.js, MySQL e JWT, o projeto demonstra eficiência e segurança no armazenamento e manipulação de informações. Com a adição de requisitos bônus, o Talker Manager se torna ainda mais versátil e poderoso, atendendo às necessidades de diferentes aplicações que demandam gerenciamento de palestrantes.
