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
    'Abuuuh Matacoitado',
    'Antiguedad',
    'Atos Sky Fox',
    'Bewy',
    'Blackout Supreme',
    'Caipa',
    'Chimy Rush',
    'Crazy Froog',
    'Cotoco Assassino',
    'Delson in ferobraa',
    'Dead Qera',
    'Druphor Paladin',
    'Danielzinho Trem Bala',
    'Erwuoez',
    'Estoicismo',
    'Elite Leozera',
    'Fullkareta raktinikaklet',
    'Gorito Neverdie',
    'Gui Brutal',
    'Havenox',
    'Helga Siefried',
    'Icarus Roth',
    'Junim Matamatou',
    'Jogando Pra Brincar',  
    'Kiingyye',
    'Kaiizzen',
    'Lady Rhulez',
    'Lady Miltreta',
    'Lombrard',
    'Matheeus Fortrek',
    'Mustache King',
    'Nephasto Imperdoavel',
    'Menor Bigode',
    'Menina Of Impera',
    'Nico Nico Matamil',
    'Odin Trapaceiro',
    'Predator Shed',
    'Paralizer Brasi',
    'Pittbull Jurista',
    'Quiin zera',
    'Return of Peka',
    'Stycker',
    'Swag Er',
    'Swuave knight',
    'Talles Bonebreaker',
    'Talles Bonebreaker',
    'Thiaguin Comanderr',
    'Thaigon Ferobrain',
    'Tremendola',
    'True Turbo',
    'Veldora Tempeste',
    'Xubilubiz',
    'Zyskan',
    'Zwynmk Pride',
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
        document.title = `(${newList.length}) Order`;
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
