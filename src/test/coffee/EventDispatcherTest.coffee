assertTrue = (msg, statement) ->
  if (!statement)
    alert(msg)
assertFalse = (msg, statement) -> assertTrue(msg, !statement)

testHasListeners: ->
  listener = (e) ->
  dispatcher1 = new EventDispatcher()
  dispatcher2 = new EventDispatcher()
  dispatcher1.addEventListener "test", listener
  assertTrue "Listener isn't set", dispatcher1.hasEventListener "test"
  assertFalse "Listener set on another object", dispatcher2.hasEventListener "test"
  dispatcher1.removeEventListener "test",listener
  assertFalse "Listner isn't removed", dispatcher1.hasEventListener "test"
testListenerHandle: ->
  fired = false
  listener = (e) -> fired = true
  dispatcher1 = new EventDispatcher()
  dispatcher2 = new EventDispatcher()
  dispatcher1.addEventListener "test", listener
  dispatcher2.dispatchEvent type: "test"
  assertFalse "Fired on another dispatcher", fired
  dispatcher1.dispatchEvent type: "test"
  assertTrue "Fire event doesn't work", fired

if runTests
  testHasListeners()
  testListenerHandle()
