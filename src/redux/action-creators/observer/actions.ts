/* Action Types */
export const OBSERVER_ERROR = 'OBSERVER_ERROR'

/* Actions */
export const observerError = (value: Error) => ({
  type: OBSERVER_ERROR,
  payload: value,
})

