import * as ganache from 'ganache-cli'
import store from '../../src/redux/store'
import { participate, resetParticipants } from '../../src/redux/dispatchers/participant'
import { setWebsocketAddress, resetWebsocketAddress } from '../../src/redux/dispatchers/web3'
import { maybeParseInt } from 'computable/dist/helpers'
import {
  deployToken,
  resetToken,
  approve,
  transfer,
} from '../../src/redux/dispatchers/token'
import { State } from '../../src/interfaces'
import { address } from '../../src/redux/selectors/token'
import { getApprovals, getTransfers } from '../../src/redux/selectors'
import { getWeb3, getTokenContract } from '../../src/helpers'

describe('token state', () => {
  const port: number = 8544
  const websocketAddress: string = `ws://localhost:${port}`

  let server: any
  let accounts: string[]

  beforeAll(async () => {
    server = ganache.server({ ws:true })
    server.listen(port)

    setWebsocketAddress(websocketAddress)
    const web3 = await getWeb3(websocketAddress, { force: true })
    accounts = await web3.eth.getAccounts()

    participate('Mr. Admin Pants', accounts[0])
  })

  afterAll(() => {
    server.close()
    // tear it all down as the store is a singleton
    resetParticipants()
    resetWebsocketAddress()
    resetToken()
  })

  it('begins with unhydrated token', () => {
    expect(address(store.getState())).toBeFalsy()
  })

  describe('deployment', () => {
    it('can deploy a token, placing the address in the state tree', async () => {
        // redux will call this on stae changes, token as arg because of the use of the selector above
        // const deployListener = (token:Token) => { console.log(token) },
        // unsubscribe:any = subscriber(deployListener, token)

      // we could ref the returned address but we are more interested in the state tree as a user will be
      // using subscriptions to react on store changes...
      await deployToken(accounts[0], 1000000)
      const addr = address(store.getState())

      expect(addr).toBeTruthy()
      // hashed addresses are always 42 chars
      expect(addr && addr.length).toBe(42)
    })

    // TODO this test is not idempotent
    //   It relies on the token contract deployment in the previous test
    it('has assigned the initial funds to the admin address', async () => {
      const state: State = store.getState()
      const contract = await getTokenContract(state)
      const funds = contract && await contract.balanceOf(accounts[0]) || 0

      expect(maybeParseInt(funds)).toBe(1000000)
    })
  })

  describe('with a deployed token', () => {
    beforeAll(async () => {
      await deployToken(accounts[0], 1000000)
    })

    afterAll(() => {
      resetToken()
    })

    describe('approvals', () => {
      it('lets admin approve other contract to spend', async () => {
        const owner = accounts[0]
        const spender = accounts[1]
        const amount = 500 * 1000

        let state: State = store.getState()
        let approvals = getApprovals(state)

        expect(approvals && approvals.length).toBe(0)

        // observe the state tree in action with these
          // approvalListener = (approvals:Approval[]) => { console.log(approvals) },
          // unsubscribe:any = subscriber(approvalListener, approvals)

        // we'll just use the 2nd account address in lieu of another deployed contract.
        // @ts-ignore:2532
        const txValues = await approve(spender, amount, owner)

        expect(txValues).toBeTruthy()

        state = store.getState()
        approvals = getApprovals(state)

        expect(approvals && approvals.length).toBe(1)
        expect(txValues.owner).toBe(owner)
        expect(txValues.spender).toBe(spender)
        expect(txValues.value).toBe(amount.toString())
      })
    })

    describe('transfers', () => {
      it('fund another account from the tokens funds', async () => {
        const owner = accounts[0]
        const user = accounts[2]
        const amount = 500 * 1000

        let state: State = store.getState()
        let trans = getTransfers(state)

        expect(trans && trans.length).toBe(0)

        // observe the state tree in action with these
          // transferListener = (transfers:Transfer[]) => { console.log(transfers) },
          // unsubscribe:any = subscriber(transferListener, transfers)

        // we'll just use the 3rd account address in lieu of another deployed contract.
        // @ts-ignore:2532
        const txValues = await transfer(user, amount, owner) // to, amount, from
        expect(txValues).toBeTruthy()

        state = store.getState()
        trans = getTransfers(state)

        expect(trans && trans.length).toBe(1)
      })

      // TODO (geoff) This test is not idempotent...
      //   It relies on the state configured in the spec above.
      it('actually transferred the funds to the other account', async () => {
        const state: State = store.getState()
        const contract = await getTokenContract(state)

        const funds2 = contract && await contract.balanceOf(accounts[2]) || 0
        expect(maybeParseInt(funds2)).toBe(500000)

        // account 0 has been subtracted from...
        const funds0 = contract && await contract.balanceOf(accounts[0]) || 0
        expect(maybeParseInt(funds0)).toBe(500000)
      })
    })
  })
})

