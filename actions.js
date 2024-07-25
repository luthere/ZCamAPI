const Choices = require('./choices')
module.exports = function (self) {

	self.setActionDefinitions({
		//////////////////////////////////////////////////////////////////
		//////////////////////////  GET ACTIONS  //////////////////////////
		//////////////////////////////////////////////////////////////////
		get_info: {
			// This gets the current information of the camera
			// This will set all the information to custom variables
			name: 'System: Get Camera Info',
			callback: async () => {
				console.log('Getting Info')
				console.log(`API send: ${self.baseUrl}/info`)
				const response = await fetch(`${self.baseUrl}/info`, { method: 'GET' })
				let resultData = await response.json()
				self.setVariableValues({ sn: resultData.sn, 
										sw: resultData.sw, 
										eth_ip: resultData.eth_ip, 
										cam_num: resultData.number,
										hw: resultData.hw,
										mac: resultData.mac,
										ble: resultData.ble,
										platform: resultData.platform,
										fmt: resultData.snapSupportFmt.fmt,})						
				console.log(`API response: ${JSON.stringify(resultData)}`)
				self.updateActions()
			},
		
		},
		
		get_iso: {
			// This gets the current ISO value of the camera
			// The camera has a set list of ISO values that it can be set to
			// This will return the current ISO value and set it to a custom variable iso
			// It will also return the available ISO values and set it to a custom variable iso_opts
			name: 'Video: Get ISO Value',
			callback: async () => {
				console.log('Getting ISO Value')
				console.log(`API send: ${self.baseUrl}/ctrl/get?k=iso`)
				const response = await fetch(`${self.baseUrl}/ctrl/get?k=iso`, { method: 'GET' })
				let resultData = await response.json()
				self.setVariableValues({ iso: resultData.value,
										iso_opts: resultData.opts
										})
				console.log(`API response: ${JSON.stringify(resultData)}`)
				self.updateActions()
			},
		},

		get_mode: {
			// This gets the current mode of the camera
			// The camera has 3 modes: Record, Playback, and Standby
			// This will set custom variable 'mode'
			name: 'System: Get Working Mode',
			callback: async () => {
				console.log('Getting Info')
				console.log(`API send: ${self.baseUrl}/ctrl/mode?action=query`)
				const response = await fetch(`${self.baseUrl}/ctrl/mode?action=query`, { method: 'GET' })
				let resultData = await response.json()
				self.setVariableValues({ mode: resultData.msg })				
				console.log(`API response: ${JSON.stringify(resultData)}`)
				self.updateActions()
			},		
		},
		
		///////////////////////////////////////////////////////////////////
		//////////////////////////  SET ACTIONS  //////////////////////////
		///////////////////////////////////////////////////////////////////

		set_iso: {
			// This sets the camera to a specific ISO value
			// The camera has a set list of ISO values that it can be set to
			// TODO: HOW TO GET THE LIST OF ISO VALUES into a dropdown list
			name: 'Video: Set ISO Value',
			options: [
				{
					id: 'iso',
					type: 'dropdown',
					label: 'ISO',
					default: '2500',
					choices: [
						{ id: 'Auto', label: 'Auto' },
						{id: '500' ,label: '500'},
						{id: '800' ,label: '800'},
						{id: '640' ,label: '640'},
						{id: '1000' ,label: '1000' },
						{id: '1250' ,label: '1250' },
						{id: '1600' ,label: '1600' },
						{id: '2000' ,label: '2000' },
						{id: '2500' ,label: '2500' },
						{id: '3200' ,label: '3200' },
						{id: '4000' ,label: '4000' },
						{id: '5000' ,label: '5000' },
						{id: '6400' ,label: '6400' },
						{id: '8000' ,label: '8000' },
						{id: '10000' ,label: '10000' },
						{id: '12800' ,label: '12800' },
						{id: '16000' ,label: '16000' },
						{id: '20000' ,label: '20000' },
						{id: '25600' ,label: '25600' },
						{id: '32000' ,label: '32000' },
						{id: '40000' ,label: '40000' },
						{id: '51200' ,label: '51200' },
					],
				},
			],
			callback: async (event) => {
				console.log(`API send: ${self.baseUrl}/ctrl/set?iso=${event.options.iso}`)
				const response = await fetch(`${self.baseUrl}/ctrl/set?iso=${event.options.iso}`, { method: 'GET' })
				let resultData = await response.json()
				console.log(`API response: ${JSON.stringify(resultData)}`)
			},
		},

		set_mode: {
			// This sets the camera to a specific mode
			// The camera has 3 modes: Record, Playback, and Standby
			// This will set the camera to the mode selected in the dropdown list
			name: 'System: Set Camera Mode',
			options: [
				{	
					type: 'dropdown',
					id: 'mode',
					label: 'Camera Mode',
					default: 'to_rec',
					choices: [
						{id: 'to_rec', label: 'Record'},
						{id: 'to_pb', label: 'Playback'},
						//{id: 'rec_tl', label: 'Record Timelapse'},
					],
					
				},
			],
			callback: async (event) => {
				//console.log('Hello world!', Choices.CAMERA_MODES)
				console.log(`API send: ${self.baseUrl}/ctrl/mode?action=${event.options.mode}`)
				const response = await fetch(`${self.baseUrl}/ctrl/mode?action=${event.options.mode}`, { method: 'GET' })
				let resultData = await response.json()
				console.log(`API response: ${JSON.stringify(resultData)}`)
			},
		
		},

		set_pb: {
			// When the Camera is in Playback mode, This allows you to start or stop the playback of clips
			name: 'Playback: Set Playback State',
			options: [
				{
					id: 'pb_state',
					type: 'dropdown',
					label: 'Playback State',
					default: 'start',
					choices: [
						{id: 'start', label: 'Start'},
						{id: 'stop', label: 'Stop'},
					],
				},
			],
			callback: async (event) => {
				console.log('Start Playback')
				console.log(`API send: ${self.baseUrl}/ctrl/pb?action=${event.options.pb_state}`)
				const response = await fetch(`${self.baseUrl}/ctrl/pb?action=${event.options.pb_state}`, { method: 'GET' })
				let resultData = await response.json()
				console.log(`API response: ${JSON.stringify(resultData)}`)
			},
		},

		set_white_balance_auto: {
			// This sets the camera to Either Auto,  Manual, or Expert White Balance
			// Expert White Balance allows you to set the RGB values
			// TODO: Add Expert White Balance
			name: 'White Balance: Auto White Balance',
			options: [
				{	
					type: 'dropdown',
					id: 'wb_mode',
					label: 'White Balance Mode',
					default: 'Auto',
					choices: [
						{id: 'Auto', label: 'Auto'},
						{id: 'Manual', label: 'Manual'},
						{id: 'Expert', label: 'Expert(RGB values)'},
						//{id: 'rec_tl', label: 'Record Timelapse'},
					],
					
				},
			],
			callback: async (event) => {
				console.log('Setting White Balance mode')
				console.log(`API send: ${self.baseUrl}/ctrl/set?wb=${event.options.wb_mode}`)
				const response = await fetch(`${self.baseUrl}/ctrl/set?wb=${event.options.wb_mode}`, { method: 'GET' })
				let resultData = await response.json()
				console.log(`API response: ${JSON.stringify(resultData)}`)
			},
		},

		set_white_balance: {
			// When the Camera is in Manual White Balance mode, This allows you to set the KELVIN value (4300K)
			name: 'White Balance: Set Klevin Value',
			options: [
				{
					id: 'wb_value',
					type: 'number',
					label: 'White Balance Value',
					default: '4200',
					step:100,
					min: 2300,
					max: 30000,
				},
			],
			callback: async (event) => {
				console.log('Setting White Balance mode')
				console.log(`API send: ${self.baseUrl}/ctrl/set?mwb=${event.options.wb_value}`)
				const response = await fetch(`${self.baseUrl}/ctrl/set?mwb=${event.options.wb_value}`, { method: 'GET' })
				let resultData = await response.json()
				console.log(`API response: ${JSON.stringify(resultData)}`)
			},
		},

		set_rec: {
			//When the Camera is in Record mode, This allows you to start or stop the record
			name: 'Record: Set Recording State',
			options: [
				{
					id: 'rec_state',
					type: 'dropdown',
					label: 'Recording State',
					default: 'start',
					choices: [
						{id: 'start', label: 'Start'},
						{id: 'stop', label: 'Stop'},
					],
				},
			],
			callback: async (event) => {
				console.log('Start Recording')
				console.log(`API send: ${self.baseUrl}/ctrl/rec?action=${event.options.rec_state}`)
				const response = await fetch(`${self.baseUrl}/ctrl/rec?action=${event.options.rec_state}`, { method: 'GET' })
				let resultData = await response.json()
				console.log(`API response: ${JSON.stringify(resultData)}`)
			},
		},
	})
}
