import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [investmentQuestion, setInvestmentQuestion] = useState("")
  const [hideSpinner, setHideSpinner] = useState(true)
  const [result, setResult] = useState("")

  const onSubmit = async(e) => {
    e.preventDefault()
    console.log(investmentQuestion)

    try {
      setHideSpinner(false)

      const resp = await getAdvice()
      const data = await resp.json()

      if (resp.status !== 200) {
        throw data.error || new Error(`Request failed. Status: ${resp.status}`)
      }
      setResult(data.result)
      setHideSpinner(true)
      // setInvestmentQuestion("")
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
      body: JSON.stringify({ investmentQuestion: investmentQuestion })
    })

    return resp;
  }

  return (
    <>
      <Head>
        <title>Financial Advice</title>
        <meta name="description" content="So-so financial advice app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h3>Get Your Investment Advice from a Mob Boss!</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="investmentQuestion"
            placeholder="Ask an investment question"
            value={investmentQuestion}
            onInput={(e) => setInvestmentQuestion(e.target.value)}
          />
          <input type="submit" value="Get Advice" />
        </form>
        <div className={styles.result}>
          <div className="spinner" hidden={hideSpinner}>
            <div>Don&apos;t rush me! Let me think...</div>
          </div>
          {result}
        </div>
      </main>
    </>
  )
}
