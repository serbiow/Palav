import { useState, useEffect } from 'react';
import { palavras } from './data/palavras';
import Keyboard from './components/Keyboard';
import './App.css';

const getPalavraAleatoria = () => {
  const indice = Math.floor(Math.random() * palavras.length);
  return palavras[indice];
};

function App() {
  const [palavraDoDia, setPalavraDoDia] = useState('');
  const [tentativaAtual, setTentativaAtual] = useState('');
  const [tentativas, setTentativas] = useState([]);

  useEffect(() => {
    setPalavraDoDia(getPalavraAleatoria());
  }, []);

  const handleChange = (e) => {
    if (e.target.value.length <= 5) {
      setTentativaAtual(e.target.value.toLowerCase());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tentativaAtual.length === 5) {
      setTentativas([...tentativas, tentativaAtual]);
      setTentativaAtual('');
    }
  };

  const handleKeyClick = (letra) => {
    if (tentativaAtual.length < 5) {
      setTentativaAtual(tentativaAtual + letra);
    }
  };

  const getStatus = (letra, index) => {
    if (!palavraDoDia) return '';
    if (palavraDoDia[index] === letra) return 'correta';
    if (palavraDoDia.includes(letra)) return 'quase';
    return 'errada';
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Palav</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={tentativaAtual}
          onChange={handleChange}
          maxLength={5}
          placeholder="Digite uma palavra"
        />
        <button type="submit">Enviar</button>
      </form>

      {tentativas.map((tentativa, i) => (
        <div key={i} style={{ display: 'flex', gap: 4, marginTop: 8 }}>
          {[...tentativa].map((letra, j) => (
            <div
              key={j}
              className={`letra ${getStatus(letra, j)}`}
            >
              {letra.toUpperCase()}
            </div>
          ))}
        </div>
      ))}

      <Keyboard tentativas={tentativas} palavraDoDia={palavraDoDia} onClick={handleKeyClick} />
    </div>
  );
}

export default App;
