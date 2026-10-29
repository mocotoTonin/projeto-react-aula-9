import { Link, useLocation } from "react-router-dom";
import useTituloPagina from "../hooks/useTituloPagina.js";

function NaoEncontrada() {
  useTituloPagina("Página não encontrada");
  const { pathname } = useLocation();

  return (
    <section className="secao centro">
      <span className="painel-valor">404</span>
      <h2 className="secao-titulo-simples">Página não encontrada</h2>
      <p className="secao-descricao">
        O endereço <code>{pathname}</code> não corresponde a nenhuma rota.
      </p>
      <Link to="/" className="botao">Voltar ao início</Link>
    </section>
  );
}

export default NaoEncontrada;
