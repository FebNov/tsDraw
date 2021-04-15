export interface ConnectionEvent {
	/**
	 * outputNodeId
	 */
	output_id: string;
	/**
	 * inputNodeId
	 */
	input_id: string;
  
	/**
	 * name of the output
	 */
	output_class: string;
  
	/**
	 * name of the input
	 */
	input_class: string;
  }
export interface ConnectionStartEvent {
	/**
	 * outputNodeId
	 */
	output_id: string;
  
	/**
	 * name of the output
	 */
	output_class: string;
}
export interface DrawflowNode {
	  class: string;
	  data: any;
	  html: string;
	  id: number;
	  inputs: Record<string, DrawflowConnection>;
	  name: string;
	  outputs: Record<string, DrawflowConnection>;
	  pos_x: number;
	  pos_y: number;
	  typenode: boolean;
	  
}
export interface DrawflowConnection {
	connections: DrawflowConnectionDetail[];
}
export interface DrawflowConnectionDetail {
	input: string;
	output: string;
	node: string;
}
  export interface MousePositionEvent {
	x: number;
	y: number;
  }
  export enum DrawFlowEditorMode{
	  EDIT ='edit',
	  FIXED = 'fixed',
	  VIEW ='view'
  }
  export enum ModuleName{
	  HOME = 'Home'
  }
  export interface Noderegister{
	  [name:string]: {
		  [html:string]:{
			html?:NodeList,
			option?:any;
			props?:any;
		  },		  
	  }
  }