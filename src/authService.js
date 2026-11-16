
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail
} from "firebase/auth";

import { auth } from "./firebase";

// Register a new user
export const registerUser = async (email, password) => {
  const result = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await sendEmailVerification(result.user);

  return result.user;
};

// Sign in an existing user
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign out
export const logoutUser = () => {
  return signOut(auth);
};

// Listen for authentication changes
export const listenToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Reset forgotten password
export const resetUserPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};
