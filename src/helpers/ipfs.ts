import IPFS from '../initializers/ipfs'
import { Map } from '../interfaces'
import { encrypt, decrypt } from './encryption'

const IPFSWrite = async (data: Map|string): Promise<string> => {
  const dataString: string = JSON.stringify(data)
  const dataEncrypted: string = await encrypt(dataString)
  const buffer: Buffer = Buffer.from(dataEncrypted)
  const ipfsBlock: Map = await IPFS.block.put(buffer)
  const cid: string = ipfsBlock.cid.toBaseEncodedString()

  return cid
}

const IPFSRead = async (cid: string): Promise<Map|string> => {
  const block: Map = await IPFS.block.get(cid)
  const dataString: string = block.data.toString()
  const dataDecrypted: string = await decrypt(dataString)
  const data: Map = JSON.parse(dataDecrypted)

  return data
}

export { IPFSWrite, IPFSRead }

