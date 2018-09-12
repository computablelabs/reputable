import { Map } from '../interfaces'
import { encrypt, decrypt } from './encryption'

describe('helpers/encryption', () => {
  describe('#encrypt', () => {
    it('encrypts string data', async () => {
      const data: string = JSON.stringify('string data')

      const encryptedData: string = await encrypt(data)
      const tokens: string[] = encryptedData.split(':')

      expect(encryptedData).toBeTruthy()
      expect(tokens.length).toBe(2)
      expect(tokens[0].length).toBe(32)
      expect(tokens[1].length).toBe(64)
    })

    it('encrypts map data', async () => {
      const data: Map = { value: 'map data' }

      const encryptedData: string = await encrypt(data)
      const tokens: string[] = encryptedData.split(':')

      expect(encryptedData).toBeTruthy()
      expect(tokens.length).toBe(2)
      expect(tokens[0].length).toBe(32)
      expect(tokens[1].length).toBe(64)
    })
  })

  describe('#decrypt', () => {
    const stringData: string = 'string data'
    let encryptedStringData: string

    const mapData: Map = { value: 'map data' }
    let encryptedMapData: string

    beforeEach(async () => {
      encryptedStringData = await encrypt(stringData)
      encryptedMapData = await encrypt(mapData)
    })

    it('decrypts encrypted string data', async () => {
      const data: string = await decrypt(encryptedStringData) as string

      expect(data).toEqual(stringData)
    })

    it ('decrypts encrypted map data', async () => {
      const data: Map = await decrypt(encryptedMapData) as Map

      expect(data).toEqual(mapData)
    })
  })
})

