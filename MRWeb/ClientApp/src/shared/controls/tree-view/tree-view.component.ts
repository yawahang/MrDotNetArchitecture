import {
  Component, EventEmitter, Input, OnDestroy,
  OnInit, Output, ViewChild, ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MvCheckedNode, MvTree, MvTreeConfig } from './tree-view.model';

@Component({
  selector: 'tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TreeViewComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();

  @Output() valueChange = new EventEmitter<any>();
  @ViewChild('searchInput', { static: true }) searchInput: any;

  treeNode: MvTree[];
  rootNode: MvTree[];
  currentNode: MvTree; // currently value changed Node
  checkedNodes: MvCheckedNode[] = [];

  searchText = ''; // search value
  indeterminate = false; // tree all check is indeterminate
  checkedAll: boolean; // is all tree Node Checked
  searchable = true; // tree is searchable
  expanded = true; // tree Node is expanded
  returnValueOnInit = true; // return selected values on Initialization
  selected = 'All'; // tree toggle value
  actionsList: string[] = ['All', 'Checked', 'UnChecked', 'Disabled'];

  @Input('config') set config(prop: MvTreeConfig) {

    if (prop) {

      if (prop.Data && Array.isArray(prop.Data) && prop.Data.length > 0) {

        this.treeNode = [...new Set(prop.Data.map(o => JSON.stringify(o)))].map(s => JSON.parse(s));
      } else {

        this.treeNode = [];
      }

      this.searchable = prop.Searchable != null ? prop.Searchable : true;
      this.expanded = prop.Expanded != null ? prop.Expanded : true;
      this.returnValueOnInit = prop.ReturnValueOnInit != null ? prop.ReturnValueOnInit : true;
      this.initialliazeConfig();
    }
  }

  constructor() {

  }

  ngOnInit() {

  }

  initialliazeConfig() {

    this.treeNode.map(n => {  // set expanded, searchable, Searched poperty

      n.Searched = true;
      n.Visible = n.Visible != null ? n.Visible : true;
      n.Disabled = n.Disabled != null ? n.Disabled : false;
      n.Expanded = n.Expanded != null ? n.Expanded : this.expanded;
    });

    const selectedNodes = this.getNode({} as MvTree, 'Checked');
    (selectedNodes || []).map((n) => {

      this.currentNode = n;
      this.visitChildNodes(n, n.Checked);
    });

    this.rootNode = this.getNode({} as MvTree, 'rootNode');

    this.isCheckedAll();

    if (this.returnValueOnInit) {

      setTimeout(() => {
        this.valueChange.emit(this.checkedNodes); // emit Checked nodes initially
      }, 300);
    }
  }

  onFilterChange(e: any) {

    if (e) {

      this.filterNode(e.value);
    }
  }

  isCheckedAll() {

    const checkedNodes = this.treeNode.filter(n => n.Checked && n.Visible);
    const allNode = this.treeNode.filter(n => (n.Visible));

    if (allNode.length === checkedNodes.length) {

      this.checkedAll = true;
      this.indeterminate = false;
    } else if (checkedNodes.length > 0) {

      this.checkedAll = false;
      this.indeterminate = true;
    } else {

      this.checkedAll = false;
      this.indeterminate = false;
    }
  }

  onCheckChange(Node: MvTree) {

    Node.Checked = !Node.Checked;

    if (!Node.ParentNodeId) { // set indeterminate for root Node

      const child = this.getNode(Node, 'childNode');
      child.map(x => {

        x.Checked = Node.Checked;
        this.currentNode = x;
        this.visitChildNodes(x, Node.Checked);
      });
    } else {

      this.currentNode = Node;
      this.visitChildNodes(Node, Node.Checked);
    }

    this.isCheckedAll();
    this.valueChange.emit(this.checkedNodes);
  }

  setIndeterminate(Node: MvTree) {  // set indeterminate

    const child = this.getNode(Node, 'childNode');
    const checkedChild = child.filter(n => n.Checked);

    if (child.length > 0) {

      if (child.length === checkedChild.length) {

        Node.Checked = true;
        Node.Indeterminate = false;
      } else if (checkedChild.length > 0) {

        Node.Checked = this.currentNode.NodeId !== Node.NodeId ? false : this.currentNode.Checked;
        Node.Indeterminate = true;
      } else {

        Node.Checked = this.currentNode.NodeId !== Node.NodeId ? false : this.currentNode.Checked;
        Node.Indeterminate = false;
      }
    }
  }

  private visitParentNodes(Node: MvTree) { // loop through parent

    const parent = this.getNode(Node, 'parentNode');
    if (parent && parent.length === 1) {

      const child = this.getNode(parent[0], 'childNode');
      const checkedChild = child.filter(n => n.Checked);

      if (child.length === checkedChild.length) {

        parent[0].Checked = true;
        parent[0].Indeterminate = false;
      } else if (checkedChild.length > 0) {

        parent[0].Checked = this.currentNode.NodeId !== Node.NodeId ? false : this.currentNode.Checked;
        parent[0].Indeterminate = true;
      } else {

        parent[0].Checked = this.currentNode.NodeId !== Node.NodeId ? false : this.currentNode.Checked;
        parent[0].Indeterminate = false;
      }

      this.visitParentNodes(parent[0]);
    } else if (parent && parent.length > 1) {

      console.error('A Node can\'t have multiple parents!');
    }
  }

  private visitChildNodes(node: MvTree, checked: boolean) { // loop through child

    const child = this.getNode(node, 'childNode');

    if (child && child.length > 0) {

      child.map((o) => {

        if (o.Visible) { // if action is uncheck, keep same value o.Checked of the Node, else Checked value of Checked Node

          o.Checked = (o.Disabled && !this.currentNode.Checked) ? o.Checked : checked;
        }

        this.visitChildNodes(o, checked);
      });
    } else {  // if Checked Node is lowest child or has no child

      this.visitParentNodes(node);
      const nodeChecked = this.checkedNodes.filter((n: MvCheckedNode) => n.NodeId === node.NodeId);
      if (node.Checked && nodeChecked.length === 0) {

        this.checkedNodes.push({
          NodeId: node.NodeId,
          Node: node.Node,
          Checked: node.Checked,
          EnityId: node.EnityId,
          EnityType: node.EnityType,
          ParentNodeId: node.ParentNodeId
        });
      } else if (!node.Checked) {

        this.checkedNodes = this.checkedNodes.filter((x: MvCheckedNode) => (x.NodeId !== node.NodeId));
      }
    }
  }

  getNode(Node: MvTree, type: string): MvTree[] {

    if (type === 'Node') { // get Node detail

      return this.treeNode.filter(n => (n.NodeId && Node.NodeId));
    } else if (type === 'rootNode') { // get rootNode list

      return this.treeNode.filter(n => (!n.ParentNodeId && n.Visible)); // ParentNodeId null for rootNode
    } else if (type === 'parentNode') { // get parentNode list

      return this.treeNode.filter(n => (n.NodeId === Node.ParentNodeId && n.Visible));
    } else if (type === 'childNode') {  // get childNode list

      return this.treeNode.filter(n => (n.ParentNodeId === Node.NodeId && n.Visible));
    } else if (type === 'Checked') { // get Checked nodes, get only lowest child, lowest level nodes doesnt have child

      return this.treeNode.filter(n => (n.Checked && !this.hasChild(n)));
    }
  }

  hasChild(Node: MvTree): boolean {

    const child = this.getNode(Node, 'childNode');

    if (child && child.length > 0) {

      return true;
    } else {

      return false;
    }
  }

  searchNode(event: any) {

    this.unSetAllSearchedNodes();
    this.searchText = event.srcElement ? event.srcElement.value.toLowerCase() : '';

    const filteredNode = this.getFilteredNode();
    filteredNode.map(x => { // make Node Searched
      x.Searched = true;
      this.setParentNodeSearched(x);
    });
  }

  filterNode(view: string) {

    if (['ExpandAll', 'CollapseAll'].includes(view)) { // expand collapse

      this.expanded = !this.expanded;

      // make Node expanded
      this.treeNode.map(x => {
        x.Expanded = this.expanded;
      });

    } else { // toggle nodes

      this.selected = view;

      this.unSetAllSearchedNodes();

      if (this.searchable && this.searchInput) {

        this.searchInput.nativeElement.value = '';
        this.searchText = '';
      }

      const filteredNode = this.getFilteredNode();
      filteredNode.map(x => { // make Node Searched
        x.Searched = true;
        this.setParentNodeSearched(x);
      });
    }
  }

  private getFilteredNode(): MvTree[] {

    let searchedNode: MvTree[];

    if (this.selected === 'Checked') {

      searchedNode = this.treeNode.filter(x => (x.Node.toLowerCase().includes(this.searchText) && x.Checked));
    } else if (this.selected === 'UnChecked') {

      searchedNode = this.treeNode.filter(x => (x.Node.toLowerCase().includes(this.searchText) && !x.Checked));
    } else if (this.selected === 'Disabled') {

      searchedNode = this.treeNode.filter(x => (x.Node.toLowerCase().includes(this.searchText) && x.Disabled));
    } else { // all

      searchedNode = this.treeNode.filter(x => x.Node.toLowerCase().includes(this.searchText));
    }

    return searchedNode;
  }

  private setParentNodeSearched(Node: MvTree) {

    const parent = this.getNode(Node, 'parentNode');
    if (parent && parent.length > 0) {

      parent[0].Searched = true;
      this.setParentNodeSearched(parent[0]);
    }
  }

  private unSetAllSearchedNodes() {

    this.treeNode.map(x => {
      x.Searched = false;
    });
  }

  clearSearch() {

    if (this.searchable && this.searchInput) {

      this.searchInput.nativeElement.value = '';
      this.searchText = '';
      this.searchNode({});
    }
  }

  openCloseNode(Node: MvTree) {
    Node.Expanded = !Node.Expanded;
  }

  trackIndex(index: number): number {
    return index;
  }

  ngOnDestroy() {

    this.subs.unsubscribe();
  }
}