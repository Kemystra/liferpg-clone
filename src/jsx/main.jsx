import * as React from 'react';
import * as ReactDOM from  'react-dom/client';
import { createClient } from '@supabase/supabase-js'

// Supabase stuff
const supabaseUrl = 'https://qxjxlinixufdsasuwmvy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4anhsaW5peHVmZHNhc3V3bXZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg4NjkxMjgsImV4cCI6MTk4NDQ0NTEyOH0.EeYpdNC4Mh9Vd1olibBqPz2RbXk_mz8aTNYwamxcm_I'
const supabase = createClient(supabaseUrl, supabaseKey);

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

// ! React components MUST start with uppercase
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