import { Link } from "react-router-dom";
import Contador from "../components/Contador.jsx";
import Relogio from "../components/Relogio.jsx";
import useTituloPagina from "../hooks/useTituloPagina.js";
import { conceitos } from "../data/conceitos.js";

function Inicio() {
  useTituloPagina("Início");

  return (
    <>
      <section className="secao">
        <span className="hero-tag">Aula 09 · Projeto React 02</span>
        <h2 className="hero-titulo">
          Um blog em <span className="destaque">React</span> com estado, formulários,
          efeitos, API e rotas.
        </h2>
        <p className="hero-texto">
          As publicações vêm da API JSONPlaceholder. Navegue pelas páginas, abra os
          detalhes de uma publicação e crie a sua pelo formulário.
        </p>

        <div className="botoes">
          <Link to="/publicacoes" className="botao">Ver publicações</Link>
          <Link to="/nova" className="botao secundario">Criar publicação</Link>
        </div>
      </section>

      <section className="secao">
        <h2 className="secao-titulo">Conceitos da aula</h2>
        <p className="secao-descricao">
          Cada conceito estudado aparece em uma parte da aplicação. Clique para ver onde.
        </p>

        <ul className="grid-conceitos">
          {conceitos.map((conceito) => (
            <li key={conceito.id} className="conceito">
              <span className="conceito-numero">0{conceito.id}</span>
              <h3>{conceito.titulo}</h3>
              <p>{conceito.descricao}</p>
              <Link to={conceito.rota} className="link">
                {conceito.onde} →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="secao">
        <h2 className="secao-titulo">State e efeitos na prática</h2>
        <p className="secao-descricao">
          O contador guarda o valor com useState. O relógio usa useEffect para criar um
          temporizador e uma função de limpeza para encerrá-lo ao trocar de página.
        </p>

        <div className="grid-paineis">
          <Contador />
          <Relogio />
        </div>
      </section>
    </>
  );
}

export default Inicio;
