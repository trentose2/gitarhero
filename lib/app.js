const express = require('express'),
          app = express();

app.get("/", (req, res) => {
    console.log("Hello from the console");
});

const port = process.env.PORT || 8000;
app.listen(port, () =>{
    console.log(`Server listening on port ${port} ...`);
})