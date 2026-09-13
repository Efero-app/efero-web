import { describe, expect, it } from 'vitest'
import { getJobCheckResult, scoreJobCheck, type JobCheckAnswers } from './job-check'

describe('jobbsjekken', () => {
  it('gir full score når alt er på plass', () => {
    const answers: JobCheckAnswers = {
      tilbud: 'yes',
      timer: 'yes',
      materialer: 'yes',
      bilder: 'yes',
      faktura: 'yes',
    }

    expect(scoreJobCheck(answers)).toBe(10)
    expect(getJobCheckResult(answers).title).toBe('Jobben er klar.')
    expect(getJobCheckResult(answers).missing).toHaveLength(0)
  })

  it('viser alle punkter som ikke er helt på plass', () => {
    const answers: JobCheckAnswers = {
      tilbud: 'yes',
      timer: 'sometimes',
      materialer: 'no',
      bilder: 'yes',
      faktura: 'no',
    }

    const result = getJobCheckResult(answers)
    expect(result.score).toBe(5)
    expect(result.title).toBe('Noe mangler.')
    expect(result.missing.map(question => question.id)).toEqual(['timer', 'materialer', 'faktura'])
  })

  it('behandler ubesvarte spørsmål som ikke klare', () => {
    const result = getJobCheckResult({})
    expect(result.score).toBe(0)
    expect(result.missing).toHaveLength(5)
  })
})
