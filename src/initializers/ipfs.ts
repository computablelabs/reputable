import IPFS from 'ipfs-api'

const config: any = {
  ipfs: {
    domain: 'localhost',
    port: '5001',
    protocol: 'http',
  },
}

const ipfs = IPFS(config.ipfs.domain, config.ipfs.port, {
  protocol: config.ipfs.protocol,
})

export default ipfs

