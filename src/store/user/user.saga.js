import { takeLatest, put, all, call, take } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";
import { signInSuccess, signInFailed, signUpFailed, signUpSuccess, signOutSuccess, signOutFailed } from "./user.action";
import { getCurrentUser, createUserDocumentFromAuth, SignInWithGooglePopup, signIn, createAuthUserWithEmailAndPassword, signOutUser } from "../../utils/firebase/firebase.utils";

export function* getSnapShotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapShot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        console.log(userSnapShot.data());
        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
    } catch (error) {
        yield put(signInFailed(error))

    }
}




export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        console.log(userAuth);
        if (!userAuth) return;
        yield call(getSnapShotFromUserAuth, userAuth);


    } catch (e) {
        yield put(signInFailed(e));

    }
}


export function* signInWithGoogle() {
    try {
        const { user } = yield call(SignInWithGooglePopup)
        yield call(getSnapShotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));

    }

};

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(signIn, email, password);
        yield call(getSnapShotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));

    }

}


//& Part of signUp SAGA
export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
    yield call(getSnapShotFromUserAuth, user, additionalDetails)
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSuccess(user, { displayName }))

    } catch (error) {
        yield put(signUpFailed(error));

    }
}
// working for the signup goes something like this
// * First our saga is listening for signUpStart so it triggers the signUp saga which in turns fires the
// * signUpSuccess action to which anther saga is listening called onSignUpSuccess which in turn fires
// * the signInAfterSignUp saga which gets the user snapShot and logs in the user

//* Entry point for signing up the user

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}


export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

// & End of signUp Saga



//* the signing out sagas
export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());

    } catch (error) {
        yield put(signOutFailed());
    }
}
// * Entry point saga for signing out the user

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}


export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onCheckUserSession() {

    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}
export function* userSagas() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart)
    ]);
}