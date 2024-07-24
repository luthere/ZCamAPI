module.exports = function (self) {
	self.setActionDefinitions({
		sample_action: {
			name: 'My First Action',
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Test',
					default: 5,
					min: 0,
					max: 100,
				},
			],
			callback: async (event) => {
				console.log('Hello world!', event.options.num)
			},
		
		},
		sample_action2: {
			name: 'My Second Action',
			options: [
				{
					id: 'text',
					type: 'textinput',
					label: 'Text',
					default: 'Hello World',
				},
			],
			callback: async (event) => {
				console.log('Hello world!', event.options.text)
			},
		
		},
		get_info: {
			name: 'Get Info',
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
										fmt: resultData.fmt,})
										
				console.log(`API response: ${JSON.stringify(resultData)}`)
				self.updateActions()
			},
		
		},
		get_mode: {
			name: 'Mode: Query',
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
	})
}
