import { Link } from "react-router-dom";

// Card reutilizável: o Link leva para a rota com o parâmetro :id
function CardPublicacao({ id, titulo, conteudo, autor, nova }) {
  return (
    <article className={nova ? "card nova" : "card"}>
      <div className="card-topo">
        <span className="card-tipo">{nova ? "Sua publicação" : `#${id}`}</span>
        {nova && <span className="selo">Nova</span>}
      </div>

      <h3 className="card-titulo">{titulo}</h3>
      <p className="card-descricao">{conteudo}</p>

      <div className="card-rodape">
        <span>{autor}</span>
        <Link to={`/publicacoes/${id}`} className="link">
          Ler mais →
        </Link>
      </div>
    </article>
  );
}

export default CardPublicacao;
