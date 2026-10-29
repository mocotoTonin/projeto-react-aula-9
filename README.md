# React Blog — Projeto React 02

Projeto desenvolvido para a Atividade da **Aula 09 — Projeto React 02** da disciplina de **Frameworks Front-end**.

## Descrição

O React Blog é uma aplicação desenvolvida em React que reúne, em uma única interface, todos os conceitos estudados na aula: State e `useState`, formulários, `useEffect`, consumo de APIs e React Router.

As publicações, autores e comentários são buscados na API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com). A aplicação possui várias páginas com URLs próprias, uma página de detalhes com parâmetro de rota e um formulário que valida os dados e os envia para a API com o método `POST`.

## Objetivo

Desenvolver uma aplicação React que utilize todos os conceitos estudados na Aula 09, publicada em um repositório público no GitHub e com deploy na Vercel.

## Tecnologias

- React 18
- React Router DOM 6
- Vite
- JavaScript (ES6+)
- Fetch API
- CSS3
- Google Fonts (Poppins)
- Git e GitHub
- Vercel

## Funcionalidades

- Navegação entre as páginas Início, Publicações, Nova publicação e Sobre sem recarregar a página.
- Menu com destaque da página atual.
- Lista de publicações buscada na API, com nome do autor de cada uma.
- Pesquisa pelo título e filtro por autor.
- Botão "Carregar mais" para exibir as publicações aos poucos.
- Página de detalhes (`/publicacoes/:id`) com autor, conteúdo e comentários.
- Navegação para a publicação anterior e a próxima.
- Mensagens de carregamento, de lista vazia e de erro, com botão "Tentar novamente".
- Formulário de nova publicação com validação, mensagens por campo, contador de caracteres e prévia em tempo real.
- Envio da publicação com `POST` e exibição dela na lista, guardada no navegador.
- Título da aba atualizado conforme a página aberta.
- Contador de curtidas e relógio em tempo real na página inicial.
- Página 404 para endereços inexistentes.
- Layout responsivo para diferentes telas.

## Conceitos utilizados

| Conceito | Onde foi aplicado |
| -------- | ----------------- |
| State e `useState` | Contador de curtidas, busca, filtro, quantidade exibida, dados da API, estados de carregamento e erro, campos do formulário e lista de publicações novas. |
| Formulários | `NovaPublicacao`: campos controlados com `value` e `onChange`, envio com `onSubmit`, `preventDefault()` e validação. A busca de `Publicacoes` também é um campo controlado. |
| `useEffect` | Hook `useTituloPagina` (título da aba), `Relogio` (`setInterval` com limpeza), buscas na API e sincronização com o `localStorage`. |
| Limpeza de efeitos | `clearInterval` no relógio e `AbortController` para cancelar as requisições ao sair da página. |
| Consumo de APIs | `services/api.js`: `fetch`, verificação de `response.ok`, `response.json()`, `try/catch` e envio com `POST`, `headers` e `JSON.stringify()`. |
| React Router | `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `useParams`, `useNavigate`, `useLocation` e rota coringa `*`. |

## Rotas

| Caminho | Página |
| ------- | ------ |
| `/` | Início |
| `/publicacoes` | Lista de publicações |
| `/publicacoes/:id` | Detalhes de uma publicação |
| `/nova` | Formulário de nova publicação |
| `/sobre` | Sobre o projeto |
| `*` | Página não encontrada |

## Estrutura do projeto

```
src/
├── components/
│   ├── Cabecalho.jsx
│   ├── CardPublicacao.jsx
│   ├── Carregando.jsx
│   ├── Contador.jsx
│   ├── MensagemErro.jsx
│   ├── Relogio.jsx
│   └── Rodape.jsx
├── data/
│   └── conceitos.js
├── hooks/
│   └── useTituloPagina.js
├── pages/
│   ├── DetalhePublicacao.jsx
│   ├── Inicio.jsx
│   ├── NaoEncontrada.jsx
│   ├── NovaPublicacao.jsx
│   ├── Publicacoes.jsx
│   └── Sobre.jsx
├── services/
│   └── api.js
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
```

## Identidade visual

| Elemento        | Definição |
| --------------- | --------- |
| Cor de fundo    | `#212121` |
| Cor de destaque | `#007ACC` |
| Fonte           | Poppins   |

## Como executar

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

O arquivo `vercel.json` redireciona todas as rotas para o `index.html`, permitindo abrir diretamente endereços como `/publicacoes/1` na Vercel.

## Observação sobre a API

A JSONPlaceholder é uma API de testes: o `POST` responde como se a publicação tivesse sido criada, mas não a salva no servidor. Por isso, as publicações criadas no formulário ficam guardadas no `localStorage` do navegador.

## Autor

Marco Antônio — SENAI · Frameworks Front-end
