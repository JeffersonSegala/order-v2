import React, { useEffect } from 'react';
import './style.css';
import Window from '../Window/Window';
import Player from '../Player/Player';
import { useOrderDocumentTitle } from '../../contexts/useOrderDocumentTitle';
import { useGuild } from '../../contexts/OrderContext';
interface WatchListProps {

}

interface Player {
  level: number;
  name: string;
  status: string;
  vocation: string;
}

type Member = Player;

const WatchList: React.FC<WatchListProps> = () => {
  const [playersOnline, setPlayersOnline] = React.useState<Player[]>([]);
  const [individualPlayersOnline, setIndividualPlayersOnline] = React.useState<Player[]>([]);
  const janteiDominatGuild = useGuild('jantei-dominat');

  const watchListIndividualNames = new Set([
    'Abuuuh Matacoitado',
    'Alemao Donodeferobra',
    'Antiguedad',
    'Aprocura',
    'Atividade Criminosa',	
    'Atos Sky Fox',
    'Bezerra donodeferobra',
    'Big Byrd Pro',
    'Breckie',
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
    'Farsta Magikern',
    'Fibrado Alenda',
    'Fullkareta raktinikaklet',
    'Galth Thalivan',
    'Ghostxsz',
    'Gohten',
    'Gorito Neverdie',
    'Gorgonita Jackz',
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
    'Martur Sian',
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
    'Pithegod',
    'Xiinavueko',
    'Xolp',
    'Xubilubiz',
    'Zwynmk Pride',
    'Zyskan',
  ]);

  useEffect(() => {
    fetchFerobra();
    const intervalId = setInterval(fetchFerobra, 30000);
    return () => clearInterval(intervalId);
  }, []);

  // Combine individual names + Jantei Dominat members
  useEffect(() => {
    const janteiOnlineMembers = janteiDominatGuild.members.filter(
      (member: Member) => member.status === 'online'
    );

    // Combine both lists and deduplicate by name
    const combinedPlayers = [...individualPlayersOnline];
    const existingNames = new Set(combinedPlayers.map(p => p.name));

    for (const member of janteiOnlineMembers) {
      if (!existingNames.has(member.name)) {
        combinedPlayers.push(member);
      }
    }

    // Sort by level descending
    combinedPlayers.sort((a, b) => b.level - a.level);
    setPlayersOnline(combinedPlayers);
  }, [individualPlayersOnline, janteiDominatGuild.members]);

  const fetchFerobra = () => {
    fetch('https://api.tibiadata.com/v4/world/Ferobra')
      .then(response => response.json())
      .then(ferobraData => {
        const newList = ferobraData.world.online_players.filter((player: { name: string; }) => watchListIndividualNames.has(player.name));
        setIndividualPlayersOnline(newList);
      })
      .catch(err => console.error('fetchFerobra error', err));
  }

  useOrderDocumentTitle(playersOnline.length);

  return (
    <Window title={'Watch List - ' + playersOnline.length} isOpen={true}>
      {playersOnline.length === 0 && 'carregando...'}
      {playersOnline.map((player, index) => {
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
