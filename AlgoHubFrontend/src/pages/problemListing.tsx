import SampleProblemList from "../../src/sample/sampleProblemList";
import { type ProblemData } from "../types/ProblemData.type";
import CollapsableTopicProblem from "./collapsableList";


type Topic = {
    topic: string;
    topicId: string;
    problems: ProblemData[];
}

function ProblemList() {

    return (
        <div className="flex justify-center items-center w-screen">

            <div className="topic-list flex flex-col w-[60%]">
                    
                   {SampleProblemList.map((topic: Topic) => <CollapsableTopicProblem topicName={topic.topic} key={topic.topicId} problems={topic.problems}/>)}
            </div>


        </div>
    )
}

export default ProblemList;