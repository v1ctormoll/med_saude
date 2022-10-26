<h1 align="center"> 
 REST API - Gerenciamento
</h1>

<p align="center">
	Essa API tem como função requisições e respostas para um sistema de agendamentos
</p>

<p align="center">
  <a href="#-Tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-Executando">Executando</a> 
</p>

## 🖥️ Implementações:

- Agendamentos só podem ser feito entre as 9:00h e 16:00h.
- O tempo médio para terminar um agendamento é de 40 minutos.
- Agendamentos podem ser feitos a cada 10 minutos.
- Só é possível cancelar um agendamento feito até 6 horas antes tanto pelo usuário, como operador
- Existe um sistema de roles, onde existe o usuário e o operador.
- Só podem existir 3 agendamentos ativos ocorrendo ao mesmo momento, no caso de agendamento futuros, caso em um intervalo de 40 minutos seja feito 3 agendamentos, o quarto agendamento não estará disponível e isso é obtido como resposta da requisição.

## ✈️ Rotas:

### 😁 Usuarios:

##### Utilize no Header de todas as rotas o Content-Type como application/json

- ### Registro

  ![](https://img.shields.io/badge/post-49F37B.svg?&style=for-the-badge&logoColor=white)

  **/user/register**

  Deverá enviar um JSON da seguinte maneira:

  ```
  {
  "name": "Nome Desejado",
  "email": "email@extensãodoemail.com.br",
  "password": "senha123"
  }
  ```

  Como resposta irá obter o seguinte JSON com a senha já criptografada:

  ```
  {
  "admin": false,
  "_id": "60a272be07d02d3820b4646a",
  "name": "Nome Desejado",
  "email": "email@extensãodoemail.com.br",
  "password": "$2a$10$zA11xRZ9gSVw4sH3NXzl4.Jx1/nCwMJA0I7nGs/u6ZwhVeBM3MZz2",
  "createdAt": "2021-05-17T13:42:22.494Z",
  "__v": 0
  }
  ```

- ### Login

  ![](https://img.shields.io/badge/post-49F37B.svg?&style=for-the-badge&logoColor=white)

  **/user/login**

  Deverá enviar um JSON da seguinte maneira:

  ```
  {
  "email": "email@extensãodoemail.com.br",
  "password": "senha123"
  }
  ```

  Em caso de sucesso receberá uma resposta que será o Token de autorização do usuário:

  ```
  {
  "authorizationToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEyNzJiZTA3ZDAyZDM4MjBiNDY0NmEiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTYyMTI1OTE0MH0.RWKrh6ALvT2y9y1GApffrl6DPlSFkPjeHBryEqt5WMw"
  }
  ```

  _Todas as rotas agora vão precisar receber no header o token dessa maneira:_

  ```
    headers('authorization-token') = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEyNzJiZTA3ZDAyZDM4MjBiNDY0NmEiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTYyMTI1OTE0MH0.RWKrh6ALvT2y9y1GApffrl6DPlSFkPjeHBryEqt5WMw"
  ```

  _Caso utilize o insomnia, utilize a imagem abaixo, não passe o token entre aspas:_
  <p align="center">
  <img alt="header1" src="assets/header1.jpg" />
  </p>

- ### Agendar um atendimento

  ![](https://img.shields.io/badge/post-49F37B.svg?&style=for-the-badge&logoColor=white)

  **/user/schedule**

  Deverá enviar um JSON da seguinte maneira (lembre-se de enviar o token do usuário):

  ```
  {
   "startDay": 16,
   "startHour": 15,
   "startMinute": 50
  }
  ```

  - Os agendamentos só podem ser feitos de 10 em 10 minutos.
  - Só pode ser feito um agendamento no mesmo horário a não ser que seja feito por outro usuário.
  - Caso exista dentro de 40 minutos 3 agendamentos que vão ser realizados de forma simultânea, o quarto agendamento a tentar ser realizado não irá ser permitido.

    Como resposta irá obter o seguinte JSON com a senha já criptografada:

    ```
    {
    "admin": false,
    "_id": "60a272be07d02d3820b4646a",
    "name": "Nome Desejado",
    "email": "email@extensãodoemail.com.br",
    "password": "$2a$10$zA11xRZ9gSVw4sH3NXzl4.Jx1/nCwMJA0I7nGs/u6ZwhVeBM3MZz2",
    "createdAt": "2021-05-17T13:42:22.494Z",
    "__v": 0
    }
    ```

- ### Ver tarefas agendadas

  ![](https://img.shields.io/badge/get-BD93F9.svg?&style=for-the-badge&logoColor=white)

  **/user/viewSchedule**

  Deverá enviar via header o token do usuário que deseja ver suas tarefas:

  ```
  headers('authorization-token') = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEyNzJiZTA3ZDAyZDM4MjBiNDY0NmEiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTYyMTI1OTE0MH0.RWKrh6ALvT2y9y1GApffrl6DPlSFkPjeHBryEqt5WMw"
  ```

  - Os agendamentos só podem ser vistos por cada usuário, ou seja, um usuário não tem permissão para ver agendamento de outro.

    Como resposta irá obter o seguinte JSON com as tarefas do usuário:

  ```
    [{
    "_id": "60a27add50c3592a4c09276c",
    "userId": "60a272be07d02d3820b4646a",
    "startDay": 16,
    "startHour": 15,
    "startMinute": 50,
    "__v": 0
    },
    {
    "_id": "60a27ae450c3592a4c09276d",
    "userId": "60a272be07d02d3820b4646a",
    "startDay": 16,
    "startHour": 15,
    "startMinute": 0,
    "__v": 0
    },
    {
    "_id": "60a27ae850c3592a4c09276e",
    "userId": "60a272be07d02d3820b4646a",
    "startDay": 16,
    "startHour": 15,
    "startMinute": 10,
    "__v": 0
    }]
  ```

- ### Cancelar uma tarefa já agendada

  ![](https://img.shields.io/badge/delete-FF4D4B.svg?&style=for-the-badge&logoColor=white)

  **/user/cancel/schedule**

  Deverá enviar um JSON contendo o id da tarefa a ser deletada da seguinte forma (lembre-se de enviar o token do usuário):

  ```
  {
  "id": "60a026f6d1f40a0e00e0a8bd"
  }
  ```

  - Só se pode cancelar um agendamento que existe.
  - Os agendamentos só podem ser cancelados por aquele usuário que o criou, ou seja, não é permitido cancelar agendamento de outro usuário pela rota USER.
  - O cancelamento só pode ser feito até 6 horas antes da tarefa se iniciar.

  Como resposta irá obter o id da tarefa que foi cancelada com status 200:

  ```
  60a026f6d1f40a0e00e0a8bd
  ```

  Caso não tenha sucesso, irá receber respostas diferentes a depender do erro encontrado.

&nbsp;

### 🔐 Administradores:

#### Utilize no Header de todas as rotas o Content-Type como application/json

### Existe apenas um usuário presente no banco de dados para teste, ele é da seguinte forma:

```
{
"email": "admin@hotmail.com",
"password": "admin123"
}
```

#### O registro foi feito diretamente no banco de dados por questões de segurança, abaixo seguem as rotas disponíveis:

- ### Login

  ![](https://img.shields.io/badge/post-49F37B.svg?&style=for-the-badge&logoColor=white)

  **/admin/login**

  Deverá enviar um JSON da seguinte maneira:

  ```
  {
    "email": "admin@hotmail.com",
    "password": "admin123"
  }
  ```

  Em caso de sucesso receberá uma resposta que será o Token de autorização do usuário:

  ```
  {
  "authorizationToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEyN2RhNzUwYzM1OTJhNGMwOTI3NmYiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjIxMjYxODEwfQ.KLct0pGR5OFEr1G9tffM2qTXNaWrgsJqH0KnOm1Is3w"
  }
  ```

  _Todas as rotas agora vão precisar receber no header o token dessa maneira:_

  ```
    headers('authorization-token') = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEyNzJiZTA3ZDAyZDM4MjBiNDY0NmEiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTYyMTI1OTE0MH0.RWKrh6ALvT2y9y1GApffrl6DPlSFkPjeHBryEqt5WMw"
  ```

  _Caso utilize o insomnia, utilize a imagem abaixo, não passe o token entre aspas:_
    <p align="center">
      <img alt="header1" src="assets/header1.jpg" />
    </p>

- ### Ver tarefas agendadas

  ![](https://img.shields.io/badge/get-BD93F9.svg?&style=for-the-badge&logoColor=white)

  **/admin/viewSchedule)**

  Deverá enviar via header o token do administrador/operador que deseja ver as tarefas que estão agendadas no sistema:

  ```
  headers('authorization-token') = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGEyNzJiZTA3ZDAyZDM4MjBiNDY0NmEiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTYyMTI1OTE0MH0.RWKrh6ALvT2y9y1GApffrl6DPlSFkPjeHBryEqt5WMw"
  ```

  - O operador do sistema pode ver o agendamento de todos os usuários.

  Como resposta irá obter o seguinte JSON com as tarefas de todos os usuários:

  ```
    [{
    "_id": "60a2781207d02d3820b4646b",
    "userId": "60a14e0ec263702c28789b23",
    "startDay": 16,
    "startHour": 15,
    "startMinute": 50,
    "__v": 0
    },
    {
    "_id": "60a27add50c3592a4c09276c",
    "userId": "60a272be07d02d3820b4646a",
    "startDay": 16,
    "startHour": 15,
    "startMinute": 50,
    "__v": 0
    }]
  ```

- ### Cancelar uma tarefa já agendada

  ![](https://img.shields.io/badge/delete-FF4D4B.svg?&style=for-the-badge&logoColor=white)

  **/admin/cancel/schedule**

  Deverá enviar um JSON contendo o id da tarefa a ser deletada da seguinte forma (lembre-se de enviar o token do usuário):

  ```
  {
  "id": "60a14fc71d2de14ba07c095b"
  }
  ```

  - Só se pode cancelar um agendamento que existe.
  - Pela rota admin, o operador pode realizar o cancelamento de qualquer usuário, não há restrição.

  - O cancelamento só pode ser feito até 6 horas antes da tarefa se iniciar.

  Como resposta irá obter o id da tarefa que foi cancelada com status 200:

  ```
  60a14fc71d2de14ba07c095b
  ```

  Caso não tenha sucesso, irá receber respostas diferentes a depender do erro encontrado.

- ### Completar uma tarefa, serviço terminado

  ![](https://img.shields.io/badge/delete-FF4D4B.svg?&style=for-the-badge&logoColor=white)

  **admin/Complete/schedule**

  Deverá enviar um JSON contendo o id da tarefa a que deseja ser completada (lembre-se de enviar o token do usuário):

  ```
  {
  "id": "60a14fc71d2de14ba07c095b"
  }
  ```

  - Só se pode completar uma tarefa que já foi iniciada.

  Como resposta irá obter o id da tarefa que foi cancelada com status 200:

  ```
  60a27add50c3592a4c09276c
  ```

  Caso não tenha sucesso, irá receber respostas diferentes a depender do erro encontrado.

## 🧪 Tecnologias

[![JavaScript](https://camo.githubusercontent.com/62d37abe760867620e0baea1066303719d630a82936837ba7bff6b0c754e3c9f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a6176617363726970742532302d2532333332333333302e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d253233463744463145)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) ![NodeJS](https://camo.githubusercontent.com/cc96d7d28a6ca21ddbb1f2521d751d375230ed840271e6a4c8694cf87cc60c14/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e6f64652e6a732532302d2532333433383533442e7376673f267374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465)

### 🔨 Dependências

###### Banco de dados (Está em núvem)

- [MongoDB com Mongoose](https://mongoosejs.com/)

###### Depedências

- [Node Express](https://expressjs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [jsonwebtoken](https://jwt.io/)
- [bcryptjs](https://www.npmjs.com/package/bcrypt)

## 🚀 Executando

Clone o projeto e acesso a pasta dos arquivos

```bash
$ git clone https://github.com/lucasDechenier/api_schedule
```

Siga as etapas para instalação

```bash

# Instalando as dependências
$ npm install

# Iniciando o projeto
$ npm start
```
