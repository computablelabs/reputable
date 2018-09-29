// Local Dependencies
import { Map, EventLog } from '../../../interfaces'
import store from '../../store'
import * as tokenActions from '../../action-creators/token'
import {
  approvalEventResponder,
  transferEventResponder,
} from './token'

describe('contract observer', () => {
  describe('token responders', () => {
    describe('Approval event responder', async () => {
      beforeAll(async function(this: Map) {
        // @ts-ignore:2239
        spyOn(tokenActions, 'tokenApproveOk').and.returnValue({ type: 'mock type' })

        this.returnValues = {
          spender: 'spender address',
          owner:   'owner address',
          value:   100,
        }

        this.responder = approvalEventResponder(store.dispatch, store.getState)
      })

      afterEach(() => {
        // @ts-ignore:2339
        tokenActions.tokenApproveOk.calls.reset()
      })

      it('dispatches the appropriate actions', async function(this: Map) {
        await this.responder({ returnValues: this.returnValues } as EventLog)

        // @ts-ignore:2239
        expect(tokenActions.tokenApproveOk.calls.count()).toEqual(1)

        // @ts-ignore:2239
        const args = tokenActions.tokenApproveOk.calls.first().args[0]
        expect(args.address).toEqual(this.returnValues.spender)
        expect(args.from).toEqual(this.returnValues.owner)
        expect(args.amount).toEqual(this.returnValues.value)
      })
    })

    describe('Transfer event responder', async () => {
      beforeAll(async function(this: Map) {
        // @ts-ignore:2239
        spyOn(tokenActions, 'tokenTransferOk').and.returnValue({ type: 'mock type' })

        this.returnValues = {
          from:  'from address',
          to:    'to address',
        value: 100,
        }

        this.responder = transferEventResponder(store.dispatch, store.getState)
      })

      afterEach(() => {
        // @ts-ignore:2339
        tokenActions.tokenTransferOk.calls.reset()
      })

      it('dispatches the appropriate actions', async function(this: Map) {
        await this.responder({ returnValues: this.returnValues } as EventLog)

        // @ts-ignore:2239
        expect(tokenActions.tokenTransferOk.calls.count()).toEqual(1)

        // @ts-ignore:2239
        const args = tokenActions.tokenTransferOk.calls.first().args[0]
        expect(args.from).toEqual(this.returnValues.from)
        expect(args.to).toEqual(this.returnValues.to)
        expect(args.amount).toEqual(this.returnValues.value)
      })
    })
  })
})

