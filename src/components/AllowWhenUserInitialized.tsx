import { onMount, ParentComponent } from 'solid-js';
import { getPathWithPrefix } from '../helpers/routingHelper';
import { useNavigate } from '@solidjs/router';
import getUser from '../hooks/userHook';


const AllowWhenUserInitalzed: ParentComponent<{ denyWhenUserInitialzed?: boolean }> = (props) => {

    const user = getUser()
    const navigate = useNavigate();

    onMount(() => {
        if (!props.denyWhenUserInitialzed && !user.isInitialized()) {
            console.log("Redirecting")
            navigate(getPathWithPrefix('/create-user'), { replace: true })
        }
        else if (props.denyWhenUserInitialzed && user.isInitialized()) {
            navigate(getPathWithPrefix('/'), { replace: true })
        }
    })

    return (
        <>
            {props.children}
        </>
    )

}

export default AllowWhenUserInitalzed;