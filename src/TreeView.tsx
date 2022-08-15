import {useEffect, useState} from 'react'
import {ListView} from "./ListView";
import {ITreeNode, TreeDataService} from "./common";

export interface TreeViewProps<TNode extends ITreeNode> {
    root: TNode
    service: TreeDataService<TNode>
}

interface NavState {
    currentPath: ITreeNode[]
}

export const TreeView = <TNode extends ITreeNode>({service, root}: TreeViewProps<TNode>) => {
    const [currentPath, setCurrentPath] = useState([root] as TNode[])
    const [list, setList] = useState([] as TNode[])

    const [searchShown, setSearchShown] = useState(false)
    const [searchKey, setSearchKey] = useState('')
    const [isFetchingChildren, setIsFetchingChildren] = useState(false)

    useEffect(() => {
        setIsFetchingChildren(true)
        service.getChildren(currentPath[currentPath.length - 1])
            .then(res => {
                setList(res)
                setIsFetchingChildren(false)
            })
            .catch(res => {
                setIsFetchingChildren(false)
            })
    }, [currentPath])

    useEffect(() => {
        setList(list.filter(li => !searchShown || nodeMatches(li, searchKey)))
    }, [searchShown, searchKey])

    function goTo(path: TNode[]) {
        if (path.length == 0)
            return;
        setCurrentPath([...path])
    }

    function getPath(fromPath: TNode[], node: TNode): TNode[] {
        let result : TNode[] = []
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
                    <button onClick={_ => goTo([...currentPath].slice(0, -1))} disabled={currentPath.length <= 1}>
                        ← Back
                    </button>
                    {searchShown
                        ? <span>
                            <input value={searchKey} placeholder="Find..." autoFocus onChange={e => setSearchKey(e.target.value)} />
                            <button onClick={e => setSearchShown(false)}>&times;</button>
                        </span>
                        : <button onClick={() => setSearchShown(true)}>🔍</button>}
                    <span style={{borderRight: '1px solid grey', margin: '0 5px'}} />
                    <div className="breadcrumb-bar">
                        {currentPath.map((p, i) => <span>
                            <NavLink key={p.id} node={p} onClick={() => goTo(getPath(currentPath, p))} />
                            {i < currentPath.length - 1 ? <span key={"span-" + p.id} style={{color: 'lightgrey'}}>/</span> : ''}
                        </span>)}
                    </div>
                </div>
            </div>
            <div className="node-content">

                <ListView list={list} isFetchingChildren={isFetchingChildren}
                    onClick={(li: TNode) => () => goTo([...currentPath, li])}
                    service={service}/>

            </div>
        </div>
    )
}



function nodeMatches<TNode extends ITreeNode>(node: TNode, searchKey: string): boolean {
    return searchKey.length == 0
        || node.name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1
}

interface NavLinkProps<TNode extends ITreeNode> {
    node: TNode
    key: any
    onClick: any
}

function NavLink<TNode extends ITreeNode>({node, key, onClick}: NavLinkProps<TNode>) {
    return <span className="breadcrumb-link" onClick={onClick} key={key}>
        {node.name}
    </span>
}

function getHash(input: string) {
    let hash = 0, len = input.length;
    for (let i = 0; i < len; i++) {
        hash  = ((hash << 5) - hash) + input.charCodeAt(i);
        hash |= 0; // to 32bit integer
    }
    return hash;
}
