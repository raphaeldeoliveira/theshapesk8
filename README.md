# The Shape Skateshop

O The Shape Skateshop é um e-commerce especializado na venda de peças, roupas e acessórios relacionados ao skate. Este projeto foi desenvolvido com o objetivo de oferecer uma plataforma onde os amantes do skate possam encontrar produtos de qualidade e fazer suas compras de forma fácil e segura.

## Funcionalidades

### Para Administradores
- Cadastro, edição e exclusão de produtos.
- Visualização detalhada de produtos cadastrados.
- Aplicação de descontos especiais em produtos.
- Gerenciamento de estoque.

### Para Clientes
- Visualização de produtos disponíveis na loja.
- Adição de produtos ao carrinho de compras.
- Finalização de compra com desconto, quando aplicável.

## Tecnologias Utilizadas

### Backend
- **C#**: Linguagem de programação principal para o desenvolvimento do backend.
- **Entity Framework Core**: Ferramenta de mapeamento objeto-relacional (ORM) para interação com o banco de dados.
- **Postgre**: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar dados.
- **Visual Studio**: Ambiente de desenvolvimento integrado utilizado para o desenvolvimento do backend.
- **.NET Core**: Framework utilizado para o desenvolvimento do backend.
- **ASP.NET**: Plataforma da Microsoft para o desenvolvimento de aplicações Web.

## Como Rodar o Projeto Localmente

Para rodar o projeto localmente em sua máquina, siga os passos abaixo:

1. Clone este repositório para o seu ambiente local.
2. Abra o projeto no Visual Studio.
3. Certifique-se de que o SQL Server está em execução e acessível.
4. Altere a string de conexão com o banco de dados, se necessário, no arquivo `appsettings.json`.
5. No Visual Studio, abra o Console do Gerenciador de Pacotes e execute o comando `Update-Database` para aplicar as migrações e criar o banco de dados.
6. Inicie a aplicação pressionando `F5` ou clicando em "Iniciar" no Visual Studio.
7. O projeto será executado localmente e estará acessível em seu navegador padrão no endereço `http://localhost:sua_porta`.

## Autor

Este projeto foi desenvolvido por:
 - Raphael de Oliveira (https://github.com/raphaeldeoliveira)
