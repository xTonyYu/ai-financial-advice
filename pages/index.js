import Head from 'next/head'
import { Nunito } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import Spinner from '@/components/Spinner'
import Personas from '@/components/Personas'
import ExampleQuestions from '@/components/ExampleQuestions'

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
      if (isMobBoss) {
        return result + "... I've said too much.  I'll zip it."
      }

      return result + "... It's going to be a longer conversation. Let's setup a call."
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
        <h3>Get Your Investment Advice from a...</h3>
        <form onSubmit={onSubmit}>
          <Personas isMobBoss={isMobBoss} setIsMobBoss={setIsMobBoss} />
          <input
            type="text"
            name="investmentQuestion"
            placeholder="Ask an investment question"
            value={investmentQuestion}
            onInput={(e) => setInvestmentQuestion(e.target.value)}
          />
          <ExampleQuestions />
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
