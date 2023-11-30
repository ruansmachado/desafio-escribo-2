![imagem escribo](https://yt3.googleusercontent.com/zrpHkY4GFm4fHFQGH3XlBJkDgiL02126SjO5IBGH4oW1-Y-5iU_5PdCZys0mrQnqzLQUuLD9ylI=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj)

# Desafio Escribo #2

Esta API RESTful foi desenvolvida para fornecer funcionalidades essenciais de autenticação de usuários, oferecendo operações de registro (sign up), autenticação (sign in) e recuperação de informações do usuário.

## Como utilizar:
### Requerimentos:
* Node.js
* PostgreSQL
* Google Cloud
* IDE

### Passo a passo:
1. Instale os Requerimentos na Máquina:
- Certifique-se de ter Node.js, PostgreSQL e uma IDE instalados na sua máquina.

2. Clone o Repositório:
   ```
    git clone https://github.com/seu-usuario/nome-do-repositorio.git
    cd nome-do-repositorio
   ```
3. Instale as Dependências:
   ``` 
   npm install
   ```
4. Configure as Variáveis de Ambiente:
- Crie um arquivo .env na raiz do projeto e configure as variáveis de ambiente necessárias, como as credenciais do PostgreSQL e as chaves JWT.

5. Inicie o Servidor Local:
- Utilize o seguinte comando para iniciar o servidor local:

``` 
  npm run start
```
6. Teste a API:

* Utilize ferramentas como **Postman** ou **Insomnia** para testar os endpoints da API.
* **Cadastre** um novo usuário usando a rota "**/usuarios**" usando o **POST**.
  ![texto](https://github.com/ruansmachado/desafio-escribo-2/blob/main/img/teste-post-cadastro.png)
* **Autentique-se** usando a rota "**/auth/login**" {**POST**}.
  ![texto](https://github.com/ruansmachado/desafio-escribo-2/blob/main/img/teste-autenticacao.png)
* Para **buscar todos os usuários** utilize a rota "**/usuarios**" com o método **GET**.
  ![texto](https://github.com/ruansmachado/desafio-escribo-2/blob/main/img/todos-usuarios.png)
* Para **buscar** ou **editar** um usuário use a rota "**/usuarios/id/id_do_usuário**" utilizando **PUT**.
  ![texto](https://github.com/ruansmachado/desafio-escribo-2/blob/main/img/todos-usuarios.png)
  ![texto](https://github.com/ruansmachado/desafio-escribo-2/blob/main/img/editar-usuario.png)
* Para **deletar** troque o método **PUT** de editar por **DELETE**.
  ![texto](https://github.com/ruansmachado/desafio-escribo-2/blob/main/img/delete-usuario.png)

Lembre-se de configurar corretamente o banco de dados PostgreSQL e ajustar as configurações do Google Cloud conforme necessário. 
## Especificações técnicas

1. Formato de Comunicação:
   
   * Todos os endpoints aceitam e retornam apenas dados no formato JSON.
     
   * Retorno JSON para situações de endpoint não encontrado.

3.  Persistência de Dados:
        Armazenamento persistente de dados do usuário. 

4.  Respostas de Erro:
        Formato padrão: { "mensagem": "mensagem de erro" }

## Endpoints

### 1. Sign Up (Criação de Cadastro)
  * Input:
      ```sql
      {
        "nome": "string",
        "email": "string",
        "senha": "senha",
        "telefones": [{"numero": "123456789", "ddd": "11"}]
      }
      ```
  * Output:
      ```sql
      {
        "id": "GUID/ID",
        "createdAt": "data", > O mesmo de "data_criacao",
        "updatedAt": "data", > O mesmo de "data-atualizacao",
        "ultimo_login": "data",
        "token": "GUID/JWT"
      }
      ```
* Erro:
    * E-mail já cadastrado.
      ```
        {"mensagem" "E-mail já existente"} 	
      ```
      
### 2. Sign In (Autenticação)
  * Input:
      ```sql
      {
        "email": "string",
        "senha": "senha",
      }
      ```
  * Output:
      ```sql
      {
        "id": "GUID/ID",
        "createdAt": "data",
        "updatedAt": "data",
        "ultimo_login": "data",
        "token": "GUID/JWT"
      }
      ```
* Erros:
  * E-mail não cadastrado ou senha incorreta:
      ```
        {"mensagem" "Usuário e/ou senha inválidos"}
      ```
 * Senha incorreta: status 401 com:
      ```
        {"mensagem" "Usuário e/ou senha inválidos"}
      ```
### 3. Buscar Usuário
* Requisição: Header Authentication com valor "Bearer {token}".

![texto](https://github.com/ruansmachado/desafio-escribo-2/blob/main/img/auth-bearer.png)
 
* Erros:
  * Token inválido:
      ```
        {"mensagem" "Não autorizado"}
      ```
 * Token expirado (mais de 30 minutos):
      ```
        {"mensagem" "Sessão inválida!"}
      ```
