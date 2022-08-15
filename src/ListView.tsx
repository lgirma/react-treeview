import {TreeViewItem} from "./TreeViewItem";
import {ITreeNode, TreeDataService} from "./common";

export interface ListViewProps<TNode extends ITreeNode> {
    list: TNode[],
    isFetchingChildren: boolean,
    service: TreeDataService<TNode>
    onClick: any
}

export function ListView<TNode extends ITreeNode>({list, isFetchingChildren, service, onClick}: ListViewProps<TNode>)
{
    if (isFetchingChildren) {
        return <div style={{textAlign: "center", color: "lightgrey"}}>
            <h2>...</h2><br />Loading
        </div>
    } else if ((list ?? []).length == 0) {
        return <h2 style={{textAlign: "center", color: "#CCC"}}>
            <span>🗁</span><br />No items
        </h2>
    } else {
        return <>
            {list.map(u => TreeViewItem({node: u, key: u.id, service, onClick: onClick(u)}))}
            </>
    }
}