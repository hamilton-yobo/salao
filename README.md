
## Como rodar

- Crie um ficheiro `.env` na raíz do projecto e adicione as seguintes linhas <br/>
  `PORT="3000"`<br/>
  `DATABASE="mongodb://127.0.0.1:27017/salao"`

## Endpoints

### Início

- GET http://localhost:3000/

### Listar Todos

- GET http://localhost:3000/Usuarios

### Listar Um

- GET http://localhost:3000/Usuarios/id

### Criar

- POST http://localhost:3000/Usuarios
  Content-Type: application/json

```json
"nome":"Elton",
"sobrenome":"Kamuango",
"genero": "Masculino",
"dataNascimento": "15-05-2000",
"email": "eelton1@email.com",
"telefone": "934340867",
"imagem": "aaa",
"senha":"123456",
"endereco":"",
"role":"CLIENTE"
```

### Apagar

- DELETE http://localhost:3000/Usuarios/id

### Editar

- PATCH http://localhost:3000/Usuarios/id
  Content-Type: application/json

```json
"nome":"Orlando",
"sobrenome":"Kamuango",
"genero": "M",
"dataNascimento": "15-05-2000",
"email": "elton@email.com",
"telefone": "930321847",
"imagem": "aaa"
```