const express = require('express');
const path = require('path');
const multer = require('multer');
const helmet = require('helmet');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');
const app = express();
const appRoutes = require('./routes/appRoutes');

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(null, uuidv4() + '_' + file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	const mt = file.mimetype;
	if (mt === 'image/jpeg' || mt === 'image/jpg' || 'image/png') {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(
	multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(helmet());
app.use(morgan('[:date[web]] || :method :url  || Status: :status || Response time: :response-time ms'));
app.use(appRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started listening on port ${PORT}`);
});
