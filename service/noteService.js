import Note from '../models/note.js';
import User from '../models/user.js';

class NoteService {

    async saveNote(req) {
        const { title, text, color, tags, labels, reminderDate } = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (user === null) return { data: null, status: 401, message: "User does not exist." };
        const newNote = new Note({
            title,
            text,
            color,
            tags,
            labels,
            reminder: reminderDate,
            user: userId 
        });
        const note = await newNote.save();
        console.log("insaved note", note)
        return { data: newNote, status: 201, message: "Note saved successfully." };
    }

   
    async getAllNotes(req) {
        const userId = req.user.id;
        let { trashed, archive, label } = req.params;
        const trashedBool = trashed === 'true';
        const archiveBool = archive === 'true';
        let query = {user: userId}
        // if(label && label !== undefined && label !== ''){        
        //     query.labels = { $in: [label.trim()] };
        // }
        // else {
        //     query.archived =  archiveBool     
        //     if(trashed === 'true')query.trashedAt = { $ne: null }          
        //     else query.trashedAt = { $eq: null }  
        // }   
        let data ;
        if(trashed === 'true')data = await Note.find({$and:[{user: userId},{trashedAt : { $ne: null }}]});
        else if(archive  === 'true') data = await Note.find( { $and: [{user: userId},{archived : true}] }); 
        else if(label && label !== undefined && label !== '')   data = await Note.find({$and: [{user: userId},{labels : { $in: [label.trim()] }}]});       
        else data = await Note.find({ $and: [{user: userId},{archived : false, trashedAt : { $eq: null }}]}); 
        // const notes = await Note.find(query).sort({ createdAt: -1 });
        return { data: data, status: 200, message: "Note retrived successfully." }
    }


    async toggleArchive(req) {
        let note = await Note.findById(req.params.id);
        if (!note) return { data: null, status: 404, message: 'Note not found' };
        let message = note.archived ? 'Note unarchived successfully.' : "Note archived successfully.";
        note.archived = !note.archived;
        const data = await note.save();
        return { data: data, status: 200, message: "" }
    }

    async deleteNote(req){
        const note = await Note.findById(req.params.id);
        if (note === null)  return {data: null, status: 200, message: "Note not found."}

        await note.deleteOne();
        return {data: "Note deleted successfully", status: 200, message: "Note deleted successfully."}
    }

     async allNotesByQuery(req){
        const userId =  req.user.id;
        const { query } = req.query;
        const searchRegex = new RegExp(query, 'i');
        const notes = await Note.find({
            $and: [
                { user: userId }, // Criteria for matching user ID
                {
                    $or: [
                        { title: searchRegex },
                        { text: searchRegex },
                        { tags: { $in: [searchRegex] } },
                        { labels: { $in: [searchRegex] } }
                    ]
                }
            ]
        }).sort({ createdAt: -1 });
        return {data: notes}
     }

     async getAllLables(req){
        const userId = req.user.id;
        const labels = await Note.distinct('labels', { user: userId });
         return {data: labels, message: "Labels retrived successfully.", status:200}
     }

     async toggleColor(req){
        const { color } = req.body;
        const note = await Note.findById(req.params.id);
        if (!note) return { message: 'Note not found', data: null, message: 404 };
        note.color = color;
        await note.save();
        return {data: note, status: 200, message: "Background color toggled successfully."}
    }

    async deleteLabel(req){
        const userId = req.user.id;
        const labelId = req.params.labelId;
        const note = await Note.updateMany(
            { labels: labelId, user: userId },
            { $pull: { labels: labelId } }
          );
        return {data: note,  message: "Lable deleted successfully.", status: 200};
    }

    async dueDateReminderNotes(req){
        const userId = req.user.id;
        const today = new Date();
        const upcomingNotes = await Note.find({
            user: userId, 
            reminder: { $gte: today } 
        }).sort({ reminder: 1 });
        return {data: upcomingNotes,  message: "Notes retrieved successfully.", status: 200}
    }

    async toggleTrash(req){
        let note = await Note.findById(req.params.id);
        if (!note) return { date: null, status: 404, message: 'Note not found' };
        if(note.trashedAt &&  note.trashedAt !== null)note.trashedAt = null;
        else note.trashedAt = new Date();
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {trashedAt : note.trashedAt});
        // console.log(updatedNote,note)
        let msg = note.trashed === null ? 'Note trashed successfully.' : "Note recovered successfullly.";
        return { date: updatedNote, status: 200, message: msg };
    }
}

export default new NoteService();