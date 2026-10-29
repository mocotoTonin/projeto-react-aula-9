import { useEffect } from "react";

// Hook personalizado: sincroniza o título da aba com a página exibida
function useTituloPagina(titulo) {
  useEffect(() => {
    document.title = `${titulo} | React Blog`;
  }, [titulo]);
}

export default useTituloPagina;
