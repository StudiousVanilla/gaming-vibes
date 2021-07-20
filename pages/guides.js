import { useEffect } from 'react'
import styles from '../styles/Guides.module.css'

export default function Guides() {

  useEffect(()=>{
    // fetch('/.netlify/functions/supermario')
    //   .then(res => res.json())
    //   .then(data => console.log(data))

    const getData = async () => {   
      // relatiuve path to Netlify function endpoint
      const res = await fetch('/.netlify/functions/supermario')
      const data = await res.json()
      console.log(data);
    } 

    getData()


  },[])



  return (
    <div className={styles.guides}>
      <h2>All Guides</h2>
    </div> 
  )
}