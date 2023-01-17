import axios from "axios";
import config from "./config";
import utils from "./utils";

const requestUserAuthorization = async () => {
  const code_verifier = utils.generateRandomString(64);
  const code_challenge = await utils.generateCodeChallenge(code_verifier);
  localStorage.setItem("code_verifier", code_verifier);
  const scope = config.scopes;
  const params = new URLSearchParams({
    response_type: "code",
    client_id: config.client_id,
    scope,
    redirect_uri: config.redirect_uri,
    code_challenge_method: "S256",
    code_challenge,
  }).toString();
  console.log({ params });
  window.location.replace(`https://accounts.spotify.com/authorize?${params}`);
};

const requestAccessToken = async (code) => {
  const code_verifier = localStorage.getItem("code_verifier");
  const body = {
    code,
    redirect_uri: config.redirect_uri,
    grant_type: "authorization_code",
    code_verifier,
    client_id: config.client_id,
  };
  const requestConfig = {
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    json: true,
  };
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    body,
    requestConfig
  );
  return processTokenResponse(response.data);
};
const refreshToken = async (refresh_token) => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    {
      client_id: config.client_id,
      grant_type: "refresh_token",
      refresh_token,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    }
  );
  return processTokenResponse(response.data);
};
/**
 *
 * @param {Object} auth
 * @returns {Object} auth - the inputed auth object with expires_at entry inlcuded
 */
const processTokenResponse = (auth) => {
  const time = new Date();
  const expires_at = time.setSeconds(time.getSeconds() + auth.expires_in);
  // const expires_at = time.setSeconds(time.getSeconds());

  return { ...auth, expires_at };
};
const spotifyAuth = {
  requestUserAuthorization,
  requestAccessToken,
  refreshToken,
};
export default spotifyAuth;
