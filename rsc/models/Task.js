const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'The userId is required']
    },
    title: {
      type: String,
      required: [true, 'The title is required'],
      trim: true
    },
    status: {
      type: String,
      enum: {
        values: ['scheduled', 'completed', 'cancelled'],
        message: '{VALUE} is not a valid status. Use: scheduled, completed or cancelled.'
      },
      default: 'scheduled'
    },
    dueDate: {
      type: Date,
      required: [true, 'The dueDate is required']
    }
  },
  {
    timestamps: true, // Automically creates and updates 'createdAt' and 'updatedAt'
    collection: 'task' // Defines collection name as 'task' in MVP database
  }
);

module.exports = mongoose.model('Task', TaskSchema);
