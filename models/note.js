import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: { type: String, trim: true, required: true },
  text: { type: String, trim: true, required: true },
  color: { type: String, trim: true },
  tags: [{ type: String, trim: true }],
  labels: [{ type: String, trim: true }],
  archived: { type: Boolean, default: false },
  // trashed: { type: Boolean, default: false },
  trashedAt: { type: Date },
  reminder: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Note = mongoose.model('Note', NoteSchema);

export default Note;
