import { useEffect, useState } from "react";

// useEffect com limpeza: o temporizador é encerrado quando o componente sai da tela
function Relogio() {
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => setAgora(new Date()), 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="painel">
      <span className="painel-titulo">useEffect + limpeza</span>
      <span className="painel-valor">{agora.toLocaleTimeString("pt-BR")}</span>
      <span className="painel-legenda">
        Atualizado por um setInterval, encerrado com clearInterval.
      </span>
    </div>
  );
}

export default Relogio;
