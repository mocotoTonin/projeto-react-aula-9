import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTituloPagina from "../hooks/useTituloPagina.js";
import { buscarUsuarios, criarPublicacao } from "../services/api.js";

const VAZIO = { titulo: "", autor: "", conteudo: "" };

// Regras de validação: retorna um objeto com a mensagem de cada campo inválido
function validar(dados) {
  const erros = {};

  if (dados.titulo.trim().length < 5) {
    erros.titulo = "O título precisa ter pelo menos 5 caracteres.";
  }
  if (!dados.autor) {
    erros.autor = "Selecione um autor.";
  }
  if (dados.conteudo.trim().length < 20) {
    erros.conteudo = "O conteúdo precisa ter pelo menos 20 caracteres.";
  }

  return erros;
}

function NovaPublicacao({ onCriar }) {
  useTituloPagina("Nova publicação");
  const navegar = useNavigate();

  const [dados, setDados] = useState(VAZIO);
  const [erros, setErros] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  // Carrega os autores para preencher o select
  useEffect(() => {
    const controlador = new AbortController();

    buscarUsuarios(controlador.signal)
      .then(setUsuarios)
      .catch((e) => {
        if (e.name !== "AbortError") setMensagem("Não foi possível carregar os autores.");
      });

    return () => controlador.abort();
  }, []);

  // Um único manipulador atualiza o campo pelo atributo name
  function atualizarCampo(e) {
    const { name, value } = e.target;
    setDados((atuais) => ({ ...atuais, [name]: value }));
    setErros((atuais) => ({ ...atuais, [name]: undefined }));
  }

  async function enviar(e) {
    e.preventDefault(); // Evita o recarregamento da página

    const novosErros = validar(dados);
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    setEnviando(true);
    setMensagem("");

    try {
      const resposta = await criarPublicacao({
        title: dados.titulo.trim(),
        body: dados.conteudo.trim(),
        userId: Number(dados.autor),
      });

      const autor = usuarios.find((u) => u.id === Number(dados.autor));
      const publicacao = {
        ...resposta,
        id: Date.now(), // a API sempre devolve id 101, então geramos um id local
        autorNome: autor ? autor.name : "Autor",
        data: new Date().toLocaleDateString("pt-BR"),
        nova: true,
      };

      onCriar(publicacao);
      setDados(VAZIO);
      navegar(`/publicacoes/${publicacao.id}`);
    } catch {
      setMensagem("Erro ao enviar a publicação. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="secao">
      <h2 className="secao-titulo">Nova publicação</h2>
      <p className="secao-descricao">
        Formulário com campos controlados. Ao enviar, os dados são validados e enviados
        para a API com o método POST.
      </p>

      <form className="formulario" onSubmit={enviar} noValidate>
        <div className="grupo">
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            name="titulo"
            className={erros.titulo ? "campo invalido" : "campo"}
            value={dados.titulo}
            onChange={atualizarCampo}
            placeholder="Ex.: Aprendendo React Router"
          />
          {erros.titulo && <span className="erro-campo">{erros.titulo}</span>}
        </div>

        <div className="grupo">
          <label htmlFor="autor-form">Autor</label>
          <select
            id="autor-form"
            name="autor"
            className={erros.autor ? "campo invalido" : "campo"}
            value={dados.autor}
            onChange={atualizarCampo}
          >
            <option value="">Selecione...</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
          {erros.autor && <span className="erro-campo">{erros.autor}</span>}
        </div>

        <div className="grupo">
          <label htmlFor="conteudo">Conteúdo</label>
          <textarea
            id="conteudo"
            name="conteudo"
            rows="6"
            className={erros.conteudo ? "campo invalido" : "campo"}
            value={dados.conteudo}
            onChange={atualizarCampo}
            placeholder="Escreva o conteúdo da publicação..."
          />
          <span className="contador-caracteres">{dados.conteudo.length} caracteres</span>
          {erros.conteudo && <span className="erro-campo">{erros.conteudo}</span>}
        </div>

        {mensagem && <p className="mensagem erro">{mensagem}</p>}

        <div className="botoes">
          <button type="submit" className="botao" disabled={enviando}>
            {enviando ? "Enviando..." : "Publicar"}
          </button>
          <button
            type="button"
            className="botao secundario"
            onClick={() => {
              setDados(VAZIO);
              setErros({});
            }}
          >
            Limpar
          </button>
        </div>
      </form>

      <div className="previa">
        <span className="painel-titulo">Prévia em tempo real</span>
        <h3>{dados.titulo || "Título da publicação"}</h3>
        <p>{dados.conteudo || "O conteúdo aparece aqui enquanto você digita."}</p>
      </div>
    </section>
  );
}

export default NovaPublicacao;
