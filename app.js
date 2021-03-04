const express = require('express');
const path = require('path');
const app = express();
const appRoutes = require('./routes/appRoutes');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(appRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started listening on port ${PORT}`);
});
