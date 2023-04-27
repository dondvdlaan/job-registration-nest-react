import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing';
import Menu from './menu/Menu';


function App() {


  return (
    <>
      <BrowserRouter>
        <Menu>
          <Routing />
        </Menu>
      </BrowserRouter>
    </>
  );
}

export default App;
