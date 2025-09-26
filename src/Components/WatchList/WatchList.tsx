import React, { useEffect } from 'react';
import './style.css';
import Window from '../Window/Window';
import Player from '../Player/Player';
interface WatchListProps {

}

interface Player {
  level: number;
  name: string;
  status: string;
  vocation: string;
}

const WatchList: React.FC<WatchListProps> = () => {
  const [playersOnline, setPlayersOnline] = React.useState<Player[]>([]);

  const watchList = [
    'Paralizer Brasi',
    'Talles Bonebreaker',
    'Gorito Neverdie',
    'Matheeus Fortrek',
    'Atos Sky Fox',
    'Stycker',
    'Havenox',
    'Icarus Roth',
    'Helga Siefried',
    'Lady Rhulez',
    'Bewy',
    'Nico Nico Matamil',
    'Chimy Rush',
    'Pittbull Jurista',
    'Thiaguin Comanderr',
    'Blackout Supreme',
    'Fullkareta raktinikaklet',
    'Zwynmk Pride',
    'Return of Peka',
    'Druphor Paladin',
    'Tremendola',
    'Gui Brutal',
    'Quiin zera',
    'Thaigon Ferobrain',
    'Zyskan',
    'Estoicismo',
    'Xubilubiz',
    'Lady Miltreta',
    'Antiguedad',
    'Delson in ferobraa',
    'Odin Trapaceiro',
    'Erwuoez',
    'Mustache King',
    'Caipa',
    'True Turbo',
    'Abuuuh Matacoitado',
    'Crazy Froog',
    'Swuave knight',
    'Nephasto Imperdoavel',
    'Kiingyye',
    'Junim Matamatou',
    'Jogando Pra Brincar',
    'Danielzinho Trem Bala',
  ];

  useEffect(() => {
    fetchFerobra();
    const intervalId = setInterval(fetchFerobra, 30000);
    return () => clearInterval(intervalId);
  }, []);


  const fetchFerobra = () => {
    fetch('https://api.tibiadata.com/v4/world/Ferobra')
      .then(response => response.json())
      .then(data => {
        const newList = data.world.online_players.filter((player: { name: string; }) => watchList.includes(player.name))
        setPlayersOnline(newList)
      });
  }

  const onlineMembersByLevel = () => {
    return playersOnline.sort((a, b) => b.level - a.level);
  };

  return (
    <Window title={'Watch List - ' + playersOnline.length} isOpen={true}>
      {playersOnline.length === 0 && 'carregando...'}
      {onlineMembersByLevel().map((player, index) => {
        return (
          <div className="onlineMember" key={'watchlist-' + index}>
            <Player player={{ ...player, status: 'online' }} />&nbsp;
            <img src='pk.gif' alt='pk' />
            <a href={`https://www.tibiaring.com/char.php?c=${player.name}`} target="_blank" rel="noopener noreferrer"> TibiaRing</a>
          </div>
        );
      })}
    </Window>
  );
};

export default WatchList;
