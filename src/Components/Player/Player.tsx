import React from 'react';
import './style.css';

type Member = {
  name: string;
  status: string;
  level: number;
  vocation: string;
};

interface GuildMemberProps {
  player: Member;
  hint?: string;
}

const Player: React.FC<GuildMemberProps> = ({ player, hint }) => {
  const charTibiaLink = (name: string) => {
    return `https://www.tibia.com/community/?name=${name}`;
  };

  function extrairIniciais(frase: string) {
    const palavras = frase.split(' ');
    let iniciais = '';
    for (let i = 0; i < palavras.length; i++) {
      iniciais += palavras[i].charAt(0);
    }
    return iniciais;
  }

  return (
    <div className={`member ${player.status === 'online' ? 'online' : 'offline'}`} key={player.name} title={hint}>
      <a href={charTibiaLink(player.name)} target='_blank' rel='noreferrer'>
        <img src={player.vocation + '.png'} className="vocationImage" alt={extrairIniciais(player.vocation)} />
        {' ' + player.name + ' (' + player.level + ')'}
      </a>
    </div>
  );
};

export default Player;
