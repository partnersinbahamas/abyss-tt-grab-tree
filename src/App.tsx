import { Header } from './Components/Header/Header';
import { Wall } from './Components/Wall/Wall';
import './App.scss';
import { useCallback, useState } from 'react';

const App = () => {
  const [isNavigated, setIsNavigated] = useState<boolean>(false);

  const isNavigatedHandler = useCallback(() => {
    setIsNavigated(true);

    setTimeout(() => {
      setIsNavigated(false);
    }, 700);
  }, [])

  return (
    <section className="app">
      <Header onNavigate={isNavigatedHandler} />

      <div className="app__container" onClick={(event) => event.stopPropagation()}>
          <Wall isNavigated={isNavigated} isNavigatedHandler={isNavigatedHandler}/>
      </div>
    </section>
  )
}

export default App;
