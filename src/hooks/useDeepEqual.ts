import { useRef } from 'react'

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object'
}

function deepEqual(a: any, b: any): boolean {
  if (a === b) return true
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false
    }
    return true
  }
  if (isObject(a) && isObject(b)) {
    const aKeys = Object.keys(a)
    const bKeys = Object.keys(b)
    if (aKeys.length !== bKeys.length) return false
    for (const key of aKeys) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) return false
      if (!deepEqual((a as any)[key], (b as any)[key])) return false
    }
    return true
  }
  return false
}

export function useDeepEqual<S, U>(selector: (state: S) => U): (state: S) => U {
  const prev = useRef<U | undefined>(undefined)
  return (state: S) => {
    const next = selector(state)
    if (prev.current !== undefined && deepEqual(prev.current, next)) {
      return prev.current as U
    }
    prev.current = next
    return next
  }
}


