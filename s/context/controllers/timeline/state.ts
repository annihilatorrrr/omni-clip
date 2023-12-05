import {generate_id} from "@benev/slate/x/tools/generate_id.js"

import {Timeline} from "./types.js"

export const timeline_state: Timeline = {
	timecode: {
		hours: 0,
		minutes: 0,
		seconds: 0,
		milliseconds: 0
	},
	length: 1000,
	zoom: -3,
	tracks: [
		{id: generate_id()},
		{id: generate_id()},
		{id: generate_id()},
		{id: generate_id()},
	],
	clips: [
		{id: generate_id(), item: {type: "Audio", source: ""},
			start: 1000, end: 7000, track: 0, start_at_position: 5000, duration: 6000
		},
		{id: generate_id(),item: {type: "Audio", source: ""}, 
			start: 7000, end: 15000, track: 0, start_at_position: 12000, duration: 8000
		},
		{id: generate_id(),item: {type: "Text", content: "", color: "", size: 4},
			start: 7000, end: 12000, track: 1, start_at_position: 0, duration: 5000
		},
		{id: generate_id(),item: {type: "Video", source: ""},
			start: 0, end: 6000, track: 1, start_at_position: 5000, duration: 6000
		},
		{id: generate_id(),item: {type: "Image", source: ""},
			start: 20000, end: 30000, track: 2, start_at_position: 20000, duration: 10000
		},
		{id: generate_id(),item: {type: "Video", source: ""},
			start: 40000, end: 45000, track: 2, start_at_position: 35000, duration: 5000
		}
	]
}
