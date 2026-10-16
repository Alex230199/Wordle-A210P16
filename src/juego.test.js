import { describe, expect, it } from 'vitest'
import { estadoDe } from './juego.js'

describe('estadoDe', () => {
  it('marca como grises las letras extra cuando hay más repeticiones que en la solución', () => {
    expect(estadoDe(['R', 'R', 'R', 'R', 'R'], 'PERRO')).toEqual([
      'ausente',
      'ausente',
      'correcta',
      'correcta',
      'ausente',
    ])
  })

  it('mantiene la cuenta correcta con letras repetidas', () => {
    expect(estadoDe(['A', 'A', 'A', 'A', 'A'], 'NARAN')).toEqual([
      'ausente',
      'correcta',
      'ausente',
      'ausente',
      'presente',
    ])
  })
})
