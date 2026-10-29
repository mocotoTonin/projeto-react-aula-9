import { useEffect, useState } from "react";
import CardPublicacao from "../components/CardPublicacao.jsx";
import Carregando from "../components/Carregando.jsx";
import MensagemErro from "../components/MensagemErro.jsx";
import useTituloPagina from "../hooks/useTituloPagina.js";
import { buscarPublicacoes, buscarUsuarios } from "../services/api.js";

const POR_PAGINA = 9;

function Publicacoes({ novas }) {
  useTituloPagina("Publicações");

  const [publicacoes, setPublicacoes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0);

  // Campos controlados da busca e do filtro
  const [busca, setBusca] = useState("");
  const [autor, setAutor] = useState("todos");
  const [quantidade, setQuantidade] = useState(POR_PAGINA);

  // Busca os dados ao abrir a página; "tentativa" permite repetir após um erro
  useEffect(() => {
    const controlador = new AbortController();

    async function carregar() {
      setCarregando(true);
      setErro("");

      try {
        const [dadosPublicacoes, dadosUsuarios] = await Promise.all([
          buscarPublicacoes(controlador.signal),
          buscarUsuarios(controlador.signal),
        ]);
        setPublicacoes(dadosPublicacoes);
        setUsuarios(dadosUsuarios);
      } catch (e) {
        if (e.name !== "AbortError") {
          setErro("Não foi possível carregar as publicações. Verifique sua conexão.");
        }
      } finally {
        if (!controlador.signal.aborted) setCarregando(false);
      }
    }

    carregar();

    // Limpeza: cancela a requisição se o usuário sair da página antes da resposta
    return () => controlador.abort();
  }, [tentativa]);

  function nomeDoAutor(userId) {
    const usuario = usuarios.find((u) => u.id === Number(userId));
    return usuario ? usuario.name : "Autor desconhecido";
  }

  const todas = [...novas, ...publicacoes];

  const filtradas = todas.filter((p) => {
    const correspondeBusca = p.title.toLowerCase().includes(busca.toLowerCase());
    const correspondeAutor = autor === "todos" || p.userId === Number(autor);
    return correspondeBusca && correspondeAutor;
  });

  const visiveis = filtradas.slice(0, quantidade);

  return (
    <section className="secao">
      <h2 className="secao-titulo">Publicações</h2>
      <p className="secao-descricao">
        Dados buscados com fetch na API JSONPlaceholder. Pesquise pelo título ou filtre
        pelo autor.
      </p>

      <form className="pesquisa" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="busca" className="sr-only">Pesquisar</label>
        <input
          id="busca"
          type="search"
          className="campo"
          placeholder="Pesquisar pelo título..."
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setQuantidade(POR_PAGINA);
          }}
        />

        <label htmlFor="autor" className="sr-only">Autor</label>
        <select
          id="autor"
          className="campo campo-select"
          value={autor}
          onChange={(e) => {
            setAutor(e.target.value);
            setQuantidade(POR_PAGINA);
          }}
        >
          <option value="todos">Todos os autores</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
      </form>

      {carregando ? (
        <Carregando texto="Buscando publicações na API..." />
      ) : erro ? (
        <MensagemErro texto={erro} onTentarNovamente={() => setTentativa((t) => t + 1)} />
      ) : filtradas.length === 0 ? (
        <p className="mensagem vazio">Nenhuma publicação encontrada para "{busca}".</p>
      ) : (
        <>
          <p className="contagem">
            Exibindo {visiveis.length} de {filtradas.length} publicações
          </p>

          <div className="grid-cards">
            {visiveis.map((p) => (
              <CardPublicacao
                key={p.id}
                id={p.id}
                titulo={p.title}
                conteudo={p.body}
                autor={nomeDoAutor(p.userId)}
                nova={p.nova}
              />
            ))}
          </div>

          {quantidade < filtradas.length && (
            <div className="centro">
              <button
                type="button"
                className="botao secundario"
                onClick={() => setQuantidade(quantidade + POR_PAGINA)}
              >
                Carregar mais
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Publicacoes;
