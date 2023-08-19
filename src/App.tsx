import { onMount, type Component } from 'solid-js';
import { v4 as uuidv4 } from 'uuid';
import { setUserID } from './signals/userID';

const App: Component = () => {

  const generateIDIfNotExists = () => {
    if (!localStorage.getItem('user_id')) {
      localStorage.setItem('user_id', uuidv4());
    }
    setUserID(localStorage.getItem('user_id')!);
  }
  onMount(() => {
    generateIDIfNotExists();
  });

  return (
    <></>
  );
};

export default App;
