import './App.css'
import Header from './Components/Header';
import OnlineMembers from './Components/OnlineMembers/OnlineMembers'
import WatchList from './Components/WatchList/WatchList';
import Window from './Components/Window/Window';
import { OrderProvider } from './contexts/OrderContext';

function App() {
  return (
    <OrderProvider>
      <div className="App">
        <Header />

        <div className='windowsContainer'>
          <div>
            <OnlineMembers />
          </div>
          <div>
            <WatchList />
          </div>
        </div>

        <div className='windowsContainer'>
          <div style={{paddingTop: '2rem'}}>
            <Window title="Nossos fãs" isOpen={false}>
              <video className="featuredVideo" controls preload="metadata">
                <source src="/monarcadead.mp4" type="video/mp4" />
                Seu navegador não suporta a reprodução de vídeo.
              </video>
              <img
                className="featuredVideo"
                src="/CheidOrdioNoCanto.png"
                alt="Cheid Ordio no canto"
              />
              <video className="featuredVideo" controls preload="metadata">
                <source src="/ups.mp4" type="video/mp4" />
                Seu navegador não suporta a reprodução de vídeo.
              </video>
              <video className="featuredVideo" controls preload="metadata">
                <source src="/xolpicjacare.mp4" type="video/mp4" />
                Seu navegador não suporta a reprodução de vídeo.
              </video>
              <div>
                <p>
                Não quer aparecer no hall da fama? 
                Me chama no jogo que eu tiro.
                </p>
              </div>
            </Window>
          </div>
        </div>

      </div>
    </OrderProvider>
  )
}

export default App
