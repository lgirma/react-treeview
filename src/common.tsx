export interface ITreeNode {
    id: string
    name: string
}

export interface TreeNode extends ITreeNode {
    id: string
    name: string
    isLeaf?: boolean
    children?: TreeNode[]
}

export function NewNode(id: string, name: string, ...subUnits: TreeNode[]): TreeNode {
    return {
        isLeaf: false,
        id,
        name,
        children: subUnits ?? []
    }
}

export function NewLeaf(id: string, name: string): TreeNode {
    return {
        children: [],
        isLeaf: true,
        id,
        name
    }
}

export interface TreeDataService<TNode extends ITreeNode> {
    getChildren(node: TNode): Promise<TNode[]>
    isLeaf(node: TNode): boolean
    toolbar: (node: TNode) => any
    icon: (node: TNode) => any
    onItemClicked?: (n: TNode) => any
}

export const DefaultTreeDataService : TreeDataService<TreeNode> = {
    isLeaf(node: TreeNode) {
        return node.isLeaf || false
    },
    async getChildren(node: TreeNode) {
        await new Promise(r => setTimeout(r, 500))
        return node.children || []
    },
    icon(node: TreeNode) {
        if (this.isLeaf(node)) {
            return <span style={{color: "#FFC83D"}}>😐</span>
        } else {
            return <span style={{color: "#54AEFF"}}>🖿</span>
        }
    },
    toolbar(node: TreeNode) {
        return <button onClick={e => {
            GetAllDescendantLeaves(this, node)
                .then(res => alert('Got: ' + res.length + ' descendants.'))
            e.stopPropagation()
        }}>Go</button>
    },
    onItemClicked(n: TreeNode) {
        alert('Selected: ' + n.name)
    }
}

export async function GetAllDescendantLeaves<TNode extends ITreeNode>(service:  TreeDataService<TNode>, root: TNode): Promise<TNode[]> {
    let result : TNode[] = []
    const children = (await service.getChildren(root))
    const leaves = children.filter(c => service.isLeaf(c))
    const nonLeaves = children.filter(c => !service.isLeaf(c))
    for (let i = 0; i < leaves.length; i++) {
        result.push(leaves[i])
    }
    for (let i = 0; i < nonLeaves.length; i++) {
        result = result.concat(await GetAllDescendantLeaves(service, nonLeaves[i]))
    }
    return result
}