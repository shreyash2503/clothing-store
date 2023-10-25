import { takeLatest, put, all, call, take } from "typed-redux-saga/macro";

import { USER_ACTION_TYPES } from "./user.types";
import {
  signInSuccess,
  signInFailed,
  signUpFailed,
  signUpSuccess,
  signOutSuccess,
  signOutFailed,
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess,
} from "./user.action";
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  SignInWithGooglePopup,
  signIn,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  AdditionalInformation,
} from "../../utils/firebase/firebase.utils";
import { User } from "firebase/auth";
//types

export function* getSnapShotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInformation
) {
  try {
    const userSnapShot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    if (userSnapShot) {
      console.log(userSnapShot.data());
      yield* put(
        signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() })
      );
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

///// ------------------------

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    console.log(userAuth);
    if (!userAuth) return;
    yield* call(getSnapShotFromUserAuth, userAuth);
  } catch (e) {
    yield* put(signInFailed(e as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(SignInWithGooglePopup);
    yield* call(getSnapShotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: EmailSignInStart) {
  try {
    const userCredential = yield* call(signIn, email, password);
    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapShotFromUserAuth, user);
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

//& Part of signUp SAGA
export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}: SignUpSuccess) {
  yield* call(getSnapShotFromUserAuth, user, additionalDetails);
}

export function* signUp({
  payload: { email, password, displayName },
}: SignUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess(user, { displayName }));
    }
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}
// working for the signup goes something like this
// * First our saga is listening for signUpStart so it triggers the signUp saga which in turns fires the
// * signUpSuccess action to which anther saga is listening called onSignUpSuccess which in turn fires
// * the signInAfterSignUp saga which gets the user snapShot and logs in the user

//* Entry point for signing up the user

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

// & End of signUp Saga

//* the signing out sagas
export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}
// * Entry point saga for signing out the user

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
