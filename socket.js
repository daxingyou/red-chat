/**
 * WebSocket客户端
 *
 * @author xxxxx
 * @date 2019-04-21
 */

import packetCode from './PacketCodeC'
import store from './store'

let client
let eventDispatcher

const EventDispatcher = function () {
  this.listeners = {}
}

const socket = {
	
  close: function () {
    if (client !== undefined && client.readyState === WebSocket.OPEN) {
      client.close()
    }
  },
  
  open: function () {
	  
    eventDispatcher = new EventDispatcher()

    client = new WebSocket('ws://127.0.0.1:9999/chat')

    client.binaryType = 'arraybuffer'

    client.onmessage = function (event) {
      let packet = packetCode.decode(event.data)
      eventDispatcher.dispatchEvent(packet.command, toJSON(packet))
      eventDispatcher.removeListener(packet.command, toJSON(packet))
    }

    client.onopen = function (event) {
    }

    client.onclose = function (event) {
    }

    client.onerror = function (event) {
    }
  },
  
  heart: (func) => {
    let packet = {
      version: 1,
      command: 17
    }
    send(packet)
    eventDispatcher.addListener('18', func)
  },

  send2room: (req, func) => {
	req.version=1,
	req.command=15
    send(req)
	console.log(req)
    eventDispatcher.addListener('16', func)
  }
}

function toJSON(packet) {
  return JSON.parse(JSON.stringify(packet))
}

EventDispatcher.prototype.addListener = function (eventKey, fun, context) {
  let list = []
  this.listeners[eventKey] = list
  let listener = {
    func: fun,
    context: context
  }
  list.push(listener)
  return listener
}

EventDispatcher.prototype.removeListener = function (eventKey, fun, context) {
  let list = this.listeners[eventKey]
  if (list !== undefined) {
    let size = list.length
    for (let i = 0; i < size; i++) {
      let listener = list[i]
      if (listener.func === fun && listener.context === context) {
        list.splice(i, 1)
        return
      }
    }
  }
}

EventDispatcher.prototype.dispatchEvent = function (eventKey, event) {
  let list = this.listeners[eventKey]
  if (list !== undefined) {
    let size = list.length
    for (let i = 0; i < size; i++) {
      let listener = list[i]
      let fun = listener.func
      let context = listener.context
      if (context != null) {
        fun.call(context, event)
      } else {
        fun(event)
      }
    }
  }
}

let send = (packet) => {
    packet.token = store.state.token
    if (!window.WebSocket) {
      alert('当前浏览器不支持WebSocket')
      return
    }
    if (client.readyState === WebSocket.OPEN) {
      client.send(packetCode.encode(packet))
    } else {
      socket.open()
    }
}

export default socket
