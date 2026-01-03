import Layout from "./components/layout";
import Description from "./pages/problemPage";

const App = () => {

  const AIgeneratedMD = `# 🧠 Project Name

Short description of what this project does.

![Banner](https://www.chillbilldill.com/content/images/2023/08/weirdstockphoto5-1.jpg)

## ✨ Features
- Fast
- Scalable
- Clean architecture

## 🧰 Tech Stack
- Node.js
- Express
- MongoDB

## ⚙️ Setup
\`\`\`bash
git clone https://github.com/user/repo.git
cd repo
npm install
npm run dev
\`\`\`
`;


  return (
    <div>
      <Layout>
        <div className="mt-5 p-4 border rounded">
          <Description text={AIgeneratedMD}/>
        </div>
      </Layout>
    </div>
  )
}

export default App
