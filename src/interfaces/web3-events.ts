import {
  EventEmitter as Web3EventEmitter,
  EventLog,
} from 'web3/types'

interface EventEmitter extends Web3EventEmitter {
  unsubscribe: Function
}

export {
  EventEmitter,
  EventLog,
}

