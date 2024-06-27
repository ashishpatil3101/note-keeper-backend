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
// Create a note
// router.post('/', async (req, res) => {
//   const { title, text, color, tags, labels, reminderDate } = req.body;
//   try {
//     let newNote = new Note({
//       title,
//       text,
//       color,
//       tags,
//       labels,
//       reminder: reminderDate,
  
//     });
  
//     const note = await newNote.save();
//     res.json(note);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// });

// // Get all notes
// router.get('/:trashed/:archive/:label?', async (req, res) => {
//   let { trashed, archive, label } = req.params;
//   const trashedBool = trashed === 'true';
//   const archiveBool = archive === 'true';
//   console.log(label)
//   try {
//     const query = {
//       trashed: trashedBool,
//       archived: archiveBool,
//     };

//     if (label && label !== 'undefined') {
//       label = label.trim();
//       query.labels = { $in: [label] } ;
//     }

//     const notes = await Note.find(query).sort({ createdAt: -1 });
//     res.json(notes);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// });

// // Archive or unarchive a note
// router.put('/archive/:id', async (req, res) => {
//   try {
//     let note = await Note.findById(req.params.id);
//     if (!note) return res.status(404).json({ message: 'Note not found' });

//     note.archived = !note.archived;
//     await note.save();

//     res.json(note);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// });


// // Delete note permanently
// router.delete('/delete/:id', async (req, res) => {
//   try {
//     const note = await Note.findById(req.params.id);
//     if (!note) return res.status(404).json({ message: 'Note not found' });

//     await note.deleteOne();
//     res.json({ message: 'Note deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });


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


// router.get('/search', async (req, res) => {
//   const { query } = req.query;
//   try {
//       const searchRegex = new RegExp(query, 'i');
//       const notes = await Note.find({
//           $or: [
//               { title: searchRegex },
//               { text: searchRegex },
//               { tags: { $in: [searchRegex] } },
//               { labels: { $in: [searchRegex] } }
//           ]
//       }).sort({ createdAt: -1 });

//       res.json(notes);
//   } catch (error) {
//       console.error(error.message);
//       res.status(500).send('Server Error');
//   }
// });

// // get labels
// router.get('/labels', async (req, res) => {
//   try {
//     const labels = await Note.distinct('labels');
//     res.status(200).json(labels);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch labels', error });
//   }
// });


// router.put('/color/:id', async (req, res) => {
//   const { color } = req.body;
//   try {
//     const note = await Note.findById(req.params.id);
//     if (!note) return res.status(404).json({ message: 'Note not found' });

//     note.color = color;
//     await note.save();
//     res.json(note);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// });


// // Example backend route to delete a label
// router.delete('/labels/:labelId', async (req, res) => {
//   const labelId = req.params.labelId;
//   try {
//     // Implement logic to delete label by ID from your database
//     await Note.updateMany(
//       { labels: labelId },
//       { $pull: { labels: labelId } }
//     );
//     console.log("in deleted label", labelId)
//     res.status(200).json({ message: 'Label deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting label:', error);
//     res.status(500).json({ error: 'Failed to delete label' });
//   }
// });

// router.get('/reminders', async (req, res) => {
//   console.log("bhau")
//   try {
//     const today = new Date();
//     const upcomingNotes = await Note.find({
//       reminder: { $gte: today }
//     }).sort({ reminder: 1 });

//     res.json(upcomingNotes);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// });


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
