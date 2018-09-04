import crypto from 'crypto'

import { Map } from '../interfaces'

const ENCRYPTION_KEY: string = '12345678901234567890123456789012'
const IV_LENGTH: number = 16
const ENCRYPTION_TYPE = 'aes-256-cbc'

const encrypt = async (value: string): Promise<string> => {
  const iv: Buffer = crypto.randomBytes(IV_LENGTH)
  const encryptionKey: Buffer = new Buffer(ENCRYPTION_KEY)
  const cipher: Map = crypto.createCipheriv(ENCRYPTION_TYPE, encryptionKey, iv)
  const encrypted: string = cipher.update(value)
  const encryptedBuffer: Buffer = Buffer.concat([encrypted, cipher.final()])

  return `${iv.toString('hex')}:${encryptedBuffer.toString('hex')}`
}

const decrypt = async (value: string): Promise<string> => {
  const valueTokens: string[] = value.split(':')
  let iv: Buffer = new Buffer(valueTokens.shift() || '', 'hex')
  let encryptedText = new Buffer(valueTokens.join(':'), 'hex')
  const encryptionKey: Buffer = new Buffer(ENCRYPTION_KEY)
  let decipher = crypto.createDecipheriv(ENCRYPTION_TYPE, encryptionKey, iv)
  let decrypted = decipher.update(encryptedText)

  decrypted = Buffer.concat([decrypted, decipher.final()])

  return decrypted.toString()
}

export { encrypt, decrypt }

