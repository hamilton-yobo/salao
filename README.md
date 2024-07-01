# Alterações Feitas

## Modificação do endpoint de atualização do usuário.

### O endpoint para atualização do usuário não estava atualizar todos campos.

## Modificação do Enum . _Genero_

### Ao invés das chaves _ADMIN_ e _CLIENTE_ usei _M_ e _F_ por ser mais intuitivo.

## Alteração do model Usuário

### Fiz outro código para model `Usuário` para analisar o código, e jeito que faço os códigos, prefiro fazer um único esquema para a `model` ao invés de fazer esquemas e incorporar noutro.

## Instalação da biblioteca `morgan`

### Instalei `morgan` para acompanhar os eventos das requisições no terminal.

## Escrevi códigos para `Salão` e `Servico`

### Escrevi o código das models `Salão`, `Servico` e as respetivas rotas, embora faltam mais rotas para `Servico`. Também criei o model de relacionamento entre `colaborador` e `salão`.

## Endpoints

### Ver o arquivo `rotas.rest`


# Alterações Realizadas

## Definição dos endpoints dos clientes/colaboradores

### Como as duas collection possuem exatamente os mesmos campos, decidi unir as duas em uma única collection chamada `USUARIOS`, e nessa collection adicionei um campo _Role_ que vai indicar o papel de cada Usuário.

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
"dataNascimento": "25-04-1999",
"email": "eelton1@email.com",
"telefone": "944320877",
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
"dataNascimento": "25-04-1999",
"email": "elton@email.com",
"telefone": "944320877",
"imagem": "aaa"
```

Olá <strong>Helton</strong>,

<div>
  <p>Gostaria de partilhar aquí a ideia do projecto; esta não ideia única, porque já foi implementado em alguns países,
  mas acredito que em Angola não existe este modelo de negócio.</p>
  <p>A ideia é criarmos um sistema para salões de beleza, o sistema deve permitir agendamento de serviços.</p>
</div>
<div>
<bold>A primeira ideia é fazermos a modelagem de banco de dados. Na qual usaremos o MongoDB que é um software de banco de dados orientado a
documentos, pelo facto de ser livre, de código aberto e multiplataforma.</bold>
  <p>Neste repositório tem um arquivo [Salao.drawio] onde faremos as alterações da nossa modelagem do banco de dados.</p>
</div>

```

```
