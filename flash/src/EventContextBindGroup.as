package {

class EventContextBindGroup {
	private var _contexts:Array = [];

	function EventContextBindGroup(...contexts):void {
		_contexts = contexts;
	}
	function merge(g:EventContextBindGroup):void {
		g.forEachContext(addContext);
	}
	function unbind():void {
		forEachContext(unbindContext);
	}
	function commit():void {
		forEachContext(setThisGroup);
	}
	function addContext(ctx:EventContext):void {
		if (_contexts.indexOf(ctx) == -1) {
			_contexts.push(ctx);
		}
	}

	private function forEachContext(f:Function):void {
		for each(var ctx:EventContext in _contexts) {
			f(ctx);
		}
	}
	private function unbindContext(ctx:EventContext):void {
		ctx.group = null;
		ctx.unbind();
	}
	private function setThisGroup(ctx:EventContext):void {
		ctx.group = this;
	}

}
}
