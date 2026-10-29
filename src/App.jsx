import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cabecalho from "./components/Cabecalho.jsx";
import Rodape from "./components/Rodape.jsx";
import Inicio from "./pages/Inicio.jsx";
import Publicacoes from "./pages/Publicacoes.jsx";
import DetalhePublicacao from "./pages/DetalhePublicacao.jsx";
import NovaPublicacao from "./pages/NovaPublicacao.jsx";
import Sobre from "./pages/Sobre.jsx";
import NaoEncontrada from "./pages/NaoEncontrada.jsx";

const CHAVE_ARMAZENAMENTO = "react-blog:novas";

function carregarNovas() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_ARMAZENAMENTO)) ?? [];
  } catch {
    return [];
  }
}

function App() {
  // Publicações criadas pelo formulário (a API de testes não as guarda de verdade)
  const [novas, setNovas] = useState(carregarNovas);

  // useEffect sincroniza o estado com o localStorage sempre que a lista muda
  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(novas));
    } catch {
      // Sem acesso ao armazenamento: a lista vale apenas nesta sessão
    }
  }, [novas]);

  function adicionarPublicacao(publicacao) {
    setNovas((atuais) => [publicacao, ...atuais]);
  }

  return (
    <>
      <Cabecalho totalNovas={novas.length} />

      <main className="container">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/publicacoes" element={<Publicacoes novas={novas} />} />
          <Route path="/publicacoes/:id" element={<DetalhePublicacao novas={novas} />} />
          <Route path="/nova" element={<NovaPublicacao onCriar={adicionarPublicacao} />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>

      <Rodape autor="Marco Antônio" />
    </>
  );
}

export default App;
