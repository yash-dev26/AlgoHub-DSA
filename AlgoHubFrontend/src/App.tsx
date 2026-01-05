import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout";
import ProblemList from "./pages/problemListing";
import Description from "./pages/problemPage";
import sampleProblem from "./sample/sample.problem";

const App = () => {

  const mdtext = sampleProblem.problemStatement;

  return (
    <div>
        <Routes>
          <Route path='/problems/list' element={
            <Layout>
              <ProblemList />
            </Layout>
            
          }/>
          <Route path='/problem' element={ 
            <Layout>
              <div className="mt-5 p-4 border rounded">
              <Description text={mdtext}/>
            </div>
            </Layout>}/>
        </Routes>
        
    </div>
  )
}

export default App
