import * as ganache from 'ganache-cli'
import store from '../../src/redux/store'
import { participate, resetParticipants } from '../../src/redux/dispatchers/participant'
import { setWebsocketAddress, resetWebsocketAddress } from '../../src/redux/dispatchers/web3'
import { deployToken, resetToken } from '../../src/redux/dispatchers/token'
import { deployVoting, resetVoting } from '../../src/redux/dispatchers/voting'
import { deployParameterizer, resetParameterizer } from '../../src/redux/dispatchers/parameterizer'
import { deployDll, resetDll } from '../../src/redux/dispatchers/dll'
import { deployAttributeStore, resetAttributeStore } from '../../src/redux/dispatchers/attribute-store'
import { address as parameterizerAddress } from '../../src/redux/selectors/parameterizer'
import { getWeb3 } from '../../src/helpers'

describe('parameterizer state', () => {
  const port: number = 8559
  const websocketAddress: string = `ws://localhost:${port}`

  let server:any
  let accounts:string[]

  beforeAll(async () => {
    server = ganache.server({ ws:true })
    server.listen(port)

    setWebsocketAddress(websocketAddress)
    const web3 = await getWeb3(websocketAddress, { force: true })
    accounts = await web3.eth.getAccounts()

    await participate('team admin', accounts[0])

    // p11r will want a token deployed
    await deployToken()
    // voting deploy demands that dll and attrStore be deployed
    await deployDll(accounts[0])
    await deployAttributeStore(accounts[0])
    await deployVoting(accounts[0])
  })

  afterAll(() => {
    server.close()
    // tear it all down as the store is a singleton
    resetParticipants()
    resetWebsocketAddress()
    resetToken()
    resetDll()
    resetAttributeStore()
    resetVoting()
    resetParameterizer()
  })

  it('begins with unhydrated parameterizer', () => {
    expect(parameterizerAddress(store.getState())).toBeFalsy()
  })

  describe('deployment', () => {
    it('deploys the parameterizer contract, placing address in the state tree', async () => {
      // that the actual ws->redux events are working...
      // const deployListener = (p11r:Parameterizer) => { console.log(p11r) },
        // unsub:any = subscriber(deployListener, parameterizer)

      await deployParameterizer(accounts[0])

      const state = store.getState()
      const addr = parameterizerAddress(state)

      expect(addr).toBeTruthy()
      // hashed addresses are always 42 chars
      expect(addr && addr.length).toBe(42)
    })
  })
})

