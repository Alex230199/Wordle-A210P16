import { describe, expect, it } from 'vitest'
import { estadoDe } from './juego.js'

describe('estadoDe', () => {
  it('marca una letra en su sitio como correcta', () => {
    expect(estadoDe(['P', 'A', 'A', 'A', 'A'], 0, 'PERRO')).toBe('correcta')
  })

  it('marca una letra en otra posicion como presente', () => {
    expect(estadoDe(['O', 'A', 'A', 'A', 'A'], 0, 'PERRO')).toBe('presente')
  })

  it('marca como ausente una letra que no esta en la solucion', () => {
    expect(estadoDe(['X', 'A', 'A', 'A', 'A'], 0, 'PERRO')).toBe('ausente')
  })

  it('marca como grises las letras extra cuando hay más repeticiones que en la solución', () => {
    const intento = ['R', 'R', 'R', 'R', 'R']
    const estados = intento.map((_, columna) => estadoDe(intento, columna, 'PERRO'))

    expect(estados).toEqual(['ausente', 'ausente', 'correcta', 'correcta', 'ausente'])
  })

  it('mantiene la cuenta correcta con letras repetidas', () => {
    const intento = ['A', 'A', 'A', 'A', 'A']
    const estados = intento.map((_, columna) => estadoDe(intento, columna, 'NARAN'))

    expect(estados).toEqual(['ausente', 'correcta', 'ausente', 'correcta', 'ausente'])
  })
})
