import IPFS from '../initializers/ipfs'
import { Map } from '../interfaces'

const IPFSWrite = async (data: Map|string): Promise<string> => {
  const buffer = Buffer.from(JSON.stringify(data))
  const ipfsBlock = await IPFS.block.put(buffer)
  const cid = ipfsBlock.cid.toBaseEncodedString()

  return cid
}

const IPFSRead = async (cid: string): Promise<Map|string> => {
  const block = await IPFS.block.get(cid)
  const dataString = block.data.toString()
  const data = JSON.parse(dataString)

  return data
}

export { IPFSWrite, IPFSRead }

