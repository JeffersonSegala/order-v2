import React, { useEffect } from 'react';
import './style.css';
import Window from '../Window/Window';
import Player from '../Player/Player';
import { useOrderDocumentTitle } from '../../contexts/useOrderDocumentTitle';
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
  const [individualPlayersOnline, setIndividualPlayersOnline] = React.useState<Player[]>([]);

  const watchListIndividualNames = new Set([
    'Abuuuh Matacoitado',
    'Alemao Donodeferobra',
    'Amora Stark',
    'Antiguedad',
    'Aprocura',
    'Ashura Phantom',
    'Atividade Criminosa',
    'Atos Sky Fox',
    'Bezerra donodeferobra',
    'Big Byrd Pro',
    'Blocker Louko',
    'Breckie',
    'Brolynho Berserk',
    'Brunin Joga Sujo',
    'Cachacilds Mussunzis',
    'Caipa',
    'Calegod',
    'Chefao Bolado',
    'Cheid Odio',
    'Chimy Rush',
    'Cobroo baraa',
    'Cotoco Assassino',
    'Crazy Froog',
    'Cria Sagaz',
    'Danielzinho Trem Bala',
    'Dat Deco',
    'Dead Qera',
    'Deivin Uchiha',
    'Delson in ferobraa',
    'Dhalija',
    'Dola Relthligol',
    'Dragny',
    'Druphor Paladin',
    'Elite Leozera',
    'Elite Zarili',
    'Erwuoez',
    'Escova Eletrica',
    'Estoicismo',
    'Fibrado Alenda',
    'Forti Archer',
    'Fullkareta raktinikaklet',
    'Galth Thalivan',
    'Ge Of War',
    'Ghostxsz',
    'Gohten',
    'Gorgonita Jackz',
    'Gorito Neverdie',
    'Gui Brutal',
    'Hanslip',
    'Hataz',
    'Hataz Imortal',
    'Havenox',
    'Helga Siefried',
    'Heratron Ellartorel',
    'Heyjudy',
    'Hopeet',
    'Icarus Roth',
    'Imkor',
    'Jiraia Sensei',
    'Jogando Pra Brincar',
    'Jon Shields',
    'Juliana Psicologa',
    'Junim Matamatou',
    'Julito Wake',
    'Justiceiiiro',
    'Justiceiiro',
    'Kai Greene',
    'Kaiizzen',
    'Kamikze Allyson',
    'Kamutreta',
    'Kamutreta Agora',
    'Katastrofalny',
    'Kevoran',
    'Kiingyye',
    'Kinaahzzord',
    'Kinaitaun',
    'Kolmyr isback',
    'Kuarox',
    'Lady Miltreta',
    'Lady Rhulez',
    'Lahalisir',
    'Legaacy',
    'Legendary Coxo',
    'Leozera',
    'Lombrard',
    'Lord Dhorion Bomba',
    'Luke Shardary',
    'Luvan Howyno',
    'Mage Tesla',
    'Martur Sian',
    'Matheeus Fortrek',
    'Mathsz Hard',
    'Maykoliito El Druida',
    'Melikinha Jiraia',
    'Menina Of Impera',
    'Menor Bigode',
    'Mini Ghaaly',
    'Mustache King',
    'Nephasto Imperdoavel',
    'Nico Nico Matamil',
    'Nyck The Immortal',
    'Odin Trapaceiro',
    'Owain',
    'Palyzer',
    'Pally Del Mal',
    'Paralizer Brasi',
    'Paralizer Brasil',
    'Pest Exterminator',
    'Pithegod',
    'Pittbull Jurista',
    'Pklizard',
    'Pombador Di Prima',
    'Pozzi Tiff',
    'Predator Shed',
    'Pronto King',
    'Pulerams',
    'Pure Vision',
    'Quiin zera',
    'Rabanete Assassino',
    'Rasit',
    'Return of Peka',
    'Rukim Deadly',
    'Sared Ikan',
    'Sky onxy',
    'Snowmah',
    'Snowwmah',
    'Sponsored by Shenris',
    'Stycker',
    'Swag Er',
    'Swuave knight',
    'Talles Bonebreaker',
    'Thaigon Ferobrain',
    'Thano Vicious',
    'Theu of halls',
    'Thiaguin Comanderr',
    'Tremendola',
    'True Turbo',
    'Veiao El Patron',
    'Veldora Tempeste',
    'Xiinavueko',
    'Xolp',
    'Xolpic',
    'Xopiq',
    'Xubilubiz',
    'Zubat the Ruthless',
    'Zwynmk Pride',
    'Zyskan',
  ]);

  useEffect(() => {
    fetchFerobra();
    const intervalId = setInterval(fetchFerobra, 30000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Sort by level descending
    individualPlayersOnline.sort((a, b) => b.level - a.level);
    setPlayersOnline(individualPlayersOnline);
  }, [individualPlayersOnline]);

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
