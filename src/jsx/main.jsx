/**
 * Terminology:
 * 'set': set a data value
 * 'get': get a data value
 * 'fetch': primarily in APIs
 */

import * as React from 'react';
import * as ReactDOM from  'react-dom/client';
import { createClient } from '@supabase/supabase-js'

// =============================== Fetching Data Section ===============================
// Supabase stuff
const supabaseUrl = 'https://qxjxlinixufdsasuwmvy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
                    + '.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4anhsaW5peHVmZHNhc3V3bXZ5Iiwi'
                    + 'cm9sZSI6ImFub24iLCJpYXQiOjE2Njg4NjkxMjgsImV4cCI6MTk4NDQ0NTEyOH0'
                    + '.EeYpdNC4Mh9Vd1olibBqPz2RbXk_mz8aTNYwamxcm_I';
const supabase = createClient(supabaseUrl, supabaseKey);

// ============================== React Components Section ==============================
// ! React components MUST start with uppercase
const Quest = props => {
    return <div>
        <p className="quest-title">{props.title}</p>
        <p className="quest-desc">{props.description}</p>
    </div>
}

const QuestList = props => {
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

    return <div id="quest-list">
        {questsData.map((data, index) => 
            <Quest key={index} title={data.title} description={data.description}/>
            )}
    </div>
}

// ==================================== Main Section ====================================
// If you have code that needs to do asynchronous stuff, put it here please :)
/*
(async () => {

})();
*/

// Set root for quest list
const root = ReactDOM.createRoot(document.getElementById("quest-root-container"));
root.render(<QuestList />);