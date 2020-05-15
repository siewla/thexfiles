const express = require('express');
const app = express ();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

require('./routes')(app);

app.listen(port, () => console.log(`Server started on port ${port}`));
