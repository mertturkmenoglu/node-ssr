const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const appRoutes = require('./routes/appRoutes');

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(null, Math.random().toString() + '_' + file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	// const re = /image\/(png|jpg|jpeg)/
	// if (re.test(file.mimetype)) {
	// 	cb(null, true);
	// } else {
	// 	cb(null, false);
	// }

	const mt = file.mimetype;
	console.log('File mimetype: ', mt);
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
app.use(appRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started listening on port ${PORT}`);
});
