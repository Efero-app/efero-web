/** An HTTP success alone is not proof that an application was accepted. */
export function isConfirmedIntake(value: unknown): value is { ok: true } {
  return typeof value === 'object' && value !== null && 'ok' in value && value.ok === true
}

/** Preserve the original operation after ambiguous responses, including rate-limited retries. */
export function shouldRetrySameIntake(status: number) {
  return status < 400 || status >= 500 || [408, 425, 429].includes(status)
}
