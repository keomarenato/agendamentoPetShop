import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = 'public/images';
        if (req.baseUrl.includes("ADMINISTRADOR")) {
            folder += "/ADMINISTRADOR";
        }
        cb(null, folder);
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

// Configuração do multer para usar o storage definido
const imageUpload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Apenas arquivos de imagem são permitidos!'), false);
        }
        cb(null, true);
    }
});

export default imageUpload;

 
 