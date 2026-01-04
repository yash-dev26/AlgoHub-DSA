import Layout from "./components/layout";
import Description from "./pages/problemPage";
import sampleProblem from "./sample/sample.problem";

const App = () => {

  const mdtext = sampleProblem.problemStatement;

  return (
    <div>
      <Layout>
        <div className="mt-5 p-4 border rounded">
          <Description text={mdtext}/>
        </div>
      </Layout>
    </div>
  )
}

export default App
