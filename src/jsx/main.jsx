const React = require("react");
const ReactDOM = require("react-dom/client");

let testData = [
    {
        questTitle: "Yo mama",
        questDesc: "Doing your mom LOL"
    },

    {
        questTitle: "Wassup, doc?",
        questDesc: "Emergency meeting due to sus"
    }
];

function Quest(props) {
    return <div>
        <p id="quest-title">{props.title}</p>
        <p id="quest-desc">{props.description}</p>
    </div>
}

function QuestList(props) {
    return <div className="root-container">
        {props.arr.map((data, index) => 
            <Quest key={index} title={data.questTitle} description={data.questDesc}/>
            )}
    </div>
}

// Set root for quest list
const root = ReactDOM.createRoot(document.getElementById("quest-list"));
root.render(<QuestList arr={testData} />);