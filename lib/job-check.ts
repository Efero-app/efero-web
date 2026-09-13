export const JOB_CHECK_QUESTIONS = [
  {
    id: 'tilbud',
    short: 'Tilbud',
    question: 'Er kundens ja til tilbudet lagret på jobben?',
    fix: 'Finn kundens ja til tilbudet.',
  },
  {
    id: 'timer',
    short: 'Timer',
    question: 'Er alle timene ført?',
    fix: 'Før timene som mangler.',
  },
  {
    id: 'materialer',
    short: 'Materialer',
    question: 'Er alle materialene med?',
    fix: 'Legg inn materialene som mangler.',
  },
  {
    id: 'bilder',
    short: 'Bilder',
    question: 'Ligger bilder og notater på riktig jobb?',
    fix: 'Samle bilder og notater på jobben.',
  },
  {
    id: 'faktura',
    short: 'Faktura',
    question: 'Kan fakturaen lages uten å lete etter noe?',
    fix: 'Finn det siste som mangler før faktura.',
  },
] as const

export type JobCheckQuestionId = (typeof JOB_CHECK_QUESTIONS)[number]['id']
export type JobCheckAnswer = 'yes' | 'sometimes' | 'no'
export type JobCheckAnswers = Partial<Record<JobCheckQuestionId, JobCheckAnswer>>

const answerPoints: Record<JobCheckAnswer, number> = {
  yes: 2,
  sometimes: 1,
  no: 0,
}

export function scoreJobCheck(answers: JobCheckAnswers) {
  return JOB_CHECK_QUESTIONS.reduce((sum, question) => {
    const answer = answers[question.id]
    return sum + (answer ? answerPoints[answer] : 0)
  }, 0)
}

export function getJobCheckResult(answers: JobCheckAnswers) {
  const score = scoreJobCheck(answers)
  const missing = JOB_CHECK_QUESTIONS.filter(question => answers[question.id] !== 'yes')

  if (score === 10) {
    return {
      score,
      title: 'Jobben er klar.',
      text: 'Tilbud, timer, materialer og dokumentasjon er på plass. Nå kan fakturaen lages.',
      missing,
    }
  }

  if (score >= 7) {
    return {
      score,
      title: 'Nesten klar.',
      text: 'Det er bare noen få ting igjen før fakturaen kan lages.',
      missing,
    }
  }

  if (score >= 4) {
    return {
      score,
      title: 'Noe mangler.',
      text: 'Jobben er gjort, men informasjonen er ikke samlet ennå.',
      missing,
    }
  }

  return {
    score,
    title: 'Her forsvinner tiden.',
    text: 'Mye må finnes og føres før fakturaen kan lages.',
    missing,
  }
}
