// const mongoose = require('mongoose');
// const mongoURI  = 'mongodb://localhost:27017/quiknotez';

// const connectToMongo = async () => {
//     try {
//       await mongoose.connect(mongoURI, {
//         useNewUrlParser: true,
//       });
//       console.log("Connected to MongoDB successfully!");
//     } catch (error) {
//       console.error("Error connecting to MongoDB:", error);
//       process.exit(1); // Exit process with failure
//     }
//   };

// module.exports = connectToMongo;
const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/quiknotez';

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB successfully");

        // Handle disconnection
        mongoose.connection.on('disconnected', () => {
            console.error('MongoDB disconnected! Trying to reconnect...');
            connectToMongo(); // Try to reconnect
        });
        
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process on initial connection failure
    }
};

module.exports = connectToMongo;
