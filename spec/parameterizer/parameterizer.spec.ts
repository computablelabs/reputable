import * as ganache from 'ganache-cli'
import store from '../../src/redux/store'
import { State } from '../../src/interfaces'
import { setWebsocketAddress, resetWebsocketAddress } from '../../src/redux/action-creators/web3'
import { addParticipant, resetParticipants } from '../../src/redux/action-creators/participants'
import { deployToken, resetToken } from '../../src/redux/action-creators/token'
import { deployVoting, resetVoting } from '../../src/redux/action-creators/voting'
import { deployAttributeStore, resetAttributeStore } from '../../src/redux/action-creators/attribute-store'
import { deployDll, resetDll } from '../../src/redux/action-creators/dll'
import { deployParameterizer, resetParameterizer } from '../../src/redux/action-creators/parameterizer'
import { getWeb3 } from '../../src/initializers'
import { getParameterizerAddress } from '../../src/redux/selectors'

describe('parameterizer state', () => {
  const port: number = 8559
  const websocketAddress: string = `ws://localhost:${port}`

  let server:any
  let accounts:string[]
  let owner: string

  beforeAll(async () => {
    server = ganache.server({ ws:true })
    server.listen(port)

    store.dispatch(setWebsocketAddress(websocketAddress))
    const web3 = await getWeb3(websocketAddress, { force: true })
    accounts = await web3.eth.getAccounts()
    owner = accounts[0]

    await store.dispatch(addParticipant('team admin', owner))

    // p11r will want a token deployed
    await store.dispatch(deployToken())
    // voting deploy demands that dll and attrStore be deployed
    await store.dispatch(deployDll())
    await store.dispatch(deployAttributeStore())
    await store.dispatch(deployVoting())
  })

  afterAll(async () => {
    server.close()
    // tear it all down as the store is a singleton
    await store.dispatch(resetParticipants())
    await store.dispatch(resetWebsocketAddress())
    await store.dispatch(resetToken())
    await store.dispatch(resetDll())
    await store.dispatch(resetAttributeStore())
    await store.dispatch(resetVoting())
    await store.dispatch(resetParameterizer())
  })

  it('begins with unhydrated parameterizer', () => {
    const state: State = store.getState()
    const address: string = getParameterizerAddress(state)

    expect(address).toBeFalsy()
  })

  describe('deployment', () => {
    it('deploys the parameterizer contract, placing address in the state tree', async () => {
      // that the actual ws->redux events are working...
      // const deployListener = (p11r:Parameterizer) => { console.log(p11r) },
        // unsub:any = subscriber(deployListener, parameterizer)

      await store.dispatch(deployParameterizer())

      const state: State = store.getState()
      const address: string = getParameterizerAddress(state)

      expect(address).toBeTruthy()
      // hashed addresses are always 42 chars
      expect(address && address.length).toBe(42)
    })
  })
})

