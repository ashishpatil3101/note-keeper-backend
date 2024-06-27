import sendResponse from './baseController.js';
import createError from '../utils/error.js';
import noteService from '../service/noteService.js';


/**
 * saveNote : creates the note
 * @param {body(title, text, color, tags, labels, reminderDate)} req
 * @param {data(title, text, color, tags, labels, reminderDate, id)} res
 */
const saveNote = async(req, res, next)=>{
    try {
        const { title, text } = req.body;
        if(title !== '' && title && text && text !== ''){
            const data = await noteService.saveNote(req);
            if(data !== null) return res.status(201).json(sendResponse(data.message,  data.data))
             else next(createError(data.status, data.message));
        } 
        else{
            next(createError(400, "Title and description required."));                      
        }    
    } catch (error) {
        console.log(error);
        next(createError(500, error.message));
    }
}


/**
 * getAllNotes : retrives the note by label, archived, trashed
 * @param {} req
 * @param {data(title, text, color, tags, labels, reminderDate, id)} res
 */

const getAllNotes = async(req, res, next)=>{
    console.log("dankey")
    try {
        const data = await noteService.getAllNotes(req);
        console.log(data)
        if(data.data !== null) return res.status(200).json(sendResponse(data.message, data.data));
        else next(createError(data.status, data.message));
    } catch (error) {
        console.log("in getall notes", error);
        next(createError(500, error.message));        
    }
}

/**
 * toggleArchive : archive , unarchives the note
 * @param {note id} req
 * @param  res
 */
const toggleArchive = async(req, res, next)=>{
    try {
        const data =  await noteService.toggleArchive(req);
        if(data !== null)res.status(200).json(sendResponse(data.message, data.data));
        else next(createError(data.status, data.message))
    } catch (error) {
        console.log("error in toggle archive");
         next(createError(500, error.message))
    }
}


/**
 * deleteNote : deletes the note permanently
 * @param {note id} req
 * @param  res
 */
const deleteNote = async(req, res, next)=>{
    try {
        const data =  await noteService.deleteNote(req);
        if(data !== null)res.status(200).json(sendResponse(data.message, data.data));
        else next(createError(data.status, data.message))
    } catch (error) {
        console.log("error in delete note");
         next(createError(500, error.message))
    }
}


/**
 * allNotesByQuery : return all notes by query
 * @param {query} req
 * @param {notes} res
 */
const allNotesByQuery = async(req, res, next)=>{
    try {
        const data =  await noteService.allNotesByQuery(req);
        res.status(200).json(sendResponse("Notes retrived sucessfully.", data.data));
    } 
    catch (error) {
        console.log("error in delete note");
         next(createError(500, error.message))
    }
}


/**
 * getAllLabels : return all labels for particular user
 * @param {query} req
 * @param {notes} res
 */
const getAllLabels = async(req, res, next)=>{
    try {
        const data =  await noteService.getAllLables(req);
        res.status(200).json(sendResponse(data.message, data.data));
    } 
    catch (error) {
        console.log("error in retriving  labels.");
         next(createError(500, error.message))
    }
}

/**
 * toggleColor : toggles bg color of note
 * @param {note id, color} req
 * @param {note} res
 */
const toggleColor = async(req, res, next)=>{
    try {
        const data =  await noteService.toggleColor(req);
        if(data.data !== null) return res.status(200).json(sendResponse(data.message, data.data));
        else next(createError(data.status, data.message));
    } 
    catch (error) {
        console.log("error in toggle color.");
         next(createError(500, error.message))
    }
}


/**
 * deleteLabel : deletes all labels
 * @param {label} req
 * @param {note} res
 */
const deleteLabel = async(req, res, next)=>{
    try {
        const data =  await noteService.deleteLabel(req);
        return res.status(200).json(sendResponse(data.message, data.data));
    } 
    catch (error) {
        console.log("error in delete label.");
         next(createError(500, error.message))
    }
}



/**
 * dueDateReminderNotes : returns due date notes
 * @param {} req
 * @param {notes} res
 */
const dueDateReminderNotes = async(req, res, next)=>{
    try {
        const data =  await noteService.dueDateReminderNotes(req);
        return res.status(200).json(sendResponse(data.message, data.data));
    } 
    catch (error) {
        console.log("error in delete label.");
         next(createError(500, error.message))
    }
}


export {
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