// Conceitos estudados na Aula 09 e a rota onde cada um aparece na aplicação
export const conceitos = [
  {
    id: 1,
    titulo: "State e useState",
    descricao: "Guarda valores entre renderizações e atualiza a tela quando eles mudam.",
    rota: "/",
    onde: "Contador e relógio desta página",
  },
  {
    id: 2,
    titulo: "Formulários",
    descricao: "Campos controlados com value e onChange, envio com onSubmit e validação.",
    rota: "/nova",
    onde: "Nova publicação",
  },
  {
    id: 3,
    titulo: "useEffect",
    descricao: "Sincroniza o componente com sistemas externos, com função de limpeza.",
    rota: "/publicacoes",
    onde: "Título da aba, relógio e buscas",
  },
  {
    id: 4,
    titulo: "Consumo de APIs",
    descricao: "Busca com fetch, verificação de response.ok, tratamento de erros e POST.",
    rota: "/publicacoes",
    onde: "Publicações e comentários",
  },
  {
    id: 5,
    titulo: "React Router",
    descricao: "Rotas, navegação com Link e parâmetros de URL com useParams.",
    rota: "/publicacoes/1",
    onde: "Página de detalhes",
  },
];
