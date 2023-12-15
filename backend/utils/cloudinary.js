import {v2 as cloudinary} from 'cloudinary';
import { Cloudnary_data } from '../constant.js';
          
cloudinary.config(Cloudnary_data);

export default cloudinary