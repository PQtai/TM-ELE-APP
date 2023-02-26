import multer from 'multer';
const postMiddleware = {
  formatFileUpload: (nameUpload, options) => {
    const DIR = '/src/api/upload/';
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, process.cwd() + DIR);
      },
      filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + '-' + fileName);
      },
    });
    const upload = multer({
      storage,
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype == 'image/png' ||
          file.mimetype == 'image/jpg' ||
          file.mimetype == 'image/jpeg'
        ) {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      },
    });
    if (options === 'single') {
      return upload.single(nameUpload);
    } else if (options === 'multiple') {
      return upload.array(nameUpload);
    }
  },
};
export const { formatFileUpload } = postMiddleware;
