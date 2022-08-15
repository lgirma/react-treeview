import React from 'react'
import ReactDOM from 'react-dom/client'
import {TreeView} from './TreeView'
import './index.css'
import {DefaultTreeDataService, NewLeaf, NewNode} from "./common";

const rootDir = NewNode('aacity', 'Addis Ababa City',
    NewNode('hq', 'Head Quarters',
        NewNode('security', 'Security Staff',
            NewLeaf('jbauer', 'Jack Bauer'),
            NewLeaf('shello', 'Shell Oil')),
        NewNode('hr', 'Human Resources'),
        NewNode('marketing', 'Marketing Department'),
        NewLeaf('abebed', 'Abebe Debela'),
        NewLeaf('lgirma', 'Leone Geremew'),
        NewLeaf('tadesset', 'Tadesse Tessema'),
        NewLeaf('almazt', 'Almaz Tamirat'),
        NewLeaf('adanea', 'Adane Abebe')),
    NewNode('itdept', 'IT Department',
        NewNode('networking', 'Networking'),
        NewNode('software', 'Software Development'),
        NewNode('sysadmin', 'System Administration'),
        NewLeaf('johnk', 'John Kelly'),
        NewLeaf('jackb', 'Jack Burry'),
        NewLeaf('toastedt', 'Toasted Tess')),
    NewNode('tech', 'Technology'),
    NewNode('finance', 'Finance'),
    NewNode('transport', 'Transportation'),
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TreeView service={DefaultTreeDataService} root={rootDir} />
  </React.StrictMode>
)
