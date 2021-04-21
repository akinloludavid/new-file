import FileTree from './fileTree';

export function createFileTree(input) {
  const fileTree = new FileTree();

  let newArr =[...input]
  let arr = []
  let ID = newArr[0].id
  arr.push(newArr[0])

  
  for (let i = 1; i<newArr.length;i++){
    let nextChild = newArr.find(item =>item.parentId ===ID)
    arr.push(nextChild)
    ID = nextChild.id
  }

  for (const inputNode of arr) {
    
    const parentNode = inputNode.parentId
      ? fileTree.findNodeById(inputNode.parentId)
      : null;

    fileTree.createNode(
      inputNode.id,
      inputNode.name,
      inputNode.type,
      parentNode
    );

  }

  return fileTree;
}
