import Head from 'next/head'
import Image from 'next/image'
import { Nunito } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import Spinner from '@/components/Spinner'

const font = Nunito({ subsets: ['latin'] })

export default function Home() {
  const [investmentQuestion, setInvestmentQuestion] = useState("")
  const [hideSpinner, setHideSpinner] = useState(true)
  const [result, setResult] = useState("")
  const [isMobBoss, setIsMobBoss] = useState(true)


  const onSubmit = async(e) => {
    e.preventDefault()

    try {
      setHideSpinner(false)

      const resp = await getAdvice()
      const data = await resp.json()

      if (resp.status !== 200) {
        throw data.error || new Error(`Request failed. Status: ${resp.status}`)
      }

      const theAdvice = advice(data.result, data.finishReason)

      setResult(theAdvice)
      setHideSpinner(true)
      setInvestmentQuestion("")
    } catch(error) {
      setHideSpinner(true)
      console.error(error)
      alert(error.message)
    }
  }

  const getAdvice = async () => {
    const resp = await fetch('/api/generate', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ investmentQuestion: investmentQuestion, isMobBoss: isMobBoss })
    })

    return resp;
  }

  const advice = (result, finishReason) => {
    if (finishReason !== "stop") {
      return result + "... I've said too much.  I'll zip it."
    } else {
      return result
    }
  }

  return (
    <>
      <Head>
        <title>Financial Advice</title>
        <meta name="description" content="So-so financial advice app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/mafia-boss.svg" />
      </Head>
      <main className={`${styles.main} ${font.className}`}>
        <h3>Get Your Investment Advice from a Mob Boss!</h3>
        <form onSubmit={onSubmit}>
          <Image
            src="/mafia-boss.svg"
            alt="Mob boss image"
            className={styles.boss}
            width={200}
            height={96}
            priority
          />
          <Image
            src="/rich-person.svg"
            alt="Rich person image"
            className={styles.richperson}
            width={200}
            height={96}
            priority
          />
          <input
            type="checkbox" name="isMobBoss" value="true"
            checked={isMobBoss}
            onClick={() => setIsMobBoss(!isMobBoss)}
          />
          <input
            type="text"
            name="investmentQuestion"
            placeholder="Ask an investment question"
            value={investmentQuestion}
            onInput={(e) => setInvestmentQuestion(e.target.value)}
          />
          <input type="submit" value="Get Advice" />
        </form>
        <div hidden={hideSpinner}>
          <Spinner message="Don&apos;t rush me! Let me think..." />
        </div>
        <div className={styles.result} hidden={!hideSpinner}>
          {result}
        </div>
      </main>
    </>
  )
}
