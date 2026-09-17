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
            <Window title="Nosso fã Nº1" isOpen={false}>
              <video className="featuredVideo" controls preload="metadata">
                <source src="/xolpicmin.mp4" type="video/mp4" />
                Seu navegador não suporta a reprodução de vídeo.
              </video>
            </Window>
          </div>
        </div>

      </div>
    </OrderProvider>
  )
}

export default App
