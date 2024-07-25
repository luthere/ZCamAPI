module.exports = async function (self) {
	self.setVariableDefinitions([
		{ variableId: 'sn', name: 'Serial Number' },
		{ variableId: 'sw', name: 'Software Version' },
		{ variableId: 'eth_ip', name: 'Ethernet IP Address' },
		{ variableId: 'cam_num', name: 'Camera Number' },
		{ variableId: 'url', name: 'Session URL' },
		{ variableId: 'hw', name: 'Hardware Version' },
		{ variableId: 'mac', name: 'MAC Address' },
		{ variableId: 'ble', name: 'Bluetooth Version?' },
		{ variableId: 'platform', name: 'Camera Platform' },
		{ variableId: 'fmt', name: 'List of Formats available' },
		{ variableId: 'mode', name: 'Current Mode of the camera is' },
		{ variableId: 'mwb', name: 'Manual White Balance' },
		{ variableId: 'iso', name: 'ISO Value' },
		{ variableId: 'iso_opts', name: 'Available ISO Options' },
		{ variableId: 'test10', name: 'Test Variable 10' },
	])
}
