# HiveScrum Frontend

Frontend de uma aplicação para gestão de projetos inspirada no Scrum, com uma proposta mais simples e objetiva para times pequenos e médios.

Este projeto foi desenvolvido para praticar arquitetura frontend com React, integração com API REST e experiência de produto com foco em produtividade de times.

## Visão do Produto

O HiveScrum propõe um modelo de gestão em que:

- Membros (usuários) podem criar organizações.
- Organizações podem conter múltiplos projetos.
- Membros também podem criar projetos sem organização.
- Membros podem ser convidados para participar de projetos.
- Membros proprietários podem atribuir papéis como Scrum Master e Desenvolvedor.

## Status Atual do Frontend

Funcionalidades implementadas nesta versão:

- Autenticação com login e registro.
- Persistência de token JWT e refresh token no navegador.
- Rotas privadas com proteção por autenticação.
- Listagem de projetos.
- Criação de projetos com vínculo opcional a organização.
- Exclusão de projetos.
- Listagem de organizações para seleção no formulário de criação.
- Carregamento de perfil do membro autenticado.

Funcionalidades previstas (roadmap):

- Convite de membros para projetos.
- Atribuição de papéis (Scrum Master e Desenvolvedor) por proprietário.
- Edição completa de projeto pela interface (a ação já existe no hook, falta UI completa).
- Gestão completa de organizações (criar, editar, remover).

## Stack Tecnológica

- React 19
- Vite 8
- React Router DOM 7
- Axios
- Tailwind CSS 4
- ESLint 9

## Arquitetura de Pastas

src/
- api/ -> cliente HTTP e interceptors
- components/ -> componentes de layout e UI
- hook/ -> hooks de estado e integração com serviços
- pages/ -> telas da aplicação
- routes/ -> proteção de rotas
- service/ -> camada de acesso à API por domínio

## Fluxo Principal

1. Usuário realiza login ou registro.
2. Tokens são armazenados no localStorage.
3. Rotas privadas validam autenticação via token.
4. Requests autenticadas recebem header Bearer automaticamente.
5. Usuário gerencia projetos e associa (opcionalmente) uma organização.

## Endpoints Consumidos no Frontend

Autenticação e membro:

- POST /api/members/register/
- POST /api/authentication/authorize/
- GET /api/members/profile/

Projetos e organizações:

- GET /api/projects/
- GET /api/projects/:id/
- POST /api/projects/
- PUT /api/projects/:id/
- DELETE /api/projects/:id/
- GET /api/organizations/

## Como Executar Localmente

Pré-requisitos:

- Node.js 18+
- npm
- Backend da API rodando (base atual: http://127.0.0.1:8000)

Passos:

1. Instale as dependências:

npm install

2. Inicie em modo desenvolvimento:

npm run dev

3. Build de produção:

npm run build

4. Preview da build:

npm run preview

## Configuração da API

A URL base está configurada diretamente em src/api/client.js:

- baseURL: http://127.0.0.1:8000

Para outro ambiente (staging/produção), ajuste esse valor conforme sua API.

## Diferenciais Técnicos

- Separação por camadas (pages, hooks, services, api) para facilitar manutenção.
- Hook dedicado para autenticação e hook dedicado para domínio de projetos.
- Interceptor global do Axios para anexar token automaticamente.
- UI com identidade visual própria e navegação lateral orientada a workspace.

## Melhorias Planejadas

- Integração de variáveis de ambiente para baseURL.
- Tratamento global de erros e feedbacks padronizados.
- Testes de componentes e fluxos principais.
- Integração com quadro de tarefas e sprints.

## Autor

Gabriel

Se quiser, posso também gerar uma versão curta deste README (resumo executivo) ideal para colar na seção Featured do LinkedIn com foco em impacto e resultados.
