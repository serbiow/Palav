import React from 'react';
import "./Keyboard.css";

const letras = 'abcdefghijklmnopqrstuvwxyz'.split('');

function Keyboard({ tentativas, palavraDoDia, onClick }) {
    const getStatus = (letra) => {
        // Checa se a letra já foi tentada
        for (let tentativa of tentativas) {
            if (tentativa.includes(letra)) {
                if (palavraDoDia.includes(letra)) {
                    return palavraDoDia.indexOf(letra) === tentativa.indexOf(letra) ? 'correta' : 'quase';
                }
                return 'errada';
            }
        }
        return 'neutra'; // letra não tentada
    };

    return (
        <div className="keyboard">
            {letras.map((letra) => (
                <button
                    key={letra}
                    className={`key ${getStatus(letra)}`}
                    onClick={() => onClick(letra)}
                >
                    {letra.toUpperCase()}
                </button>
            ))}
        </div>
    );
}

export default Keyboard;
