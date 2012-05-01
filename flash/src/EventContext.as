package {

import flash.events.Event;
import flash.events.IEventDispatcher;

/**
 * Helper class which holds references to all necessary objects to be
 * able clear event listening with no need to remember
 * event dispatcher, event type, event handler and useCapture flag.
 * They are remembered in the context.
 */
public class EventContext {
	private var _dispatcher:IEventDispatcher;
	private var _eventType:String;
	private var _eventHandler:Function;
	private var _useCapture:Boolean;
	private var _singleEvent:Boolean;
	private var _group:EventContextBindGroup;

	/**
	 * Creates an event context for given arguments
	 * @param dispatcher the event dispatcher to listen to
	 * @param eventType the event type to listen to
	 * @param eventHandler handler function (note that the event argument is optional)
	 * @param useCapture set to true if you need a capture phase
	 * @param priority priority of event handler
	 * @param useWeakReference set to true to use weak reference
	 * @param singleEvent handle only first occured event, then unbind
	 * @return
	 */
	public static function bind(dispatcher:IEventDispatcher, eventType:String, eventHandler:Function,
	                            useCapture:Boolean = false, priority:int = 0, useWeakReference:Boolean = false,
	                            singleEvent:Boolean = false):EventContext {
		var ctx:EventContext = new EventContext;

		ctx._dispatcher = dispatcher;
		ctx._eventType = eventType;
		ctx._eventHandler = eventHandler;
		ctx._useCapture = useCapture;
		ctx._singleEvent = singleEvent;

		dispatcher.addEventListener(eventType, ctx.internalHandler,
				useCapture, priority, useWeakReference);

		return ctx;
	}

	/**
	 * Creates an event context for given arguments, and singleEvent = true
	 * @param dispatcher the event dispatcher to listen to
	 * @param eventType the event type to listen to
	 * @param eventHandler handler function (note that the event argument is optional)
	 * @param useCapture set to true if you need a capture phase
	 * @param priority priority of event handler
	 * @param useWeakReference set to true to use weak reference
	 * @return
	 */
	public static function bindOnce(dispatcher:IEventDispatcher, eventType:String, eventHandler:Function,
	                                useCapture:Boolean = false, priority:int = 0,
	                                useWeakReference:Boolean = false):EventContext {
		return bind(dispatcher, eventType, eventHandler, useCapture, priority, useWeakReference, true);
	}

	/**
	 * Remove event listener set up with bind
	 */
	public function unbind():void {
		if (_group) {
			_group.unbind();
		} else {
			_dispatcher.removeEventListener(
					_eventType, internalHandler, _useCapture);
		}
	}

	/**
	 * Link with another context to create common unbind group:
	 * When you will unbind single context the whole group will be unbind
	 * @param context another event context to link with if it is already a member of another
	 *                group groups will be joined
	 * @return this event context to possibly linking with another
	 */
	public function link(context:EventContext):EventContext {
		if (!_group) {
			_group = new EventContextBindGroup(this);
		}
		if (context._group) {
			_group.merge(context._group);
		} else {
			_group.addContext(context);
		}
		_group.commit();
		return this;
	}

	function set group(g:EventContextBindGroup):void {
		_group = g;
	}

	private function internalHandler(e:Event):void {
		// Try to call initial handler with event, and then with
		// no parameters. This makes event parameter in handler optional.
		if (_singleEvent) {
			unbind();
		}
		try {
			_eventHandler(e);
		}
		catch (e:ArgumentError) {
			_eventHandler();
		}
	}

}
}

