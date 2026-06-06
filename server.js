require('dotenv').config();
// using require because most of companies that were created earlier have used require rather then import although not much diff.
const app = require('./src/app');
const connectToDB = require('./src/config/db')


connectToDB();

app.listen(3000, () => {
     console.log("Server is running on port 3000")
})

