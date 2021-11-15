import { useSession, signIn, signOut } from "next-auth/client"

export default function HomePage() {
    const [ session, loading ] = useSession()
    return (
        <>
            {
                !session && <>
                <p>
                    Welcome to Xavi–making workplace more connected, one Loom at a time!
                </p>
                <button onClick={() => signIn()}>Sign In</button>
                </>
            }
            {
                session && <><p>Hi {session.user.email}!</p><button onClick={() => signOut()}>Sign Out</button></>
            }
        </>
    )
}