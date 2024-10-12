import { createSignal, type Component } from 'solid-js';
import { getPathWithPrefix } from '../helpers/routingHelper';
import AllowWhenUserInitalzed from '../components/AllowWhenUserInitialized';
import { useNavigate } from '@solidjs/router';

import './styles/creatuserpage.css';
import getUser from '../hooks/userHook';


const CreateUserPage: Component = () => {

    const user = getUser();
    const [username, setUsernameFromFeild] = createSignal('');
    const navigate = useNavigate();

    const onProceedButtonClick = () => {
        user.setUser(username())
        //TODO store context & goto correct page
        navigate(getPathWithPrefix('/'), { replace: true })
    }

    return (
        <AllowWhenUserInitalzed denyWhenUserInitialzed>
            <div class='root'>
                <div class='form'>
                    <div class='width100 field'>
                        <label class='label'>Pick your user name</label>
                        <div class='control'>
                            <input class='input' type='text' placeholder='e.g., CoolCat123' onInput={(event) => setUsernameFromFeild(event.currentTarget.value)} />
                        </div>
                    </div>
                    <div class='width100 control'>
                        <button class={'width100 button is-link'} disabled={!username()} onClick={() => onProceedButtonClick()}>Proceed</button>
                    </div>
                </div>
            </div >
        </AllowWhenUserInitalzed>
    )
}

export default CreateUserPage;