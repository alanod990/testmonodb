const mongoose = require('mongoose');

// Sua URI de conexão
const mongoURI = 'mongodb+srv://projetofofoca:QamAsfi0qk1YHzKY@fofoqueiros.myctr.mongodb.net/?retryWrites=true&w=majority&appName=Fofoqueiros';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connection successful'))
.catch(err => console.error('MongoDB connection error:', err));
