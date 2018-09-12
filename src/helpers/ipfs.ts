import IPFS from '../initializers/ipfs'
import { Map } from '../interfaces'

const IPFSWrite = async (data: string): Promise<string> => {
  const buffer: Buffer = Buffer.from(data as string)
  const ipfsBlock: Map = await IPFS.block.put(buffer)
  const cid: string = ipfsBlock.cid.toBaseEncodedString()

  return cid
}

const IPFSRead = async (cid: string): Promise<string> => {
  const block: Map = await IPFS.block.get(cid)
  const data: string = block.data.toString()

  return data
}

export { IPFSWrite, IPFSRead }

