import { createContext, useEffect, useState } from "react";
import netlifyIdentify from 'netlify-identity-widget'

const AuthContext = createContext({
    user: null,
    login: () =>{},
    logout: () =>{},
    authReady: false
})


// create space for component logic
export const AuthContextProvider = ({ children }) =>{

    const [user, setUser] = useState(null)

    useEffect(()=>{

        // netlify event listeners are triggered by onclick events set in chil components

        // user automtically provided by netlifyIdentify, then use setstate to update our state varible 'user'
        netlifyIdentify.on('login', (user)=>{
            setUser(user)
            // closes modal
            netlifyIdentify.close()
            console.log('login event');
        })

        netlifyIdentify.on('logout', ()=>{
            setUser(null)
            console.log('logout event');
        })

        // init netlify identify connection
        netlifyIdentify.init()

        // fires when component unmounts (unlikely to happen with context wrapper but good practice)

        return () => {
            netlifyIdentify.off('login')
            netlifyIdentify.off('logout')
        }
    },[])

    const login = () =>{
        netlifyIdentify.open()
    }

    const logout =() =>{
        netlifyIdentify.logout()
    }

    // don't need key:value repetitons (login: login => login)
    const context = {user, login, logout}


// just acts as a wrapper for components inside
    return (
        <AuthContext.Provider value={context}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext