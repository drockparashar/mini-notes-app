import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/notes'; 

const NotesService = {
  async getAllNotes() {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async createNote(note) {
    const response = await axios.post(`${API_BASE_URL}/new`, note);
    return response.data.newNote;
  },

  async deleteNote(id) {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  }
};

export default NotesService;
