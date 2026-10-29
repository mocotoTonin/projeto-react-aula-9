import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Carregando from "../components/Carregando.jsx";
import MensagemErro from "../components/MensagemErro.jsx";
import useTituloPagina from "../hooks/useTituloPagina.js";
import { buscarComentarios, buscarPublicacao, buscarUsuario } from "../services/api.js";

function DetalhePublicacao({ novas }) {
  // useParams lê a parte variável da URL: /publicacoes/:id
  const { id } = useParams();
  useTituloPagina(`Publicação #${id}`);

  const local = novas.find((p) => String(p.id) === id);

  const [publicacao, setPublicacao] = useState(null);
  const [autor, setAutor] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // O efeito depende do id: ao trocar de publicação, uma nova busca é feita
  useEffect(() => {
    if (local) return;

    const controlador = new AbortController();

    async function carregar() {
      setCarregando(true);
      setErro("");

      try {
        const dados = await buscarPublicacao(id, controlador.signal);
        const [dadosAutor, dadosComentarios] = await Promise.all([
          buscarUsuario(dados.userId, controlador.signal),
          buscarComentarios(id, controlador.signal),
        ]);
        setPublicacao(dados);
        setAutor(dadosAutor);
        setComentarios(dadosComentarios);
      } catch (e) {
        if (e.name !== "AbortError") {
          setErro(`A publicação #${id} não foi encontrada.`);
        }
      } finally {
        if (!controlador.signal.aborted) setCarregando(false);
      }
    }

    carregar();
    return () => controlador.abort();
  }, [id, local]);

  const anterior = Number(id) - 1;
  const proxima = Number(id) + 1;

  if (local) {
    return (
      <section className="secao detalhe">
        <Link to="/publicacoes" className="link">← Voltar para publicações</Link>
        <article className="artigo">
          <span className="selo">Criada por você</span>
          <h2 className="artigo-titulo">{local.title}</h2>
          <p className="artigo-meta">Por {local.autorNome} · {local.data}</p>
          <p className="artigo-texto">{local.body}</p>
        </article>
        <p className="mensagem">
          Esta publicação foi enviada com POST e guardada no navegador, pois a API de
          testes não salva os dados de verdade.
        </p>
      </section>
    );
  }

  return (
    <section className="secao detalhe">
      <Link to="/publicacoes" className="link">← Voltar para publicações</Link>

      {carregando ? (
        <Carregando texto={`Carregando publicação #${id}...`} />
      ) : erro ? (
        <MensagemErro texto={erro} />
      ) : (
        <>
          <article className="artigo">
            <span className="card-tipo">Publicação #{publicacao.id}</span>
            <h2 className="artigo-titulo">{publicacao.title}</h2>
            <p className="artigo-meta">
              Por {autor.name} · {autor.email}
            </p>
            <p className="artigo-texto">{publicacao.body}</p>
          </article>

          <h3 className="subtitulo">Comentários ({comentarios.length})</h3>
          <ul className="comentarios">
            {comentarios.map((c) => (
              <li key={c.id} className="comentario">
                <strong>{c.name}</strong>
                <span className="comentario-email">{c.email}</span>
                <p>{c.body}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      {!carregando && !erro && (
      <nav className="paginacao">
        {anterior >= 1 ? (
          <Link to={`/publicacoes/${anterior}`} className="botao secundario">← #{anterior}</Link>
        ) : (
          <span />
        )}
        {proxima <= 100 && (
          <Link to={`/publicacoes/${proxima}`} className="botao secundario">#{proxima} →</Link>
        )}
      </nav>
      )}
    </section>
  );
}

export default DetalhePublicacao;
