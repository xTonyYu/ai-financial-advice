import styles from '@/styles/ExampleQuestions.module.css'

export default function ExampleQuestions() {
  return (
    <div className={styles.questions}>
        <h4>Example questions...</h4>
        <span>I&apos;m 22. How should I invest my money?</span>
        <span>I&apos;m 35. What is my asset allocation?</span>
        <span>I&apos;m 75. What bonds should I invest?</span>
        <span>What mid-cap stocks should I invest?</span>
    </div>
  )
}
