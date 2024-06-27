import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: { type: String, trim: true },
  text: { type: String, trim: true },
  color: { type: String, trim: true },
  tags: [{ type: String, trim: true }],
  labels: [{ type: String, trim: true }],
  archived: { type: Boolean, default: false },
  trashed: { type: Boolean, default: false },
  reminder: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Note = mongoose.model('Note', NoteSchema);

export default Note;
