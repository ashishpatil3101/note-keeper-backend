import express from 'express';
import Note from '../models/note.js';
import verifyToken from '../middleware/auth.js';
import {
  dueDateReminderNotes,
  deleteLabel,
  toggleColor,
  getAllLabels,
  saveNote, 
  getAllNotes, 
  toggleArchive, 
  deleteNote,
  allNotesByQuery
   }  
   from '../controller/noteController.js'
const router = express.Router();

router.use(verifyToken);

router.put('/trash/:id', async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    if (note.trashed) {
      await note.deleteOne();
      return res.json({ message: 'Note deleted successfully!' });
    }

    note.trashed = true;
    await note.save();

    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


router.post('/', saveNote);
router.get('/:trashed/:archive/:label?', getAllNotes)
router.put('/archive/:id', toggleArchive);
router.delete('/delete/:id', deleteNote)
// router.put('/trash/:id', "")
router.get('/search', allNotesByQuery)
router.get('/labels', getAllLabels);
router.put('/color/:id', toggleColor);
router.delete('/labels/:labelId', deleteLabel);
router.get('/reminders', dueDateReminderNotes);

export default router;
