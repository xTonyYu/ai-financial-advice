import Image from 'next/image'
import styles from '@/styles/Personas.module.css'

export default function Personas({isMobBoss, setIsMobBoss}) {
  const selectAdvicer = () => {
    const boss = document.querySelector(".boss")
    const richPerson = document.querySelector(".richperson")
    const prevSelection = isMobBoss

    setIsMobBoss(!isMobBoss)

    if (prevSelection) {
      boss.classList.remove(`${styles.glow}`)
      richPerson.classList.add(`${styles.glow}`)
    } else {
      boss.classList.add(`${styles.glow}`)
      richPerson.classList.remove(`${styles.glow}`)
    }
  }

  return (
    <div className={styles.personas}>
      <div className={`boss ${styles.glow}`}>
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
          onChange={() => selectAdvicer()}
        />
      </div>
      <div className="richperson">
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
