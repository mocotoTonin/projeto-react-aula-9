// Exibe o erro da API e permite tentar a requisição novamente
function MensagemErro({ texto, onTentarNovamente }) {
  return (
    <div className="mensagem erro">
      <p>{texto}</p>
      {onTentarNovamente && (
        <button type="button" className="botao secundario" onClick={onTentarNovamente}>
          Tentar novamente
        </button>
      )}
    </div>
  );
}

export default MensagemErro;
