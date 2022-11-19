const React = require("react");
const ReactDOM = require("react-dom/client");

function questList() {
    return <div className="root-container"></div>
}

// Set root for quest list
const questListSection = document.getElementById("quest-list");
const root = ReactDOM.createRoot(questListSection);
root.render(< questList />);