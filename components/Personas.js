import Image from 'next/image'
import styles from '@/styles/Personas.module.css'
import { useEffect } from 'react';

export default function Personas({isMobBoss, setIsMobBoss}) {
  useEffect(() => {
    const selectAdvicer = () => {
      const boss = document.querySelector(".boss")
      const richPerson = document.querySelector(".richperson")

      if (isMobBoss) {
        boss.classList.add(`${styles.glow}`)
        richPerson.classList.remove(`${styles.glow}`)
      } else {
        boss.classList.remove(`${styles.glow}`)
        richPerson.classList.add(`${styles.glow}`)
      }
    };

    selectAdvicer();
  }, [isMobBoss]);

  return (
    <div className={styles.personas}>
      <div className="${styles.persona} boss">
        <div>Mob Boss</div>
        <Image
          src="/mafia-boss.svg"
          alt="Mob boss image"
          width={125}
          height={96}
          priority
        />
      </div>
      <div>
        <div>Pick an advicer</div>
        <input
          type="checkbox" name="isMobBoss" value="true"
          checked={isMobBoss}
          onChange={() => setIsMobBoss(!isMobBoss)}
        />
      </div>
      <div className="${styles.persona} richperson">
        <div>Rich Person</div>
        <Image
          src="/rich-person.svg"
          alt="Rich person image"
          width={125}
          height={96}
          priority
        />
      </div>
    </div>
  )
}
