import { useState } from "react";

// useState: o valor fica guardado entre renderizações e a tela é atualizada
function Contador() {
  const [curtidas, setCurtidas] = useState(0);

  return (
    <div className="painel">
      <span className="painel-titulo">useState</span>
      <span className="painel-valor">{curtidas}</span>
      <span className="painel-legenda">
        {curtidas === 1 ? "curtida" : "curtidas"} nesta aula
      </span>

      <div className="botoes">
        <button type="button" className="botao" onClick={() => setCurtidas(curtidas + 1)}>
          Curtir
        </button>
        <button
          type="button"
          className="botao secundario"
          onClick={() => setCurtidas(0)}
          disabled={curtidas === 0}
        >
          Zerar
        </button>
      </div>
    </div>
  );
}

export default Contador;
