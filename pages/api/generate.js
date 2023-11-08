import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default async function generate(req, res) {
  if (!openai.apiKey) {
    res.status(500).json({
      error: {
        message: "Missing OpenAI API Key in your local .env file."
      }
    });
    return;
  }

  const question = req.body.investmentQuestion || '';
  if (!question) {
    res.status(500).json({
      error: {
        message: "Please type in a question"
      }
    });
    return;
  }

  const isMobBoss = req.body.isMobBoss
  const advicerPersona = {
    "true": "You are a mob boss who provides funny investment advices that relate to gambling and counter to conventional thinking. You must response in less than 100 words and in 3 brief bullet points",
    "false": "You are a helpful financial planner who always provide a numeric percentage for allocation when asked even without all the information needed, provide a list of US stocks and ETFs when asked, and response in less than 100 words and in brief bullet points style without giving any disclosure."
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: advicerPersona[isMobBoss] },
                  { role: "user", content: question }],
      model: "gpt-3.5-turbo",
      // seed: 20231106,
      temperature: 1.2, // 0 to 2; lower value more deterministic vs random
      max_tokens: 150,
    });
    console.log(completion)

    res.status(200).json({
      result: completion.choices[0].message.content,
      finishReason: completion.choices[0].finish_reason
    });
  } catch(error) {
    console.error(error)
    res.status(500).json({
      error: {
        message: `Something went wrong.`
      }
    });
  }
}
