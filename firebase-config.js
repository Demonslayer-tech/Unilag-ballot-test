// ============================================================
// FIREBASE CONFIG — REPLACE WITH YOUR OWN PROJECT CREDENTIALS
// ============================================================
// Get these from: Firebase Console → Project Settings → General
// → "Your apps" → Web app → SDK setup and configuration
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  "type": "service_account",
  "project_id": "unilag-ballot-project",
  "private_key_id": "9a5b9ef8805afa73bd76d51786d20a3506bf9b8c",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDIO6mQlB6YeOt/\n35MCvFWv5A7xu0OS1u+a5TKugz7bPAhAGI/k+xWERzah7Dhwdw1IN/5AdzMsyg2w\nCmUoYTWEJgG9mtCtavshe5ZZ2CLrrZ4j7RVZnc1otZsjJIGJF3IK+JeNy6vplKb1\n9CeUP9boXWWEZym/QfKgIJ0M2YRcoynY08DWKsD0eJSUWGBuZSx3/FT9wlHAGch/\nl6FHooCfxAZb/Uyg1Y80KVMxuiD3vxJ0T1b42KivPS4R2XsqD11se8GKJZFW6dgZ\nEZp6VSD/+6q+PaVSOIhKLmiPaIfF74KdNUHQnG6eD3lEnyttWiRbL1SGdyoaK1Vg\ne8FN80QbAgMBAAECggEANs0BaPTo9MDvbzVw5khGSVfo8SbX5SnXNPTyrIl2HAlv\nlp9CTqCbcHMPFDzy63Dh3TiZ6OnWwzTfjyUhL25/d5XxVwO2hifn6G+LJDa/w/Hl\n/J4oADlsnPJLLdCRdURJ7Y/A5slt2QVatqjmZjAcsMbTAGw9pD832LRkVz529+Uh\nzMdWG+UZkf1GB3u3910HSOzDOx0eEdjHLXvaljLZIGo/EjYyCKWIx6itI4Fce0VX\n6plfU5wkyp69RkFXRbwZdSe4cWEv+3Rniu/bwvgXonnryyZjOkijgAr/TgDk/VQL\nwWohsWqki3KT/DQiCDOFo2oaGh4YcHpkpQYJRx1/BQKBgQDzp6HYeAtfqF/aNdEo\nsGHdADSD4FYMTJMOjaeddp3gvPWfRgU0fjEuWIL8AdQHYr/f9SqPw+kjdk2ofk/f\n0l35o9gzsWAwJ9G0wXc6+OI8WtrqeUQj1CYEoqlXPZVaL6IgJjuLQb6uueZED5Yo\nWTJrRwfm2yftdTA3owQBnNx97QKBgQDSYNIRp6i2FQrZAGzzJac+Oi/DA/EA7An2\nWZlLMzM0oYZ7vveDQqeOF5he4J8v1MFEESe0gLkxeW0B+7fxO9spsNRmi7nOeWJ4\nOwfekdfKp1i1v+FbvwdZXLXL4Fy8uw+P0QBVhKY+fNjh/KZT/ggrKQna+sw8OsCn\nah7ZB9HJJwKBgQCUcuiXk6QSVup3b1yMttIZLPvR8Udb3Pen4URjGpbcCyR3MtkO\n/2eFfiXn1lFRYqfWkm+pAcq0cWqlIrgVfP0GkP2zmPkqvcf1of27r1FfRlekjden\nIKU9I8GaxomNVgIoJkMW+CpuGBMkGn74/EdMtw0oaRPth/2lmCtjtCdejQKBgC0m\nTE8vrTyOnYpe1gME1LS9JhzzTpjFD4pIRmbmMRodhFAwdsw71Nvg4nmSOXe5cFTc\nXaoWaihdB/ECBcMG9o0m/x6W5CSU1nY5LQIuSKKccaRn7sSS5c/e3sFHgH+cocVa\ntHimBEuq3Zz6bPPfs/8XSp8tbgGLFmeXldE8JWDHAoGBAIOhbCdcp3a1jyqaDE+X\nVrLQ0nJmtXvo0exxEqhjH9w14aSTq2bUVFRS0/lpDgQVl2wSk9YIy8y2SYXuUd/r\nzocLGFJjZfvwj+HxLMbiNT+7ZBwUA76iH5k1I5VD3TjXistQj+EgjC6FmGKRw7Vq\nlO7lEnpqcfgc6myYI8rrqQhH\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@unilag-ballot-project.iam.gserviceaccount.com",
  "client_id": "104979900101636324305",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40unilag-ballot-project.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Firebase Auth needs an email format, but the portal only collects
// a Matric Number. This turns "CSC/2024/1140" into a valid,
// unique pseudo-email so Firebase Auth accepts it unchanged.
export function matricToEmail(matric) {
  return matric.trim().toLowerCase().replace(/[^a-z0-9]/g, "") + "@unilag-portal.local";
}
