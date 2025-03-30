export default {
	name: 'customImage',
	title: 'Image',
	type: 'image',
	options: {
		hotspot: true
	},
	fields: [
		{
			name: 'alt',
			title: 'Alternative Text',
			type: 'string'
		},
		{
			name: 'title',
			title: 'Image Title',
			type: 'string'
		}
	]
}
