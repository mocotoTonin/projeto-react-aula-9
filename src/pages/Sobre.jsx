import useTituloPagina from "../hooks/useTituloPagina.js";

const rotas = [
  { caminho: "/", pagina: "Início", conceito: "useState e useEffect com limpeza" },
  { caminho: "/publicacoes", pagina: "Publicações", conceito: "fetch, useEffect, busca e filtro" },
  { caminho: "/publicacoes/:id", pagina: "Detalhes", conceito: "Parâmetro de rota com useParams" },
  { caminho: "/nova", pagina: "Nova publicação", conceito: "Formulário, validação e POST" },
  { caminho: "/sobre", pagina: "Sobre", conceito: "Rota simples" },
  { caminho: "*", pagina: "Página não encontrada", conceito: "Rota coringa" },
];

function Sobre() {
  useTituloPagina("Sobre");

  return (
    <section className="secao">
      <h2 className="secao-titulo">Sobre o projeto</h2>
      <p className="secao-descricao">
        Aplicação desenvolvida para a atividade da Aula 09 — Projeto React 02, da
        disciplina de Frameworks Front-end do SENAI. Os dados são da API pública de
        testes JSONPlaceholder.
      </p>

      <h3 className="subtitulo">Rotas da aplicação</h3>
      <div className="tabela-wrapper">
        <table className="tabela">
          <thead>
            <tr>
              <th>Caminho</th>
              <th>Página</th>
              <th>Conceito</th>
            </tr>
          </thead>
          <tbody>
            {rotas.map((rota) => (
              <tr key={rota.caminho}>
                <td><code>{rota.caminho}</code></td>
                <td>{rota.pagina}</td>
                <td>{rota.conceito}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Sobre;
