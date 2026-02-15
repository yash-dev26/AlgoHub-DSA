import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout";
import { SocketProvider } from "./components/SocketProvider";
import Description from "./pages/problemPage";
import sampleProblem from "./sample/sample.problem";


const App = () => {
  const [problemData, setProblemData] = useState(sampleProblem);

const ioAdminUrl = import.meta.env.VITE_PROBLEM_SERVICE_URL;

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/problems/6991bbd6a59952c184ffe9b4`);
        console.log("Fetched problem data:", response.data?.data?.codeStub[0]?.userStub); // Log the fetched data
        setProblemData(response.data);
      } catch (err) {
        console.error("Error fetching problem:", err);
      }
    };

    fetchProblemDetails();
  }, [ioAdminUrl]);

  const mdtext = problemData?.data?.description || sampleProblem.problemStatement;
  const userstub = problemData?.data?.codeStub?.[0]?.userStub;

  return (

    <div>
      <Routes>
        <Route path='/problem' element={ 
        <SocketProvider>
          <Layout>
            <div className="mt-5 p-4 border rounded">
              <Description text={mdtext} userStub={userstub} />
            </div>
          </Layout>
        </SocketProvider>}/>
      </Routes>
    </div>
  )
}

export default App
