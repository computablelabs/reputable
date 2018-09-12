import { Map, ApplicantData } from '../interfaces'
import { DataSources } from '../constants'
import { IPFSWrite, IPFSRead } from '../helpers/ipfs'
import { encrypt, decrypt } from '../helpers/encryption'

const encodeData = async (applicantData: ApplicantData): Promise<string> => {
  let value: string = await encrypt(applicantData.value)

  if (applicantData.source === DataSources.IPFS) {
    const cid: string = await IPFSWrite(value)
    value = cid
  }

  const encodedData = {
    ...applicantData,
    value,
  }

  return JSON.stringify(encodedData)
}

const decodeData = async (data: string): Promise<ApplicantData> => {
  const parsedData: ApplicantData = JSON.parse(data)
  let value: Map|string

  if (parsedData.source === DataSources.IPFS) {
    const ipfsData: string = await IPFSRead(parsedData.value as string)
    value = ipfsData
  } else {
    value = parsedData.value
  }

  const decryptedValue = await decrypt(value as string)

  const decodedData = {
    ...parsedData,
    value: decryptedValue,
  }

  return decodedData
}

export { encodeData, decodeData }

