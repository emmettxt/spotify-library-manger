import { Route, Routes } from "react-router-dom";
import CallbackPage from "./components/CallbackPage";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import PlaylistPage from "./components/PlaylistPage/PlaylistPage.js";
import InitializeUserWrapper from "./components/InitialiseUserWrapper";
import LoadingLibraryModal from "./components/LoadingLibraryModal";
import { useSelector } from "react-redux";
function App() {
  const isLoading = useSelector((state) => state.library.isLoading);
  return (
    <InitializeUserWrapper>
      <div className="container mx-auto">
        <LoadingLibraryModal show={isLoading} />
        <Routes>
          <Route
            path="/"
            element={
              // <InitializeUserWrapper>
              <HomePage />
              // {/* </InitializeUserWrapper> */}
            }
          />
          <Route path="/playlist" element={<PlaylistPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/redirect" element={<CallbackPage />}></Route>
        </Routes>
        {/* <ToggleButtonTest /> */}
      </div>
    </InitializeUserWrapper>
  );
}

export default App;
