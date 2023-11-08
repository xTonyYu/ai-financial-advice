import styles from '@/styles/Spinner.module.css'

export default function Spinner({message}) {
  return (
    <div className={styles.container}>
      <div className={styles.message}>{message}</div>
      <div className={styles.spinner}></div>
    </div>
  )
}
