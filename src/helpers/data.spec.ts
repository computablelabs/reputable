// Dependencies
import sinon from 'ts-sinon'
import { ApplicantData } from '../interfaces'
import { DataSources } from '../constants'
import * as IPFS from './ipfs'
import * as encryption from './encryption'

// Functions under test
import { encodeData, decodeData } from './data'

describe('helpers/data', () => {
  let encryptSpy: any
  let encryptStub: any

  let decryptSpy: any
  let decryptStub: any

  let writeStub: any

  beforeAll(() => {
    encryptSpy = sinon.spy((param: any) => param)
    encryptStub = sinon.stub(encryption, 'encrypt').callsFake(encryptSpy)

    decryptSpy = sinon.spy((param: any) => param)
    decryptStub = sinon.stub(encryption, 'decrypt').callsFake(decryptSpy)

    writeStub = sinon.stub(IPFS, 'IPFSWrite').returns('cid')
  })

  afterAll(() => {
    encryptStub.restore()
    decryptStub.restore()

    writeStub.restore()
  })

  afterEach(() => {
    encryptSpy.resetHistory()
    decryptSpy.resetHistory()
  })

  describe('#encodeData', () => {
    describe('on-chain data', () => {
      it('is properly encoded', async () => {
        const data: ApplicantData = {
          value: 'foo data',
        }

        const encodedData: string = await encodeData(data)
        const parsedData = JSON.parse(encodedData)

        expect(encryptSpy.callCount).toEqual(1)
        expect(encryptSpy.args[0]).toEqual([data.value])
        expect(parsedData.value).toEqual(data.value)
      })
    })

    describe('IPFS data', () => {
      it('is properly encoded', async () => {
        const data: ApplicantData = {
          source: DataSources.IPFS,
          value: 'foo data',
        }

        const encodedData: string = await encodeData(data)
        const parsedData = JSON.parse(encodedData)

        expect(encryptSpy.callCount).toEqual(1)
        expect(encryptSpy.args[0]).toEqual([data.value])
        expect(parsedData.value).toEqual('cid')
      })
    })
  })

  describe('#decodeData', () => {
    describe('on-chain data', () => {
      const data = {
        value: 'foo data',
      }
      let encodedData: string

      beforeEach(async () => {
        encodedData = await encodeData(data)
      })

      it('is properly decoded', async () => {
        const decodedData: ApplicantData = await decodeData(encodedData)

        expect(decryptSpy.callCount).toEqual(1)
        expect(decodedData).toEqual(data)
      })
    })

    describe('IPFS data', () => {
      let readStub: any

      const data: ApplicantData = {
        source: DataSources.IPFS,
        value: 'foo data',
      }
      let encodedData: string

      beforeAll(() => {
        readStub = sinon.stub(IPFS, 'IPFSRead').returns(data.value)
      })

      afterAll(() => {
        readStub.restore()
      })

      beforeEach(async () => {
        encodedData = await encodeData(data)
      })

      it('is properly decoded', async () => {
        const decodedData: ApplicantData = await decodeData(encodedData)

        expect(decryptSpy.callCount).toEqual(1)
        expect(decryptSpy.args[0]).toEqual([data.value])
        expect(decodedData).toEqual(data)
      })
    })

  })
})

