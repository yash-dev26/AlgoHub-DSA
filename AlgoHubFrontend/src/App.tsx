import { Route } from "react-router-dom";

import Layout from "./components/layout";
import { SocketProvider } from "./components/SocketProvider";
import Description from "./pages/problemPage";
import sampleProblem from "./sample/sample.problem";


const App = () => {

  const mdtext = sampleProblem.problemStatement;

  return (

    <div>
      <Route path='/problem' element={ 
        <SocketProvider>
          <Layout>
            <div className="mt-5 p-4 border rounded">
              <Description text={mdtext}/>
            </div>
          </Layout>
        </SocketProvider>
      }/>
    </div>
  )
}

export default App
