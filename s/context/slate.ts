import {Pojo, Slate, ZipAction, watch} from "@benev/slate"
import {slate, Context, PanelSpec} from "@benev/construct/x/mini.js"

import {OmniState} from "../types.js"
import {Media} from "./controllers/media/controller.js"
import {Timeline} from "./controllers/timeline/controller.js"
import {timeline_state} from "./controllers/timeline/state.js"
import {Compositor} from "./controllers/compositor/controller.js"
import {timeline_actions} from "./controllers/timeline/actions.js"
import {VideoExport} from "./controllers/video-export/controller.js"
import {StockLayouts} from "@benev/construct/x/context/controllers/layout/parts/utils/stock_layouts.js"

export interface MiniContextOptions {
	panels: Pojo<PanelSpec>,
	layouts: StockLayouts
}

export class OmniContext extends Context {
	#state =  watch.stateTree<OmniState>({
		timeline: timeline_state
	})
	
	database: IDBDatabase | null = null
	request = window.indexedDB.open("database", 3)

	get state() {
		return this.#state.state
	}

	actions = ZipAction.actualize(this.#state, {
		timeline_actions
	})

	controllers = {
		timeline: new Timeline(this.actions.timeline_actions),
		compositor: new Compositor(this.actions.timeline_actions),
		video_export: new VideoExport(this.actions.timeline_actions),
		media: new Media()
	}

	constructor(options: MiniContextOptions) {
		super(options)
		if(this.database) {
			this.database.onerror = (event) => {
				console.error("Why didn't you allow my web app to use IndexedDB?!")
			}
		}
		this.request.onsuccess = (event) => {
			console.log("success")
			this.database = (event.target as IDBRequest).result
		}
		this.request.onupgradeneeded = (event) => {
			this.database = (event.target as IDBRequest).result
			const objectStore = this.database?.createObjectStore("files", {keyPath: "hash"})
			objectStore!.createIndex("file", "file", { unique: true })
			objectStore!.transaction.oncomplete = (event) => {
				console.log("complete")
			}
		}
	}
}
export const omnislate = slate as Slate<OmniContext>
export const {shadow_component, shadow_view, light_view} = omnislate
