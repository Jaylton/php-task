# php-task
A aplicação php-task é uma API que oferece funcionalidades de login, cadastro, recuperação de senha e lista de usuários.

## Instruções para rodar o projeto
Clone o repositório
```
git clone https://github.com/Jaylton/php-task.git
cd php-task
```

Instale as dependências
```
composer install
npm install
```

Configure o arquivo .env

Crie um arquivo .env na raiz do projeto baseado no arquivo .env.example e ajuste as configurações conforme necessário, incluindo detalhes do banco de dados.

Criei o banco de dados
```
touch database/database.sqlite
```

Certifique-se de ter o Docker instalado e rodando

Construa e inicie os containers

```
docker-compose up -d --build
```

A aplicação estará disponível em http://localhost:8000.

O MailHog estará disponível em http://localhost:8026.

Rotas Disponíveis e Exemplos de Payloads
1. Registro de Usuário
Endpoint: POST /api/register

    Payload:
    
    ```json
    {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "street": "street",
        "neighborhood": "neighborhood",
        "number": "number",
        "city": "city",
        "state": "state",
        "zip_code": "zip_code",
        "password": "password",
        "password_confirmation": "password"
    }
    ```
2. Login de Usuário
Endpoint: POST /api/login

    Payload:
    
    ```json
    {
        "email": "johndoe@example.com",
        "password": "password"
    }
    ```
    
3. Recuperação de Senha
Endpoint: POST /api/forgot-password

    Payload:
    
    ```json
    {
        "email": "johndoe@example.com"
    }```
    
4. Listagem de Usuários
Endpoint: GET /api/users

    Header:
    
    ```json
    {
        "Authorization": "Bearer your_token"
    }
    ```
    Resposta de Sucesso:
    
    ```json
    {
        users: [
            {
                "id": 1,
                "name": "John Doe",
                "email": "johndoe@example.com"
            },
            {
                "id": 2,
                "name": "Jane Doe",
                "email": "janedoe@example.com"
            }
        ]
    }
    ```
    