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
  allNotesByQuery,
  toggleTrash
   }  
   from '../controller/noteController.js';

const router = express.Router();

router.use(verifyToken);

router.post('/', saveNote);
router.get('/:trashed/:archive/:label?', getAllNotes)
router.put('/archive/:id', toggleArchive);
router.post('/toggle-trash/:id', toggleTrash);
router.delete('/delete/:id', deleteNote)
router.get('/search', allNotesByQuery)
router.get('/labels', getAllLabels);
router.put('/color/:id', toggleColor);
router.delete('/labels/:labelId', deleteLabel);
router.get('/reminders', dueDateReminderNotes);

export default router;
