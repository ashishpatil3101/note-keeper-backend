import cron from 'node-cron';
import Note from '../models/note.js'; 

// Function to delete old trashed notes
const deleteOldTrashedNotes = async () => {
  console.log("in crone job")
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    await Note.deleteMany({
      trashedAt: { $lt: thirtyDaysAgo }
    });

    console.log('Old trashed notes deleted successfully');
  } catch (error) {
    console.error('Error deleting old trashed notes:', error);
  }
};

// Schedule the task to run every day at midnight
const scheduleTrashedNotesDeletion = () => {
  cron.schedule('0 0 * * *', deleteOldTrashedNotes); // Runs every day at midnight
  deleteOldTrashedNotes(); // Run immediately on startup
};

export default scheduleTrashedNotesDeletion;
