import {Router} from './lib';
import {routes} from './utils/routes';

export default function App(){
  return(
    <div className="App">
      <Router routes={routes}/>
    </div>
  )
}