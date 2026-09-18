import './App.css'
import Header from './Components/Header';
import OnlineMembers from './Components/OnlineMembers/OnlineMembers'
import WatchList from './Components/WatchList/WatchList';
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

      </div>
    </OrderProvider>
  )
}

export default App
