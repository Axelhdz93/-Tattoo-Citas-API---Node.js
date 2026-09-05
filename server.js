const express = require('express');
const cors = require('cors');
const citasRoutes = require('./routes/citas');


const app = express();

const PORT = process.env.PORT ?? 1234;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ status: "API Tattoo Citas funcionando", endpoints: "/api/citas" });
})

app.use('/api/citas', citasRoutes);


app.listen(PORT,() => {
    console.log(`server listening on port http://localhost:${PORT}`)
})