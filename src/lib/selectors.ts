// Dependencies
import { createSelector } from 'reselect'

// Type definitions
interface Collection<T> {
  [key: string]: T
}

// Selectors
export const sortMapBy = <T>(key: keyof T) =>
  createSelector(
    (state: Collection<T>) => state,
    map =>
      Object.keys(map)
        .map(key => map[key])
        .sort((a, b) => {
          if (a[key] < b[key]) return -1
          if (a[key] > b[key]) return 1

          return 0
        })
  )
