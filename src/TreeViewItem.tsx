import {ITreeNode, TreeDataService} from "./common";

export interface TreeViewItemProps<TNode extends ITreeNode> {
    node: TNode
    key: any
    service: TreeDataService<TNode>
    onClick: any
}

export function TreeViewItem<TNode extends ITreeNode>({node,key, service, onClick}: TreeViewItemProps<TNode>) {
    return <div className={`node ${service.isLeaf(node) ? 'node-user' : 'node-org'}`} onClick={onClick} key={key}>
        {service.icon(node)} {node.name}
        <span style={{float: 'right'}}>
            {service.toolbar(node) ?? ''}
        </span>
    </div>
}