import { useContext, useEffect, useState } from 'react'
import styles from '../styles/Guides.module.css'
import AuthContext from '../stores/authContext'

export default function Guides() {

  const {user, authReady} = useContext(AuthContext)
  const [guides, setGuides] = useState(null)
  const [error, setError] = useState(null)

  useEffect(()=>{

    const getData = async () => {

      try {

        // relatiuve path to Netlify function endpoint
        const res = await fetch('/.netlify/functions/guides', user && {
          headers: {
            Authorization: 'Bearer ' + user.token.access_token
          }
        })
      
        if(!res.ok){
          throw Error('You must be logged in to view this content')
        }

        const data = await res.json()
        setGuides(data)
        setError(null)
        
        } catch (error) {
          setError(error.message)
          setGuides(null)
        }
    } 


    if(authReady){
      getData()
    }

  },[user, authReady])



  return (
    <div className={styles.guides}>
      

      {!authReady && <div>Loading...</div>}

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}

      {guides && guides.map(guide=>(
        <div key={guide.title} className={styles.card}>
          <h3>{guide.title}</h3>
          <h4>Written by {guide.author}</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quidem dolorum amet nihil autem incidunt illum laborum, natus perferendis sequi eaque consequuntur beatae ea quam sed deleniti fuga cupiditate nisi?</p>
        </div>
      ))}



    </div> 
  )
}