import mongoose, { Schema } from 'mongoose';

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  requiredSkills: [{ type: String }],
  teamSize: { type: Number, required: true },
  status: { type: String, enum: ['planning', 'active', 'completed'], required: true },
  managerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model('Project', projectSchema);