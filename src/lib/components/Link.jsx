import {useNavigate} from '../hooks/useNavigate'

export function Link({to , children , ...props}){
    const navigate = useNavigate()

    const handleLink = (e) => {
        e.preventDefault();

        navigate(to);
    }

    return(
        <a href={to} onClick={handleLink} {...props}>{children}</a>
    )
}