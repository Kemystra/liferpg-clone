/**
 * Terminology:
 * 'set': set a data value
 * 'get': get a data value
 * 'fetch': primarily in APIs
 */

import * as React from 'react';
import * as ReactDOM from  'react-dom/client';
import { createClient } from '@supabase/supabase-js';
import { Popup } from './popup.jsx';
import { Quest } from './classes/quest.jsx';
import { Navbar } from './navbar.jsx';

// =============================== Fetching Data Section ===============================
// Supabase stuff
const supabaseUrl = 'https://qxjxlinixufdsasuwmvy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
                    + '.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4anhsaW5peHVmZHNhc3V3bXZ5Iiwi'
                    + 'cm9sZSI6ImFub24iLCJpYXQiOjE2Njg4NjkxMjgsImV4cCI6MTk4NDQ0NTEyOH0'
                    + '.EeYpdNC4Mh9Vd1olibBqPz2RbXk_mz8aTNYwamxcm_I';
const supabase = createClient(supabaseUrl, supabaseKey);

// ============================== React Components Section ==============================

const App = props => {
    const [questsData, setQuestsData] = React.useState([]);

    React.useEffect(() => {
        // If directly use async, cleanup function of useEffect would be a Promise
        // so, kinda bad?
        (async () => {
            let resp = await supabase
            .from('Quests')
            .select('title, description');

            if(resp.error) {
                console.error(`Error encountered in fetching data: ${JSON.stringify(resp.error)}`);
            }
            
            setQuestsData(resp.data);
        })();
    }, []);

    return <main>
        <Navbar />
        <section id="quest-list">
        {questsData.map((data, index) => 
            <QuestBar key={index} quest={new Quest(data.title, data.description)}/>
            )}
    </section>
    </main>
}

// ! React components MUST start with uppercase
const QuestBar = props => {
    const [isEditing, setIsEditing] = React.useState(false);

    function startEditing() {
        setIsEditing(true);
    }

    function handleCanceledEdits() {
        setIsEditing(false);
    }

    function handleFinishedEdits() {
        // update back to Supabase
        setIsEditing(false);
    }

    return <div className="quest">
        <div className="quest-text-part">
            <p className="quest-text quest-title">{props.quest.title}</p>
            <p className="quest-text quest-desc">{props.quest.description}</p>
        </div>
        <div className="quest-action-part">
            <button className="quest-edit"
                onClick={startEditing}
            >Edit</button>
            <button className="quest-complete">Comp</button>
            {
                isEditing &&
                <Popup
                    content="Hello, World!"
                    onCanceled={handleCanceledEdits}
                    onFinished={handleFinishedEdits}
                />
            }
        </div>
    </div>
}

// ==================================== Main Section ====================================
// If you have code that needs to do asynchronous stuff, put it here please :)
/*
(async () => {

})();
*/

// Set root for quest list
const root = ReactDOM.createRoot(document.getElementById("ui-root"));
root.render(<App />);