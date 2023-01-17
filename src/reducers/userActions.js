import spotifyService from "../services/spotify";
import spotifyAuth from "../utils/spotifyAuth";
import { clearUser, setAuth, setProfile } from "./userReducer";

/**
 * thunk action creator that return redux thunk function to update the user.auth in the store
 * should always be used in place of setAuth as it has the side effect of updating localStorage
 *
 * @param {Object} auth
 * @returns function that returns a promise
 */
export const updateAuth = (auth) => {
  return async (dispatch) => {
    localStorage.setItem("Spotify_loggedIn_user", JSON.stringify(auth));
    await dispatch(setAuth(auth));
  };
};

/**
 * thunk action creator returns a thunk redux thunk function that checks local storage for logged in user
 * will then refresh auth and if successful with get users profile and save both to store
 *
 * if stored credentials are invalid they will be removed and store is returned to inital state
 *
 * @returns promise that when fufilled will return the current user state
 */
export const initializeUser = () => {
  return async (dispatch, getState) => {
    console.log("initializeUser");
    const storedAuth = JSON.parse(
      localStorage.getItem("Spotify_loggedIn_user")
    );
    console.log({ storedAuth });
    if (storedAuth) {
      try {
        const refreshedAuth = await spotifyAuth.refreshToken(
          storedAuth?.refresh_token
        );
        console.log({ refreshedAuth });
        await dispatch(updateAuth(refreshedAuth));
        const currentUsersProfile = await spotifyService.getCurrentUsersProfile(
          refreshedAuth.access_token
        );
        console.log({ currentUsersProfile });
        await dispatch(setProfile(currentUsersProfile));
      } catch {
        localStorage.removeItem("Spotify_loggedIn_user");
        await dispatch(clearUser());
      }
    }
    return getState().user;
  };
};

/**
 * Thunk action creator for loging in user, should only be called by callback page from spotify login
 * Will also update the current users profile in store
 *
 * @param {String} code - authorisation code returned in url paramters to spotify call back @link https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
 */
export const loginUser = (code) => {

  return async (dispatch) => {
    console.log('login user')
    const auth = await spotifyAuth.requestAccessToken(code);
    await dispatch(updateAuth(auth));
    const currentUsersProfile = await spotifyService.getCurrentUsersProfile(
      auth.access_token
    );
    await dispatch(setProfile(currentUsersProfile));
  };
};
/**
 * Thunk action creator for loggin out user will auth from localStorage and reset store to inital state
 */
export const logoutUser = () => {
  return async (dispatch) => {
    localStorage.removeItem("Spotify_loggedIn_user");
    await dispatch(clearUser());
  };
};
/**
 * Thunk action creator for refreshing the token in the store
 *
 */
export const refreshToken = () => {
  return async (dispatch, getState) => {
    const {
      user: {
        auth: { refresh_token },
      },
    } = getState();
    if (refresh_token) {
      const updatedAuth = await spotifyAuth.refreshToken(refresh_token);
      await dispatch(updateAuth(updatedAuth));
    }
  };
};
