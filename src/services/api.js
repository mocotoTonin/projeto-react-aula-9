// Funções de acesso à API JSONPlaceholder (API pública de testes)
const URL_BASE = "https://jsonplaceholder.typicode.com";

// Função genérica: faz a requisição, verifica response.ok e interpreta o JSON
async function requisitar(caminho, opcoes = {}) {
  const resposta = await fetch(`${URL_BASE}${caminho}`, opcoes);

  if (!resposta.ok) {
    throw new Error(`Erro na consulta (status ${resposta.status})`);
  }

  return resposta.json();
}

export function buscarPublicacoes(signal) {
  return requisitar("/posts", { signal });
}

export function buscarPublicacao(id, signal) {
  return requisitar(`/posts/${id}`, { signal });
}

export function buscarComentarios(id, signal) {
  return requisitar(`/posts/${id}/comments`, { signal });
}

export function buscarUsuarios(signal) {
  return requisitar("/users", { signal });
}

export function buscarUsuario(id, signal) {
  return requisitar(`/users/${id}`, { signal });
}

// Envio de dados com POST: headers informa o formato e JSON.stringify converte o objeto
export function criarPublicacao(publicacao) {
  return requisitar("/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(publicacao),
  });
}
