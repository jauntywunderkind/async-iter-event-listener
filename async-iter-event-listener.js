"use module"
import Pipe from "async-iter-pipe"

export function AsyncIterEventTarget( eventTarget, opts){
	if( name=== undefined&& opts=== undefined){
		opts= eventTarget
		eventTarget= opts.eventTarget
		name= opts.name
	}
	Pipe.call( this, opts)

	// find event name to listen to
	if( !this.eventName){
		this.eventName= opts&& opts.eventName|| "data"
	}
	// start listening
	if( eventTarget.addEventListener){
		const listenOpts= {
			passive: opts&& opts.passive!== undefined? opts.passive: true,
			capture: opts&& opts.capture|| false
		}
		// call push with data
		eventTarget.addEventListener( this.eventName, this.push, listenOpts)
	}else if( eventTarget.on){
		// alternative for node
		eventTarget.on( this.eventName, this.push)
	}else{
		throw new Error( "No EventTarget found")
	}
	return this
}
export {
	AsyncIterEventTarget as default
}
AsyncIterEventTarget.prototype= Object.create( Pipe.prototype)
AsyncIterEventTarget.prototype.constructor= AsyncIterEventTarget
