import Link from 'next/link';

interface Props {
    userIsLoggedIn: boolean,
    username?: string
}

/**
 * A component that renders login status and links.
 */
const Authentication = (props: Props): JSX.Element => {
    const usernameEl = props.username ? <span><strong>{props.username}</strong></span> : <span>Not logged in</span>;
    return (
        <div>
            {usernameEl}
            <Link href="/api/auth/start">
                <a>Log in</a>
            </Link>
        </div>
    );
}

export default Authentication;
