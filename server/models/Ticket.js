const mongoose = require('mongoose')
const tags = ['html', 'css', 'js', 'node', 'vue', 'angular', 'react']

const TicketSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: {
    type: String,
    required: true,
    enum: tags
  },
  imageUrl: { type: String },
  image: { type: Object },
  creatorId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const Ticket = mongoose.model('Ticket', TicketSchema)

module.exports = Ticket
