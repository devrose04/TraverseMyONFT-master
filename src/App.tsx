import { Route, Routes, Navigate } from "react-router-dom";
import Gallery from "./pages/Gallery";
import { NotificationContainer } from "react-notifications";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Gallery />} />
                <Route path="/address/:address" element={<Gallery />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            <NotificationContainer />
        </div>
    );
}

export default App;
