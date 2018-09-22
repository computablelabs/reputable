// Dependencies
import * as ganache from 'ganache-cli'

// Local Dependencies
import { getWeb3 } from '../../src/initializers'
import { setWebsocketAddress, resetWebsocketAddress } from '../../src/redux/action-creators/web3'
import { deployAttributeStore, resetAttributeStore } from '../../src/redux/action-creators/attribute-store'
import { deployDll, resetDll } from '../../src/redux/action-creators/dll'
import { deployRegistry, resetRegistry } from '../../src/redux/action-creators/registry'
import { deployParameterizer, resetParameterizer } from '../../src/redux/action-creators/parameterizer'
import { addParticipant, resetParticipants } from '../../src/redux/action-creators/participants'
import { deployToken, resetToken } from '../../src/redux/action-creators/token'
import { deployVoting, resetVoting } from '../../src/redux/action-creators/voting'

const APPLY_STAGE_LENGTH = 60

const deployContracts = async (store: any) => {
  const port: number = Math.floor(Math.random() * 1000) + 8000
  const websocketAddress: string = `ws://localhost:${port}`

  const server: any = ganache.server({ ws:true })
  server.listen(port)

  await store.dispatch(setWebsocketAddress(websocketAddress))

  const web3 = await getWeb3(websocketAddress, { force: true })
  const accounts: string[] = await web3.eth.getAccounts()

  await store.dispatch(
    addParticipant('Captain Admin', accounts[0])
  )

  await store.dispatch(
    addParticipant('Generic User 01', accounts[1])
  )

  await store.dispatch(
    addParticipant('Generic User 02', accounts[2])
  )

  await store.dispatch(deployToken())
  await store.dispatch(deployDll())
  await store.dispatch(deployAttributeStore())
  await store.dispatch(deployVoting())
  await store.dispatch(deployParameterizer({ applyStageLen: APPLY_STAGE_LENGTH }))
  await store.dispatch(deployRegistry('the registry'))

  return server
}

const resetContracts = async (store: any, server: any) => {
  server.close()

  await store.dispatch(resetWebsocketAddress())
  await store.dispatch(resetToken())
  await store.dispatch(resetDll())
  await store.dispatch(resetAttributeStore())
  await store.dispatch(resetVoting())
  await store.dispatch(resetParameterizer())
  await store.dispatch(resetRegistry())
  await store.dispatch(resetParticipants())
}

export { deployContracts, resetContracts }

