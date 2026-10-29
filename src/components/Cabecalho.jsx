import { Link, NavLink } from "react-router-dom";

// NavLink é um Link que recebe a classe "active" quando a rota está aberta
function Cabecalho({ totalNovas }) {
  return (
    <header className="cabecalho">
      <div className="container cabecalho-conteudo">
        <Link to="/" className="logo">
          <span className="logo-icone">⚛</span>
          <h1>React Blog</h1>
        </Link>

        <nav className="menu">
          <NavLink to="/" end>Início</NavLink>
          <NavLink to="/publicacoes">Publicações</NavLink>
          <NavLink to="/nova">Nova publicação</NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
        </nav>

        <span className="badge">
          {totalNovas} {totalNovas === 1 ? "nova" : "novas"}
        </span>
      </div>
    </header>
  );
}

export default Cabecalho;
