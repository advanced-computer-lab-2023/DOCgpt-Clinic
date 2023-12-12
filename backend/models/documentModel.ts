// models/Document.js
import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  username: { type: String, required: true },    
  document: {type: String, required: true },
  filePath: { type: String }
  // Add other document properties as needed
});

const documentModel= mongoose.model('Document', documentSchema);
export default documentModel;