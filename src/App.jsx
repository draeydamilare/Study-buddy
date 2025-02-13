import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Test from "./pages/Test";
import ProtectedRoute from "./components/ProtectedRoute";
import TestHistory from "./pages/TestHistory";
import TestQuestions from "./pages/TestQuestions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Review from "./pages/Review";
function App() {

  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route index path="/" element={<Login />} />
      <Route path="signup" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route path="test-history" element={<TestHistory />}/>
        <Route path="test-questions" element={<TestQuestions />}/>
        <Route path="review/:id" element={<Review />}/>
        <Route path="test" element={<Test />} />
      </Route>
    </Routes>
  )
}

export default App
