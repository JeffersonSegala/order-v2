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
    'Alemao Donodeferobra',
    'Antiguedad',
    'Aprocura',
    'Atividade Criminosa',	
    'Atos Sky Fox',
    'Bezerra donodeferobra',
    'Big Byrd Pro',
    'Cachacilds Mussunzis',
    'Caipa',
    'Calegod',
    'Chimy Rush',
    'Cotoco Assassino',
    'Crazy Froog',
    'Danielzinho Trem Bala',
    'Dat Deco',
    'Dead Qera',
    'Delson in ferobraa',
    'Dragny',
    'Druphor Paladin',
    'Elite Leozera',
    'Elite Zarili',
    'Erwuoez',
    'Estoicismo',
    'Fibrado Alenda',
    'Fullkareta raktinikaklet',
    'Galth Thalivan',
    'Ghostxsz',
    'Gohten',
    'Gorito Neverdie',
    'Gui Brutal',
    'Hataz Imortal',
    'Hataz',
    'Havenox',
    'Helga Siefried',
    'Heyjudy',
    'Icarus Roth',
    'Imkor',
    'Jogando Pra Brincar',
    'Jon Shields',
    'Juliana Psicologa',
    'Junim Matamatou',
    'Kai Greene',
    'Kaiizzen',
    'Kamikze Allyson',
    'Kamutreta',
    'Kevoran',
    'Kiingyye',
    'Kinaitaun',
    'Kolmyr isback',
    'Kuarox',
    'Lady Miltreta',
    'Lady Rhulez',
    'Lombrard',
    'Lord Dhorion Bomba',
    'Luke Shardary',
    'Mage Tesla',
    'Matheeus Fortrek',
    'Mathsz Hard',
    'Melikinha Jiraia',
    'Menina Of Impera',
    'Menor Bigode',
    'Mustache King',
    'Nephasto Imperdoavel',
    'Nico Nico Matamil',
    'Nyck The Immortal',
    'Odin Trapaceiro',
    'Paralizer Brasi',
    'Pittbull Jurista',
    'Pozzi Tiff',
    'Predator Shed',
    'Pronto King',
    'Pulerams',
    'Quiin zera',
    'Return of Peka',
    'Sky onxy',
    'Snowmah',
    'Sponsored by Shenris',
    'Stycker',
    'Swag Er',
    'Swuave knight',
    'Talles Bonebreaker',
    'Thaigon Ferobrain',
    'Theu of halls',
    'Thiaguin Comanderr',
    'Tremendola',
    'True Turbo',
    'Veldora Tempeste',
    'Xiinavueko',
    'Xolp',
    'Xubilubiz',
    'Zwynmk Pride',
    'Zyskan'
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
