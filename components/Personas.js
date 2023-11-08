import Image from 'next/image'
import styles from '@/styles/Personas.module.css'

export default function Personas({isMobBoss, setIsMobBoss}) {
  return (
    <div className={styles.personas}>
      <div className={styles.persona}>
        <div>Mob Boss</div>
        <Image
          src="/mafia-boss.svg"
          alt="Mob boss image"
          className={styles.boss}
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
      <div className={styles.persona}>
        <div>Rich Person</div>
        <Image
          src="/rich-person.svg"
          alt="Rich person image"
          className={styles.richperson}
          width={125}
          height={96}
          priority
        />
      </div>
    </div>
  )
}