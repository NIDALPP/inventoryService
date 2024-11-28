const express = require('express');
const app = express();
const inventoryRoute=require('./routes/inventoryRoute')
require('dotenv').config()

app.use(express.json())
app.use("/inventory",inventoryRoute)

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message
    })
})
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }) 