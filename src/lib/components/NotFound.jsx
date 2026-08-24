import './NotFound.css';
import {Link} from './Link';

export function NotFound({
    title = "404", 
    message = "Page Not Found",
    badgeText = "Error",
    buttonText = "Back to Home",
    buttonTo = "/",
    showButton = true,
    className = "",
    children
}){
    return(
        <main className={`not-found ${className}`}>
            <div className="not-found_card">
                <span className="not-found_badge">{badgeText}</span>

                <h1>{title}</h1>
                <p>{message}</p>

                {children}

                {showButton && (
                    <Link to={buttonTo} className="not-found_button">{buttonText}</Link>
                )}
            </div>
        </main>
    ) 
}