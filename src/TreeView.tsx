import { useState } from 'react'

interface TreeNode {
    id: string
    name: string
    logoUrl: string
    isUser?: boolean
    type?: string
    children?: TreeNode[]
}

function NewNode(id: string, name: string, ...subUnits: TreeNode[]): TreeNode {
    return {
        type: 'directory',
        isUser: false,
        id,
        name,
        logoUrl: '',
        children: subUnits ?? []
    }
}

function NewLeaf(id: string, name: string): TreeNode {
    return {
        children: [],
        type: 'user',
        isUser: true,
        logoUrl: '',
        id,
        name
    }
}

const rootDir: TreeNode = NewNode('aacity', 'Addis Ababa City',
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

interface NavState {
    root: TreeNode,
    currentPath: TreeNode[]
}

function TreeView() {
    const [navState, setNavState] = useState({
      root: rootDir,
      currentPath: [rootDir]
    } as NavState)

    const [searchShown, setSearchShown] = useState(false)
    const [searchKey, setSearchKey] = useState('')

    function goTo(path: TreeNode[]) {
        if (path.length == 0)
            return;
        setNavState(prev => ({
            ...prev,
            currentPath: path
        }))
    }

    function getPath(fromPath: TreeNode[], node: TreeNode): TreeNode[] {
        let result : TreeNode[] = []
        for (let i = 0; i < fromPath.length; i++) {
            result.push(fromPath[i])
            if (node == fromPath[i]) {
                break;
            }
        }
        return result
    }

    return (
        <div className="App">
            <div>
                <div className="tool-bar">
                    <button onClick={_ => goTo([...navState.currentPath].slice(0, -1))} disabled={navState.currentPath.length <= 1}>
                        <i className="fas fa-arrow-left" /> Back
                    </button>
                    {searchShown
                        ? <span>
                            <input value={searchKey} placeholder="Find..." autoFocus onChange={e => setSearchKey(e.target.value)} />
                            <button onClick={e => setSearchShown(false)}><i className="fas fa-times" /></button>
                        </span>
                        : <button onClick={() => setSearchShown(true)}><i className="fas fa-search" /></button>}
                    <span style={{borderRight: '1px solid grey', margin: '0 5px'}} />
                    <div className="breadcrumb-bar">
                        {navState.currentPath.map((p, i) => <span>
                            {NavLink(p, p.id, () => goTo(getPath(navState.currentPath, p)))}
                            {i < navState.currentPath.length - 1 ? <span style={{color: 'lightgrey'}}>/</span> : ''}
                        </span>)}
                    </div>
                </div>
            </div>
            <div className="node-content">
                {(navState.currentPath[navState.currentPath.length - 1].children ?? []).map(u =>
                    !searchShown || nodeMatches(u, searchKey) ? <div>
                        {TreeLink(u, u.id, () => goTo([...navState.currentPath, u]))}
                    </div> : '')}
            </div>
        </div>
    )
}

function nodeMatches(node: TreeNode, searchKey: string): boolean {
    return searchKey.length == 0
        || node.name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1
}

function NavLink(ou: TreeNode, key: any, onClick: any) {
    return <span className="breadcrumb-link" onClick={onClick} key={key}>
        {ou.name}
    </span>
}

function TreeLink(ou: TreeNode, key: any, onClick: any) {
    return <div className={`node ${ou.isUser ? 'node-user' : 'node-org'}`} onClick={onClick} key={key}>
        {ou.isUser ? <img src={`https://api.lorem.space/image/face?w=24&h=24&id=${key}`} height={16} width={16} /> : <i className="fas fa-folder" />} {ou.name}
        {ou.children?.length
            ? <small style={{color: 'grey', borderRadius: '7px', backgroundColor: '#ECECEC', padding: '3px 6px', marginLeft: '5px'}}>{ou.children.length}</small>
            : ''}
    </div>
}

function getHash(input: string){
    let hash = 0, len = input.length;
    for (let i = 0; i < len; i++) {
        hash  = ((hash << 5) - hash) + input.charCodeAt(i);
        hash |= 0; // to 32bit integer
    }
    return hash;
}

export default TreeView
