import { firebaseStorage } from './firebase.js';
import { ref, uploadBytes } from 'firebase/storage';

const myStorageRef = ref(firebaseStorage);
