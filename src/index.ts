interface ConnectionEvent {
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
interface ConnectionStartEvent {
  /**
   * outputNodeId
   */
  output_id: string;

  /**
   * name of the output
   */
  output_class: string;
}
interface DrawflowNode {
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
interface DrawflowConnection {
	connections: DrawflowConnectionDetail[];
}
interface DrawflowConnectionDetail {
	input: string;
	output:string;
	node: string;
}
interface MousePositionEvent {
  x: number;
  y: number;
}
enum DrawFlowEditorMode{
	EDIT ='edit',
	FIXED = 'fixed',
	VIEW ='view'
}
interface HTMLElement {
  container:any;
  /**
    * @default null
    */
  render:any;
}
enum ModuleName{
	HOME = 'Home'
}
interface Noderegister{
	[name:string]: {
		html:string,
		props?:any,
		option?:any;
	}
}
export default class Drawflow {
	noderegister:Noderegister;
	events: object;
	drag:boolean;
  /**
    * Active reroute
    * @default false
    */
  reroute: boolean;
  /**
    * Fix adding points
    * @default false
    */
  reroute_fix_curvature: boolean;
  /**
     * Curvature
     * @default 0.5
     */
   curvature: number;
   /**
    * Curvature reroute first point and last point
    * @default 0.5
    */
   reroute_curvature_start_end: number;
   /**
    * Curvature reroute
    * @default 0.5
    */
   reroute_curvature: number;
   /**
    * Width of reroute
    * @default 6
    */
   reroute_width: number;
   /**
    * Width of line
    * @default 5
    */
   line_path: number;
   /**
    * Force the first input to drop the connection on top of the node
    * @default false
    */
   force_first_input: boolean;
   /**
    * edit or fixed mode
    * @default edit
    */
  editor_mode: DrawFlowEditorMode;
    /**
     * Default zoom
     * @default 1
     */
     zoom: number;
     /**
      * Default zoom max
      * @default 1.6
      */
     zoom_max: number;
     /**
      * Default zoom min
      * @default 0.5
      */
     zoom_min: number;
     /**
      * Default zoom value update
      * @default 0.1
      */
     zoom_value: number;
     /**
      * Default zoom last value
      * @default 1
      */
     zoom_last_value: number;
     /**
      * Drag nodes on click inputs
      * @default true
      */
     draggable_inputs: boolean;
     drawflow: any;
     container:any;
      /**
      * nodeId default Value
      * @default 1 
      */
     nodeId:number;
      /**
      * ele_selected default null
      * @default null
      */
     ele_selected:any;
      /**
      * node_selected default null
      * @default null
      */
      node_selected:any;
      /**
      * precanvas default null
      * @default null
      */
       precanvas:any;
      /**
      * drag_point default false
      * @default false
      */
       drag_point:boolean;
      /**
      * editor_selected default false
      * @default false
      */
       editor_selected:boolean;
      /**
      * connection default false
      * @default false
      */
       connection:boolean;
      /**
      * connection_ele default null
      * @default null
      */
       connection_ele:any;      
       /**
       * connection_selected default null
       * @default null
       */
        connection_selected:any;
      /**
      * canvas_x default Value
      * @default 0 
      */
       canvas_x:number;
      /**
      * canvas_y default Value
      * @default 0 
      */
      canvas_y:number;
      /**
      * pos_x default Value
      * @default 0 
      */
     pos_x:number;
    /**
      * pos_y default Value
      * @default 0 
      */
      pos_y:number;
      /**
      * pos_x_start default Value
      * @default 0 
      */
     pos_x_start:number;
      /**
      * pos_y_start default Value
      * @default 0 
      */
     pos_y_start:number;
    /**
      * mouse_x default Value
      * @default 0 
      */
      mouse_x:number;
      /**
      * mouse_y default Value
      * @default 0 
      */
     mouse_y:number;
      /**
       * first_click default null
       * @default null
       */
      first_click:any;
      /**
       * useuuid default flase
       * @default false
       */
        useuuid:boolean;
      /**
       * select_elements default null
       * @default null
       */
      select_elements:any;
	  evCache: any;
	  prevDiff:number;
	  moduleName:ModuleName;
	  e_pos_x:number =0;
	  e_pos_y:number =0;
	  render :any
    constructor({container, render}: HTMLElement){
      this.events = {};
      this.container = container;
      this.precanvas = null;
      this.nodeId = 1;
      this.ele_selected = null;
      this.node_selected = null;
      this.drag = false;
      this.reroute = false;
      this.reroute_fix_curvature = false;
      this.curvature = 0.5;
      this.reroute_curvature_start_end = 0.5;
      this.reroute_curvature = 0.5;
      this.reroute_width = 6;
      this.drag_point = false;
      this.editor_selected = false;
      this.connection = false;
      this.connection_ele = null;
      this.connection_selected = null;
      this.canvas_x = 0;
      this.canvas_y = 0;
      this.pos_x = 0;
      this.pos_x_start = 0;
      this.pos_y = 0;
      this.pos_y_start = 0;
      this.mouse_x = 0;
      this.mouse_y = 0;
      this.line_path = 5;
      this.first_click = null;
      this.force_first_input = false;
      this.draggable_inputs = true;
      this.useuuid = false;
      this.select_elements = null;
      this.noderegister = {};
      this.render = render;
      this.drawflow = { "drawflow": { "Home": { "data": {} }}};
      // Configurable options
      this.moduleName = ModuleName.HOME;
      this.editor_mode = DrawFlowEditorMode.EDIT
      this.zoom = 1;
      this.zoom_max = 1.6;
      this.zoom_min = 0.5;
      this.zoom_value = 0.1;
      this.zoom_last_value = 1;
  
      // Mobile
      this.evCache = []
      this.prevDiff = -1;
    }
  
    start (): void  {
      // console.info("Start Drawflow!!");
      this.container.classList.add("parent-drawflow");
      this.container.tabIndex = 0;
      this.precanvas = document.createElement('div');
      this.precanvas.classList.add("drawflow");
      this.container.appendChild(this.precanvas);
  
  
      /* Mouse and Touch Actions */
  
      this.container.addEventListener('mouseup', this.dragEnd.bind(this));
      this.container.addEventListener('mousemove', this.position.bind(this));
      this.container.addEventListener('mousedown', this.click.bind(this) );
  
      this.container.addEventListener('touchend', this.dragEnd.bind(this));
      this.container.addEventListener('touchmove', this.position.bind(this));
      this.container.addEventListener('touchstart', this.click.bind(this));
  
      /* Context Menu */
      this.container.addEventListener('contextmenu', this.contextmenu.bind(this));
      /* Delete */
      this.container.addEventListener('keydown', this.key.bind(this));
  
      /* Zoom Mouse */
      this.container.addEventListener('wheel', this.zoom_enter.bind(this));
      /* Update data Nodes */
      this.container.addEventListener('input', this.updateNodeValue.bind(this));
  
      this.container.addEventListener('dblclick', this.dblclick.bind(this));
      /* Mobile zoom */
      this.container.onpointerdown = this.pointerdown_handler.bind(this);
      this.container.onpointermove = this.pointermove_handler.bind(this);
      this.container.onpointerup = this.pointerup_handler.bind(this);
      this.container.onpointercancel = this.pointerup_handler.bind(this);
      this.container.onpointerout = this.pointerup_handler.bind(this);
      this.container.onpointerleave = this.pointerup_handler.bind(this);
  
      this.load();
    }
  
    /* Mobile zoom */
    pointerdown_handler(ev:any) {
     this.evCache.push(ev);
    }
  
    pointermove_handler(ev:any) {
     for (let i = 0; i < this.evCache.length; i++) {
       if (ev.pointerId == this.evCache[i].pointerId) {
          this.evCache[i] = ev;
       break;
       }
     }
  
     if (this.evCache.length == 2) {
       // Calculate the distance between the two pointers
       const curDiff = Math.abs(this.evCache[0].clientX - this.evCache[1].clientX);
  
       if (this.prevDiff > 100) {
         if (curDiff > this.prevDiff) {
           // The distance between the two pointers has increased
  
           this.zoom_in();
         }
         if (curDiff < this.prevDiff) {
           // The distance between the two pointers has decreased
           this.zoom_out();
         }
       }
       this.prevDiff = curDiff;
     }
    }
  
    pointerup_handler(ev:any) {
      this.remove_event(ev);
      if (this.evCache.length < 2) {
        this.prevDiff = -1;
      }
    }
    remove_event(ev:any) {
     // Remove this event from the target's cache
     for (let i = 0; i < this.evCache.length; i++) {
       if (this.evCache[i].pointerId == ev.pointerId) {
         this.evCache.splice(i, 1);
         break;
       }
     }
    }
    /* End Mobile Zoom */
    load() {
      for (const key in this.drawflow.drawflow[this.moduleName].data) {
        this.addNodeImport(this.drawflow.drawflow[this.moduleName].data[key], this.precanvas);
      }
  
      if(this.reroute) {
        for (const key in this.drawflow.drawflow[this.moduleName].data) {
          this.addRerouteImport(this.drawflow.drawflow[this.moduleName].data[key]);
        }
      }
  
      for (const key in this.drawflow.drawflow[this.moduleName].data) {
        this.updateConnectionNodes('node-'+key);
      }
  
      const editor = this.drawflow.drawflow
      let number = 1;
      Object.keys(editor).map(function(moduleName, index) {
        Object.keys(editor[moduleName].data).map(function(id, index2) {
          if(parseInt(id) >= number) {
            number = parseInt(id)+1;
          }
        })
      });
      this.nodeId = number;
    }
  
    removeReouteConnectionSelected(){
      this.dispatch('connectionUnselected', true);
      if(this.reroute_fix_curvature) {
        this.connection_selected.parentElement.querySelectorAll(".main-path").forEach((item, i) => {
          item.classList.remove("selected");
        });
      }
    }
  
    click(e:any) {
      this.dispatch('click', e);
      if(this.editor_mode === DrawFlowEditorMode.EDIT) {
        // return false;
         if(e.target.classList[0] === 'parent-drawflow' || e.target.classList[0] === 'drawflow') {
           this.ele_selected = e.target.closest(".parent-drawflow");
         } else {
           return false;
         }
      } else if(this.editor_mode === DrawFlowEditorMode.VIEW) {
        if(e.target.closest(".drawflow") != null || e.target.matches('.parent-drawflow')) {
          this.ele_selected = e.target.closest(".parent-drawflow");
          e.preventDefault();
        }
      } else {
        this.first_click = e.target;
        this.ele_selected = e.target;
        if(e.button === 0) {
          this.contextmenuDel();
        }
  
        if(e.target.closest(".drawflow_content_node") != null) {
          this.ele_selected = e.target.closest(".drawflow_content_node").parentElement;
        }
      }
      switch (this.ele_selected.classList[0]) {
        case 'drawflow-node':
          if(this.node_selected != null) {
            this.node_selected.classList.remove("selected");
            if(this.node_selected != this.ele_selected) {
              this.dispatch('nodeUnselected', true);
            }
          }
          if(this.connection_selected != null) {
            this.connection_selected.classList.remove("selected");
            this.removeReouteConnectionSelected();
            this.connection_selected = null;
          }
          if(this.node_selected != this.ele_selected) {
            this.dispatch('nodeSelected', this.ele_selected.id.slice(5));
          }
          this.node_selected = this.ele_selected;
          this.node_selected.classList.add("selected");
          if(!this.draggable_inputs) {
            if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'SELECT' && e.target.hasAttribute('contenteditable') !== true) {
              this.drag = true;
            }
          } else {
            if(e.target.tagName !== 'SELECT') {
              this.drag = true;
            }
          }
          break;
        case 'output':
          this.connection = true;
          if(this.node_selected != null) {
            this.node_selected.classList.remove("selected");
            this.node_selected = null;
            this.dispatch('nodeUnselected', true);
          }
          if(this.connection_selected != null) {
            this.connection_selected.classList.remove("selected");
            this.removeReouteConnectionSelected();
            this.connection_selected = null;
          }
          this.drawConnection(e.target);
          break;
        case 'parent-drawflow':
          if(this.node_selected != null) {
            this.node_selected.classList.remove("selected");
            this.node_selected = null;
            this.dispatch('nodeUnselected', true);
          }
          if(this.connection_selected != null) {
            this.connection_selected.classList.remove("selected");
            this.removeReouteConnectionSelected();
            this.connection_selected = null;
          }
          this.editor_selected = true;
          break;
        case 'drawflow':
          if(this.node_selected != null) {
            this.node_selected.classList.remove("selected");
            this.node_selected = null;
            this.dispatch('nodeUnselected', true);
          }
          if(this.connection_selected != null) {
            this.connection_selected.classList.remove("selected");
            this.removeReouteConnectionSelected();
            this.connection_selected = null;
          }
          this.editor_selected = true;
          break;
        case 'main-path':
          if(this.node_selected != null) {
            this.node_selected.classList.remove("selected");
            this.node_selected = null;
            this.dispatch('nodeUnselected', true);
          }
          if(this.connection_selected != null) {
            this.connection_selected.classList.remove("selected");
            this.removeReouteConnectionSelected();
            this.connection_selected = null;
          }
          this.connection_selected = this.ele_selected;
          this.connection_selected.classList.add("selected");
          const listclassConnection = this.connection_selected.parentElement.classList;
          this.dispatch('connectionSelected', { output_id: listclassConnection[2].slice(14), input_id: listclassConnection[1].slice(13), output_class: listclassConnection[3], input_class: listclassConnection[4] });
          if(this.reroute_fix_curvature) {
            this.connection_selected.parentElement.querySelectorAll(".main-path").forEach((item:any, i:any) => {
              item.classList.add("selected");
            });
          }
        break;
        case 'point':
          this.drag_point = true;
          this.ele_selected.classList.add("selected");
        break;
        case 'drawflow-delete':
          if(this.node_selected ) {
            this.removeNodeId(this.node_selected.id);
          }
  
          if(this.connection_selected) {
            this.removeConnection()
          }
  
          if(this.node_selected != null) {
            this.node_selected.classList.remove("selected");
            this.node_selected = null;
            this.dispatch('nodeUnselected', true);
          }
          if(this.connection_selected != null) {
            this.connection_selected.classList.remove("selected");
            this.removeReouteConnectionSelected();
            this.connection_selected = null;
          }
  
        break;
        default:
      }
      if (e.type === "touchstart") {
        this.pos_x = e.touches[0].clientX;
        this.pos_x_start = e.touches[0].clientX;
        this.pos_y = e.touches[0].clientY;
        this.pos_y_start = e.touches[0].clientY;
      } else {
        this.pos_x = e.clientX;
        this.pos_x_start = e.clientX;
        this.pos_y = e.clientY;
        this.pos_y_start = e.clientY;
      }
      this.dispatch('clickEnd', e);
    }
  
    position(e:any) {
      if (e.type === "touchmove") {
        const e_pos_x = e.touches[0].clientX;
        const e_pos_y = e.touches[0].clientY;
      } else {
        const e_pos_x = e.clientX;
        const e_pos_y = e.clientY;
      }
  
  
      if(this.connection) {
        this.updateConnection(this.e_pos_x, this.e_pos_y);
      }
      if(this.editor_selected) {
        /*if (e.ctrlKey) {
          this.selectElements(e_pos_x, e_pos_y);
        } else { */
        let x =  this.canvas_x + (-(this.pos_x - this.e_pos_x))
        let y = this.canvas_y + (-(this.pos_y - this.e_pos_y))
        // console.log(canvas_x +' - ' +pos_x + ' - '+ e_pos_x + ' - ' + x);
        this.dispatch('translate', { x, y});
        this.precanvas.style.transform = "translate("+x+"px, "+y+"px) scale("+this.zoom+")";
        // }
      }
      if(this.drag) {
  
        const x = (this.pos_x - this.e_pos_x) * this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom);
        const y = (this.pos_y - this.e_pos_y) * this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom);
        this.pos_x = this.e_pos_x;
        this.pos_y = this.e_pos_y;
  
        this.ele_selected.style.top = (this.ele_selected.offsetTop - y) + "px";
        this.ele_selected.style.left = (this.ele_selected.offsetLeft - x) + "px";
  
        this.drawflow.drawflow[this.moduleName].data[this.ele_selected.id.slice(5)].pos_x = (this.ele_selected.offsetLeft - x);
        this.drawflow.drawflow[this.moduleName].data[this.ele_selected.id.slice(5)].pos_y = (this.ele_selected.offsetTop - y);
  
        this.updateConnectionNodes(this.ele_selected.id)
      }
  
      if(this.drag_point) {
  
        const x = (this.pos_x - this.e_pos_x) * this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom);
        const y = (this.pos_y - this.e_pos_y) * this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom);
        this.pos_x = this.e_pos_x;
        this.pos_y = this.e_pos_y;
  
        const pos_x = this.pos_x * ( this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom)) - (this.precanvas.getBoundingClientRect().x * ( this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom)));
        const pos_y = this.pos_y * ( this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom)) - (this.precanvas.getBoundingClientRect().y * ( this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom)));
  
  
  
        this.ele_selected.setAttributeNS(null, 'cx', pos_x);
        this.ele_selected.setAttributeNS(null, 'cy', pos_y);
  
        const nodeUpdate = this.ele_selected.parentElement.classList[2].slice(9)
        const nodeUpdateIn = this.ele_selected.parentElement.classList[1].slice(13);
        const output_class = this.ele_selected.parentElement.classList[3];
        const input_class = this.ele_selected.parentElement.classList[4];
  
        let numberPointPosition = Array.from(this.ele_selected.parentElement.children).indexOf(this.ele_selected)-1;
  
        if(this.reroute_fix_curvature) {
          const numberMainPath = this.ele_selected.parentElement.querySelectorAll(".main-path").length-1
  
          numberPointPosition -= numberMainPath;
          if(numberPointPosition < 0) {
            numberPointPosition = 0;
          }
        }
  
        const nodeId = nodeUpdate.slice(5);
        const searchConnection = this.drawflow.drawflow[this.moduleName].data[nodeId].outputs[output_class].connections.findIndex(function(item,i) {
          return item.node ===  nodeUpdateIn && item.output === input_class;
        });
  
        this.drawflow.drawflow[this.moduleName].data[nodeId].outputs[output_class].connections[searchConnection].points[numberPointPosition] = { pos_x, pos_y };
  
        const parentSelected = this.ele_selected.parentElement.classList[2].slice(9);
  
        /*this.drawflow.drawflow[this.moduleName].data[this.ele_selected.id.slice(5)].pos_x = (this.ele_selected.offsetLeft - x);
        this.drawflow.drawflow[this.moduleName].data[this.ele_selected.id.slice(5)].pos_y = (this.ele_selected.offsetTop - y);
        */
        this.updateConnectionNodes(parentSelected);
      }
  
      if (e.type === "touchmove") {
        this.mouse_x = this.e_pos_x;
        this.mouse_y = this.e_pos_y;
      }
      this.dispatch('mouseMove', {x: this.e_pos_x,y: this.e_pos_y });
    }
  
    dragEnd(e:any) {
		let ele_last:Element
      if(this.select_elements != null) {
        this.select_elements.remove();
        this.select_elements = null;
      }
  
      if (e.type === "touchend") {
        const e_pos_x = this.mouse_x;
        const e_pos_y = this.mouse_y;
        ele_last = document.elementFromPoint(e_pos_x, e_pos_y);
      } else {
        const e_pos_x = e.clientX;
        const e_pos_y = e.clientY;
        ele_last = e.target;
      }
  
      if(this.drag) {
        if(this.pos_x_start != this.e_pos_x || this.pos_y_start != this.e_pos_y) {
          this.dispatch('nodeMoved', this.ele_selected.id.slice(5));
        }
      }
  
      if(this.drag_point) {
        this.ele_selected.classList.remove("selected");
      }
  
      if(this.editor_selected) {
        this.canvas_x = this.canvas_x + (-(this.pos_x - this.e_pos_x));
        this.canvas_y = this.canvas_y + (-(this.pos_y - this.e_pos_y));
        this.editor_selected = false;
      }
      if(this.connection === true) {
        // console.log(ele_last)
        if(ele_last.classList[0] === 'input' || (this.force_first_input && (ele_last.closest(".drawflow_content_node") != null || ele_last.classList[0] === 'drawflow-node'))) {
  
          if(this.force_first_input && (ele_last.closest(".drawflow_content_node") != null || ele_last.classList[0] === 'drawflow-node')) {
            if(ele_last.closest(".drawflow_content_node") != null) {
              const input_id = ele_last.closest(".drawflow_content_node").parentElement.id;
            } else {
              const input_id = ele_last.id;
            }
           if(Object.keys(this.getNodeFromId(input_id.slice(5)).inputs).length === 0) {
             const input_class = false;
           } else {
            const input_class = "input_1";
           }
  
  
         } else {
           // Fix connection;
           const input_id = ele_last.parentElement.parentElement.id;
           const input_class = ele_last.classList[1];
         }
         const output_id = this.ele_selected.parentElement.parentElement.id;
         const output_class = this.ele_selected.classList[1];
  
          if(output_id !== input_id && input_class !== false) {
  
            if(this.container.querySelectorAll('.connection.node_in_'+input_id+'.node_out_'+output_id+'.'+output_class+'.'+input_class).length === 0) {
            // Conection no exist save connection
  
            this.connection_ele.classList.add("node_in_"+input_id);
            this.connection_ele.classList.add("node_out_"+output_id);
            this.connection_ele.classList.add(output_class);
            this.connection_ele.classList.add(input_class);
            const id_input = input_id.slice(5);
            const id_output = output_id.slice(5);
  
            this.drawflow.drawflow[this.moduleName].data[id_output].outputs[output_class].connections.push( {"node": id_input, "output": input_class});
            this.drawflow.drawflow[this.moduleName].data[id_input].inputs[input_class].connections.push( {"node": id_output, "input": output_class});
            this.updateConnectionNodes('node-'+id_output);
            this.updateConnectionNodes('node-'+id_input);
            this.dispatch('connectionCreated', { output_id: id_output, input_id: id_input, output_class, input_class});
  
          } else {
            this.dispatch('connectionCancel', true);
            this.connection_ele.remove();
          }
  
            this.connection_ele = null;
        } else {
          // Connection exists Remove Connection;
          this.dispatch('connectionCancel', true);
          this.connection_ele.remove();
          this.connection_ele = null;
        }
  
        } else {
          // Remove Connection;
          this.dispatch('connectionCancel', true);
          this.connection_ele.remove();
          this.connection_ele = null;
        }
      }
  
      this.drag = false;
      this.drag_point = false;
      this.connection = false;
      this.ele_selected = null;
      this.editor_selected = false;
  
    }
    contextmenu(e:any) {
      this.dispatch('contextmenu', e);
      e.preventDefault();
      if(this.editor_mode === 'fixed' || this.editor_mode === 'view') {
        return false;
      }
      if(this.precanvas.getElementsByClassName("drawflow-delete").length) {
        this.precanvas.getElementsByClassName("drawflow-delete")[0].remove()
      };
      if(this.node_selected || this.connection_selected) {
        const deletebox = document.createElement('div');
        deletebox.classList.add("drawflow-delete");
        deletebox.innerHTML = "x";
        if(this.node_selected) {
          this.node_selected.appendChild(deletebox);
  
        }
        if(this.connection_selected) {
          deletebox.style.top = e.clientY * ( this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom)) - (this.precanvas.getBoundingClientRect().y *  ( this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom)) ) + "px";
          deletebox.style.left = e.clientX * ( this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom)) - (this.precanvas.getBoundingClientRect().x *  ( this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom)) ) + "px";
  
          this.precanvas.appendChild(deletebox);
  
        }
  
      }
  
    }
    contextmenuDel() {
      if(this.precanvas.getElementsByClassName("drawflow-delete").length) {
        this.precanvas.getElementsByClassName("drawflow-delete")[0].remove()
      };
    }
  
    key(e:any) {
      this.dispatch('keydown', e);
      if(this.editor_mode === DrawFlowEditorMode.FIXED || this.editor_mode === DrawFlowEditorMode.VIEW) {
        return false;
      }
      if (e.key === 'Delete' || (e.key === 'Backspace' && e.metaKey)) {
        if(this.node_selected != null) {
          if(this.first_click.tagName !== 'INPUT' && this.first_click.tagName !== 'TEXTAREA' && this.first_click.hasAttribute('contenteditable') !== true) {
            this.removeNodeId(this.node_selected.id);
          }
        }
        if(this.connection_selected != null) {
          this.removeConnection();
        }
      }
    }
  
    zoom_enter(event:any, delta:any) {
      if (event.ctrlKey) {
        event.preventDefault()
        if(event.deltaY > 0) {
          // Zoom Out
          this.zoom_out();
        } else {
          // Zoom In
          this.zoom_in();
        }
        // this.precanvas.style.transform = "translate("+this.canvas_x+"px, "+this.canvas_y+"px) scale("+this.zoom+")";
      }
    }
    zoom_refresh(){
      this.dispatch('zoom', this.zoom);
      this.canvas_x = (this.canvas_x / this.zoom_last_value) * this.zoom;
      this.canvas_y = (this.canvas_y / this.zoom_last_value) * this.zoom;
      this.zoom_last_value = this.zoom;
      this.precanvas.style.transform = "translate("+this.canvas_x+"px, "+this.canvas_y+"px) scale("+this.zoom+")";
    }
    zoom_in():void {
      if(this.zoom < this.zoom_max) {
          this.zoom+=this.zoom_value;
          this.zoom_refresh();
      }
    }
    zoom_out():void{
      if(this.zoom > this.zoom_min) {
        this.zoom-=this.zoom_value;
          this.zoom_refresh();
      }
    }
    zoom_reset(){
      if(this.zoom != 1) {
        this.zoom = 1;
        this.zoom_refresh();
      }
    }
  
    createCurvature(start_pos_x:number, start_pos_y:number, end_pos_x:number, end_pos_y:number, curvature_value:any, type:string) {
      const line_x = start_pos_x;
      const line_y = start_pos_y;
      const x = end_pos_x;
      const y = end_pos_y;
      const curvature = curvature_value;
	  let hx1 :number = 0;
	  let hx2 :number = 0;
      // type openclose open close other
      switch (type) {
        case 'open':
          if(start_pos_x >= end_pos_x) {
            hx1 = line_x + Math.abs(x - line_x) * curvature;
            hx2 = x - Math.abs(x - line_x) * (curvature*-1);
          } else {
             hx1 = line_x + Math.abs(x - line_x) * curvature;
             hx2 = x - Math.abs(x - line_x) * curvature;
          }
          return ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;
  
          break
        case 'close':
          if(start_pos_x >= end_pos_x) {
             hx1 = line_x + Math.abs(x - line_x) * (curvature*-1);
             hx2 = x - Math.abs(x - line_x) * curvature;
          } else {
             hx1 = line_x + Math.abs(x - line_x) * curvature;
             hx2 = x - Math.abs(x - line_x) * curvature;
          }
          return ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;
          break;
        case 'other':
          if(start_pos_x >= end_pos_x) {
             hx1 = line_x + Math.abs(x - line_x) * (curvature*-1);
             hx2 = x - Math.abs(x - line_x) * (curvature*-1);
          } else {
             hx1 = line_x + Math.abs(x - line_x) * curvature;
             hx2 = x - Math.abs(x - line_x) * curvature;
          }
          return ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;
          break;
        default:
  
           hx1 = line_x + Math.abs(x - line_x) * curvature;
           hx2 = x - Math.abs(x - line_x) * curvature;
  
          return ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;
      }
  
    }
  
    drawConnection(ele:any) {
    const connection = document.createElementNS('http://www.w3.org/2000/svg',"svg");
      this.connection_ele = connection;
      const path = document.createElementNS('http://www.w3.org/2000/svg',"path");
      path.classList.add("main-path");
      path.setAttributeNS(null, 'd', '');
      // path.innerHTML = 'a';
      connection.classList.add("connection");
      connection.appendChild(path);
      this.precanvas.appendChild(connection);
      const id_output = ele.parentElement.parentElement.id.slice(5);
      const output_class = ele.classList[1];
      this.dispatch('connectionStart', { output_id: id_output, output_class });
  
    }
  
    updateConnection(eX:number, eY:number) {
      const precanvas = this.precanvas;
      const zoom = this.zoom;
      let precanvasWitdhZoom = precanvas.clientWidth / (precanvas.clientWidth * zoom);
      precanvasWitdhZoom = precanvasWitdhZoom || 0;
      let precanvasHeightZoom = precanvas.clientHeight / (precanvas.clientHeight * zoom);
      precanvasHeightZoom = precanvasHeightZoom || 0;
      const path = this.connection_ele.children[0];
  
      /*var line_x = this.ele_selected.offsetWidth/2 + this.line_path/2 + this.ele_selected.parentElement.parentElement.offsetLeft + this.ele_selected.offsetLeft;
      var line_y = this.ele_selected.offsetHeight/2 + this.line_path/2 + this.ele_selected.parentElement.parentElement.offsetTop + this.ele_selected.offsetTop;*/
  
      const line_x = this.ele_selected.offsetWidth/2 + (this.ele_selected.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
      const line_y = this.ele_selected.offsetHeight/2 + (this.ele_selected.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
  
      const x = eX * ( this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom)) - (this.precanvas.getBoundingClientRect().x *  ( this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom)) );
      const y = eY * ( this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom)) - (this.precanvas.getBoundingClientRect().y *  ( this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom)) );
  
      /*
      var curvature = 0.5;
      var hx1 = line_x + Math.abs(x - line_x) * curvature;
      var hx2 = x - Math.abs(x - line_x) * curvature;
      */
  
      // path.setAttributeNS(null, 'd', 'M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y);
      const curvature = this.curvature;
      const lineCurve = this.createCurvature(line_x, line_y, x, y, curvature, 'openclose');
      path.setAttributeNS(null, 'd', lineCurve);
  
    }
    
    /**
     * Add connection. Ex: 15,16,'output_1','input_1'
     * @param id_output
     * @param id_input
     * @param output_class
     * @param input_class
     */
    addConnection(id_output: string | number, id_input: string | number, output_class: string, input_class: string) : void{
      const nodeOneModule = this.getModuleFromNodeId(id_output);
      const nodeTwoModule = this.getModuleFromNodeId(id_input);
      if(nodeOneModule === nodeTwoModule) {
  
        const dataNode = this.getNodeFromId(id_output);
        let exist = false;
        for(const checkOutput in dataNode.outputs[output_class].connections){
          const connectionSearch = dataNode.outputs[output_class].connections[checkOutput]
          if(connectionSearch.node == id_input && connectionSearch.output == input_class) {
              exist = true;
          }
        }
        // Check connection exist
        if(exist === false) {
          // Create Connection
          this.drawflow.drawflow[nodeOneModule].data[id_output].outputs[output_class].connections.push( {"node": id_input.toString(), "output": input_class});
          this.drawflow.drawflow[nodeOneModule].data[id_input].inputs[input_class].connections.push( {"node": id_output.toString(), "input": output_class});
  
          if(this.moduleName === nodeOneModule) {
          // Draw connection
            const connection = document.createElementNS('http://www.w3.org/2000/svg',"svg");
            const path = document.createElementNS('http://www.w3.org/2000/svg',"path");
            path.classList.add("main-path");
            path.setAttributeNS(null, 'd', '');
            // path.innerHTML = 'a';
            connection.classList.add("connection");
            connection.classList.add("node_in_node-"+id_input);
            connection.classList.add("node_out_node-"+id_output);
            connection.classList.add(output_class);
            connection.classList.add(input_class);
            connection.appendChild(path);
            this.precanvas.appendChild(connection);
            this.updateConnectionNodes('node-'+id_output);
            this.updateConnectionNodes('node-'+id_input);
          }
  
          this.dispatch('connectionCreated', { output_id: id_output, input_id: id_input, output_class, input_class});
        }
      }
    }
  
    /**
     * Update connections position from Node Ex id: node-x
     * @param id
     */
     updateConnectionNodes(id: string | number): void{
  
      // Aquí nos quedamos;
      const idSearch = 'node_in_'+id;
      const idSearchOut = 'node_out_'+id;
      const line_path = this.line_path/2;
      const container = this.container;
      const precanvas = this.precanvas;
      const curvature = this.curvature;
      const createCurvature = this.createCurvature;
      const reroute_curvature = this.reroute_curvature;
      const reroute_curvature_start_end = this.reroute_curvature_start_end;
      const reroute_fix_curvature = this.reroute_fix_curvature;
      const rerouteWidth = this.reroute_width;
      const zoom = this.zoom;
      let precanvasWitdhZoom = precanvas.clientWidth / (precanvas.clientWidth * zoom);
      precanvasWitdhZoom = precanvasWitdhZoom || 0;
      let precanvasHeightZoom = precanvas.clientHeight / (precanvas.clientHeight * zoom);
      precanvasHeightZoom = precanvasHeightZoom || 0;
  
      const elemsOut = container.querySelectorAll(`.${idSearchOut}`);
	
	  
      Object.keys(elemsOut).map(function(item, index) {
		let elemtsearchId_out :any;
		let elemtsearch :any ;
		let elemtsearchId :any ='';
		let elemtsearchOut :any;
		let eX : number;
		let eY :number;
		let x :number;
		let y :number
		let line_x :number;
		let line_y:number
        if(elemsOut[item].querySelector('.point') === null) {
  
        elemtsearchId_out = container.querySelector(`#${id}`);
  
          const id_search = elemsOut[item].classList[1].replace('node_in_', '');
          elemtsearchId = container.querySelector(`#${id_search}`);
  
          elemtsearch = elemtsearchId.querySelectorAll('.'+elemsOut[item].classList[4])[0]
  
          /*var eX = elemtsearch.offsetWidth/2 + line_path + elemtsearch.parentElement.parentElement.offsetLeft + elemtsearch.offsetLeft;
          var eY = elemtsearch.offsetHeight/2 + line_path + elemtsearch.parentElement.parentElement.offsetTop + elemtsearch.offsetTop;*/
           eX = elemtsearch.offsetWidth/2 + (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
          eY = elemtsearch.offsetHeight/2 + (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
  
          elemtsearchOut = elemtsearchId_out.querySelectorAll('.'+elemsOut[item].classList[3])[0]
          /*var line_x = elemtsearchId_out.offsetLeft + elemtsearchId_out.querySelectorAll('.'+elemsOut[item].classList[3])[0].offsetLeft + elemtsearchId_out.querySelectorAll('.'+elemsOut[item].classList[3])[0].offsetWidth/2 + line_path;
          var line_y = elemtsearchId_out.offsetTop + elemtsearchId_out.querySelectorAll('.'+elemsOut[item].classList[3])[0].offsetTop + elemtsearchId_out.querySelectorAll('.'+elemsOut[item].classList[3])[0].offsetHeight/2 + line_path;*/
        line_x =  elemtsearchOut.offsetWidth/2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
          line_y =  elemtsearchOut.offsetHeight/2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
  
           x = eX;
          y = eY;
          /*
          var curvature = 0.5;
          var hx1 = line_x + Math.abs(x - line_x) * curvature;
          var hx2 = x - Math.abs(x - line_x) * curvature;
          // console.log('M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y );
          elemsOut[item].children[0].setAttributeNS(null, 'd', 'M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y );
          */
  
          const lineCurve = createCurvature(line_x, line_y, x, y, curvature, 'openclose');
          elemsOut[item].children[0].setAttributeNS(null, 'd', lineCurve );
        } else {
          const points = elemsOut[item].querySelectorAll('.point');
          let linecurve = '';
          const reoute_fix :string[]=[];
          points.forEach((item, i) => {
            if(i === 0 && ((points.length -1) === 0)) {
              // M line_x line_y C hx1 line_y hx2 y x y
               elemtsearchId_out = container.querySelector(`#${id}`);
               elemtsearch = item;
  
               eX =  (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
               eY =  (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
  
              /*var line_x = elemtsearchId_out.offsetLeft + elemtsearchId_out.querySelectorAll('.'+item.parentElement.classList[3])[0].offsetLeft + elemtsearchId_out.querySelectorAll('.'+item.parentElement.classList[3])[0].offsetWidth/2 + line_path;
              var line_y = elemtsearchId_out.offsetTop + elemtsearchId_out.querySelectorAll('.'+item.parentElement.classList[3])[0].offsetTop + elemtsearchId_out.querySelectorAll('.'+item.parentElement.classList[3])[0].offsetHeight/2 + line_path;*/
              elemtsearchOut = elemtsearchId_out.querySelectorAll('.'+item.parentElement.classList[3])[0]
               line_x =  elemtsearchOut.offsetWidth/2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
               line_y =  elemtsearchOut.offsetHeight/2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
               x = eX;
               y = eY;
  
              /*var curvature = 0.5;
              var hx1 = line_x + Math.abs(x - line_x) * curvature;
              var hx2 = x - Math.abs(x - line_x) * curvature;
              linecurve += ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;*/
              let lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'open');
              linecurve += lineCurveSearch;
              reoute_fix.push(lineCurveSearch);
  
              // var elemtsearchId_out = document.getElementById(id);
              elemtsearchId_out = item;
              const id_search = item.parentElement.classList[1].replace('node_in_', '');
              elemtsearchId = container.querySelector(`#${id_search}`);
              elemtsearch = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[4])[0]
  
              /*var eX = elemtsearch.offsetWidth/2 + line_path + elemtsearch.parentElement.parentElement.offsetLeft + elemtsearch.offsetLeft;
              var eY = elemtsearch.offsetHeight/2 + line_path + elemtsearch.parentElement.parentElement.offsetTop + elemtsearch.offsetTop;*/
              elemtsearchIn = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[4])[0]
              const eX =  elemtsearchIn.offsetWidth/2 + (elemtsearchIn.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
              const eY =  elemtsearchIn.offsetHeight/2 + (elemtsearchIn.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
  
  
              const line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
              const line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
              const x = eX;
              const y = eY;
              /*
              var curvature = 0.5;
              var hx1 = line_x + Math.abs(x - line_x) * curvature;
              var hx2 = x - Math.abs(x - line_x) * curvature;
              linecurve += ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;
              */
              const lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'close');
              linecurve += lineCurveSearch;
              reoute_fix.push(lineCurveSearch);
  
            } else if(i === 0) {
              // console.log("Primero");
              // M line_x line_y C hx1 line_y hx2 y x y
              // FIRST
              let elemtsearchId_out = container.querySelector(`#${id}`);
              let elemtsearch = item;
  
              let eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
              let eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
  
              /*var line_x = elemtsearchId_out.offsetLeft + elemtsearchId_out.querySelectorAll('.'+item.parentElement.classList[3])[0].offsetLeft + elemtsearchId_out.querySelectorAll('.'+item.parentElement.classList[3])[0].offsetWidth/2 + line_path;
              var line_y = elemtsearchId_out.offsetTop + elemtsearchId_out.querySelectorAll('.'+item.parentElement.classList[3])[0].offsetTop + elemtsearchId_out.querySelectorAll('.'+item.parentElement.classList[3])[0].offsetHeight/2 + line_path;*/
              elemtsearchOut = elemtsearchId_out.querySelectorAll('.'+item.parentElement.classList[3])[0]
              let line_x =  elemtsearchOut.offsetWidth/2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
              let line_y =  elemtsearchOut.offsetHeight/2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
  
              let x = eX;
              let y = eY;
              /*
              var curvature = 0.5;
              var hx1 = line_x + Math.abs(x - line_x) * curvature;
              var hx2 = x - Math.abs(x - line_x) * curvature;
              linecurve += ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;*/
              let lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'open');
              linecurve += lineCurveSearch;
              reoute_fix.push(lineCurveSearch);
  
              // SECOND
              elemtsearchId_out = item;
              elemtsearch = points[i+1];
  
              const eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
              const eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
              const line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
              const line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
              const x = eX;
              const y = eY;
              /*
              var curvature = reroute_curvature;
              var hx1 = line_x + Math.abs(x - line_x) * curvature;
              var hx2 = x - Math.abs(x - line_x) * curvature;
              linecurve += ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;*/
              const lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature, 'other');
              linecurve += lineCurveSearch;
              reoute_fix.push(lineCurveSearch);
  
            } else if (i === (points.length -1)) {
              // console.log("Final");
              elemtsearchId_out = item;
  
              const id_search = item.parentElement.classList[1].replace('node_in_', '');
              elemtsearchId = container.querySelector(`#${id_search}`);
              elemtsearch = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[4])[0]
  
              /*var eX = elemtsearch.offsetWidth/2 + line_path + elemtsearch.parentElement.parentElement.offsetLeft + elemtsearch.offsetLeft;
              var eY = elemtsearch.offsetHeight/2 + line_path + elemtsearch.parentElement.parentElement.offsetTop + elemtsearch.offsetTop;*/
              elemtsearchIn = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[4])[0]
              const eX =  elemtsearchIn.offsetWidth/2 + (elemtsearchIn.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
              const eY =  elemtsearchIn.offsetHeight/2 + (elemtsearchIn.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
              const line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * (precanvas.clientWidth / (precanvas.clientWidth * zoom)) + rerouteWidth;
              const line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * (precanvas.clientHeight / (precanvas.clientHeight * zoom)) + rerouteWidth;
              const x = eX;
              const y = eY;
  
              /*
              var curvature = 0.5;
              var hx1 = line_x + Math.abs(x - line_x) * curvature;
              var hx2 = x - Math.abs(x - line_x) * curvature;
              linecurve += ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;*/
              const lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'close');
              linecurve += lineCurveSearch;
              reoute_fix.push(lineCurveSearch);
  
            } else {
              elemtsearchId_out = item;
              elemtsearch = points[i+1];
  
              const eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * (precanvas.clientWidth / (precanvas.clientWidth * zoom)) + rerouteWidth;
              const eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * (precanvas.clientHeight / (precanvas.clientHeight * zoom)) +rerouteWidth;
              const line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * (precanvas.clientWidth / (precanvas.clientWidth * zoom)) + rerouteWidth;
              const line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * (precanvas.clientHeight / (precanvas.clientHeight * zoom)) + rerouteWidth;
              const x = eX;
              const y = eY;
              /*
              var curvature = reroute_curvature;
              var hx1 = line_x + Math.abs(x - line_x) * curvature;
              var hx2 = x - Math.abs(x - line_x) * curvature;
              linecurve += ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;*/
              const lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature, 'other');
              linecurve += lineCurveSearch;
              reoute_fix.push(lineCurveSearch);
            }
  
          });
          if(reroute_fix_curvature) {
            reoute_fix.forEach((itempath, i) => {
              elemsOut[item].children[i].setAttributeNS(null, 'd', itempath);
            });
  
          } else {
            elemsOut[item].children[0].setAttributeNS(null, 'd', linecurve);
          }
  
        }
      })
  
      const elems = container.querySelectorAll(`.${idSearch}`);
      Object.keys(elems).map(function(item, index) {
        // console.log("In")
		let elemtsearchId_out :any;
		let elemtsearch :any ;
		let elemtsearchId :any ='';
		let elemtsearchOut :any;
		let eX : number;
		let eY :number;
		let x :number;
		let y :number
		let line_x :number;
		let line_y:number
        if(elems[item].querySelector('.point') === null) {
          let elemtsearchId_Iin = container.querySelector(`#${id}`);
  
          const id_search = elems[item].classList[2].replace('node_out_', '');
          elemtsearchId = container.querySelector(`#${id_search}`);
          elemtsearch = elemtsearchId.querySelectorAll('.'+elems[item].classList[3])[0]
  
          /*var line_x = elemtsearch.offsetWidth/2 + line_path + elemtsearch.parentElement.parentElement.offsetLeft + elemtsearch.offsetLeft;
          var line_y = elemtsearch.offsetHeight/2 + line_path + elemtsearch.parentElement.parentElement.offsetTop + elemtsearch.offsetTop;*/
  
        line_x = elemtsearch.offsetWidth/2 + (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
        line_y = elemtsearch.offsetHeight/2 + (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
  
          /*var x = elemtsearchId_in.offsetLeft + elemtsearchId_in.querySelectorAll('.'+elems[item].classList[4])[0].offsetLeft + elemtsearchId_in.querySelectorAll('.'+elems[item].classList[4])[0].offsetWidth/2 + line_path;
          var y = elemtsearchId_in.offsetTop + elemtsearchId_in.querySelectorAll('.'+elems[item].classList[4])[0].offsetTop + elemtsearchId_in.querySelectorAll('.'+elems[item].classList[4])[0].offsetHeight/2 + line_path;*/
          elemtsearchId_in = elemtsearchId_Iin.querySelectorAll('.'+elems[item].classList[4])[0]
         x = elemtsearchId_in.offsetWidth/2 + (elemtsearchId_in.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
           y = elemtsearchId_in.offsetHeight/2 + (elemtsearchId_in.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
  
          /*
          var curvature = 0.5;
          var hx1 = line_x + Math.abs(x - line_x) * curvature;
          var hx2 = x - Math.abs(x - line_x) * curvature;
          // console.log('M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y );
          elems[item].children[0].setAttributeNS(null, 'd', 'M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y );*/
          const lineCurve = createCurvature(line_x, line_y, x, y, curvature, 'openclose');
          elems[item].children[0].setAttributeNS(null, 'd', lineCurve );
  
        } else {
          const points = elems[item].querySelectorAll('.point');
          let linecurve = '';
          const reoute_fix : string []=[];
          points.forEach((item, i) => {
            if(i === 0 && ((points.length -1) === 0)) {
              // M line_x line_y C hx1 line_y hx2 y x y
              let elemtsearchId_out = container.querySelector(`#${id}`);
              let elemtsearch = item;
  
             line_x = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
              line_y = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom +rerouteWidth;
  
              elemtsearchIn = elemtsearchId_out.querySelectorAll('.'+item.parentElement.classList[4])[0]
             eX =  elemtsearchIn.offsetWidth/2 + (elemtsearchIn.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
             eY =  elemtsearchIn.offsetHeight/2 + (elemtsearchIn.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
  
              /*var eX = elemtsearchId_out.offsetLeft + elemtsearchId_out.querySelectorAll('.'+item.parentElement.classList[4])[0].offsetLeft + elemtsearchId_out.querySelectorAll('.'+item.parentElement.classList[4])[0].offsetWidth/2 + line_path;
              var eY = elemtsearchId_out.offsetTop + elemtsearchId_out.querySelectorAll('.'+item.parentElement.classList[4])[0].offsetTop + elemtsearchId_out.querySelectorAll('.'+item.parentElement.classList[4])[0].offsetHeight/2 + line_path;*/
  
              x = eX;
             y = eY;
              /*
              var curvature = 0.5;
              var hx1 = line_x + Math.abs(x - line_x) * curvature;
              var hx2 = x - Math.abs(x - line_x) * curvature;
              linecurve += ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;*/
              let lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'close');
              linecurve += lineCurveSearch;
              reoute_fix.push(lineCurveSearch);
  
              // var elemtsearchId_out = document.getElementById(id);
              elemtsearchId_out = item;
              const id_search = item.parentElement.classList[2].replace('node_out_', '');
              elemtsearchId = container.querySelector(`#${id_search}`);
              elemtsearch = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[3])[0]
  
              /*var line_x = elemtsearch.offsetWidth/2 + line_path + elemtsearch.parentElement.parentElement.offsetLeft + elemtsearch.offsetLeft;
              var line_y = elemtsearch.offsetHeight/2 + line_path + elemtsearch.parentElement.parentElement.offsetTop + elemtsearch.offsetTop;*/
              elemtsearchOut = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[3])[0]
               line_x =  elemtsearchOut.offsetWidth/2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
               line_y =  elemtsearchOut.offsetHeight/2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
  
               eX = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
               eY = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
               x = eX;
               y = eY;
              /*
              var curvature = 0.5;
              var hx1 = line_x + Math.abs(x - line_x) * curvature;
              var hx2 = x - Math.abs(x - line_x) * curvature;
              linecurve += ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;*/
              const lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'open');
              linecurve += lineCurveSearch;
              reoute_fix.push(lineCurveSearch);
  
  
            } else if(i === 0) {
              // M line_x line_y C hx1 line_y hx2 y x y
              // FIRST
              let elemtsearchId_out = item;
              const id_search = item.parentElement.classList[2].replace('node_out_', '');
              elemtsearchId = container.querySelector(`#${id_search}`);
              let elemtsearch = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[3])[0]
  
              /*var line_x = elemtsearch.offsetWidth/2 + line_path + elemtsearch.parentElement.parentElement.offsetLeft + elemtsearch.offsetLeft;
              var line_y = elemtsearch.offsetHeight/2 + line_path + elemtsearch.parentElement.parentElement.offsetTop + elemtsearch.offsetTop;*/
              elemtsearchOut = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[3])[0]
               line_x =  elemtsearchOut.offsetWidth/2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
               line_y =  elemtsearchOut.offsetHeight/2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
  
               eX = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
               eY = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
               x = eX;
               y = eY;
              /*
              var curvature = 0.5;
              var hx1 = line_x + Math.abs(x - line_x) * curvature;
              var hx2 = x - Math.abs(x - line_x) * curvature;
              linecurve += ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;*/
              let lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'open');
              linecurve += lineCurveSearch;
              reoute_fix.push(lineCurveSearch);
  
              // SECOND
              elemtsearchId_out = item;
              elemtsearch = points[i+1];
  
               eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
               eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom +rerouteWidth;
               line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
               line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
               x = eX;
               y = eY;
  
              /*
              var curvature = reroute_curvature;
              var hx1 = line_x + Math.abs(x - line_x) * curvature;
              var hx2 = x - Math.abs(x - line_x) * curvature;
              linecurve += ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;*/
              const lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature, 'other');
              linecurve += lineCurveSearch;
              reoute_fix.push(lineCurveSearch);
  
            } else if (i === (points.length -1)) {
  
              elemtsearchId_out = item;
  
              const id_search = item.parentElement.classList[1].replace('node_in_', '');
              elemtsearchId = container.querySelector(`#${id_search}`);
              elemtsearch = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[4])[0]
  
              /*var eX = elemtsearch.offsetWidth/2 + line_path + elemtsearch.parentElement.parentElement.offsetLeft + elemtsearch.offsetLeft;
              var eY = elemtsearch.offsetHeight/2 + line_path + elemtsearch.parentElement.parentElement.offsetTop + elemtsearch.offsetTop;*/
              elemtsearchIn = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[4])[0]
               eX =  elemtsearchIn.offsetWidth/2 + (elemtsearchIn.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
               eY =  elemtsearchIn.offsetHeight/2 + (elemtsearchIn.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
  
               line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
               line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
               x = eX;
               y = eY;
              /*
              var curvature = 0.5;
              var hx1 = line_x + Math.abs(x - line_x) * curvature;
              var hx2 = x - Math.abs(x - line_x) * curvature;
              linecurve += ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;*/
              const lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'close');
              linecurve += lineCurveSearch;
              reoute_fix.push(lineCurveSearch);
  
            } else {
  
              elemtsearchId_out = item;
              elemtsearch = points[i+1];
  
               eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
               eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom +rerouteWidth;
               line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
               line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
               x = eX;
               y = eY;
              /*
              var curvature = reroute_curvature;
              var hx1 = line_x + Math.abs(x - line_x) * curvature;
              var hx2 = x - Math.abs(x - line_x) * curvature;
              linecurve += ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;
              */
              const lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature, 'other');
              linecurve += lineCurveSearch;
              reoute_fix.push(lineCurveSearch);
            }
  
          });
          if(reroute_fix_curvature) {
            reoute_fix.forEach((itempath, i) => {
              elems[item].children[i].setAttributeNS(null, 'd', itempath);
            });
  
          } else {
            elems[item].children[0].setAttributeNS(null, 'd', linecurve);
          }
  
        }
      })
    }
  
    dblclick(e:any) {
      if(this.connection_selected != null && this.reroute) {
          this.createReroutePoint(this.connection_selected);
      }
  
      if(e.target.classList[0] === 'point') {
          this.removeReroutePoint(e.target);
      }
    }
  
    createReroutePoint(ele:any) {
        this.connection_selected.classList.remove("selected");
        const nodeUpdate = this.connection_selected.parentElement.classList[2].slice(9);
        const nodeUpdateIn = this.connection_selected.parentElement.classList[1].slice(13);
        const output_class = this.connection_selected.parentElement.classList[3];
        const input_class = this.connection_selected.parentElement.classList[4];
        this.connection_selected = null;
        const point = document.createElementNS('http://www.w3.org/2000/svg',"circle");
        point.classList.add("point");
        const pos_x = this.pos_x * ( this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom)) - (this.precanvas.getBoundingClientRect().x * ( this.precanvas.clientWidth / (this.precanvas.clientWidth * this.zoom)));
        const pos_y = this.pos_y * ( this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom)) - (this.precanvas.getBoundingClientRect().y * ( this.precanvas.clientHeight / (this.precanvas.clientHeight * this.zoom)));
  
        point.setAttributeNS(null, 'cx', pos_x);
        point.setAttributeNS(null, 'cy', pos_y);
        point.setAttributeNS(null, 'r', this.reroute_width);
  
        let position_add_array_point = 0;
        if(this.reroute_fix_curvature) {
  
          const numberPoints = ele.parentElement.querySelectorAll(".main-path").length;
          const path = document.createElementNS('http://www.w3.org/2000/svg',"path");
          path.classList.add("main-path");
          path.setAttributeNS(null, 'd', '');
  
          ele.parentElement.insertBefore(path, ele.parentElement.children[numberPoints]);
          if(numberPoints === 1) {
            ele.parentElement.appendChild(point);
          }  else {
            const search_point = Array.from(ele.parentElement.children).indexOf(ele)
            position_add_array_point = search_point;
            ele.parentElement.insertBefore(point, ele.parentElement.children[search_point+numberPoints+1]);
          }
  
  
  
        } else {
          ele.parentElement.appendChild(point);
        }
  
  
  
        const nodeId = nodeUpdate.slice(5);
        const searchConnection = this.drawflow.drawflow[this.moduleName].data[nodeId].outputs[output_class].connections.findIndex(function(item,i) {
          return item.node ===  nodeUpdateIn && item.output === input_class;
        });
  
        if(this.drawflow.drawflow[this.moduleName].data[nodeId].outputs[output_class].connections[searchConnection].points === undefined)  {
          this.drawflow.drawflow[this.moduleName].data[nodeId].outputs[output_class].connections[searchConnection].points = [];
        }
        // this.drawflow.drawflow[this.moduleName].data[nodeId].outputs[output_class].connections[searchConnection].points.push({ pos_x: pos_x, pos_y: pos_y });
  
  
        if(this.reroute_fix_curvature) {
          // console.log(position_add_array_point)
          if(position_add_array_point > 0) {
            this.drawflow.drawflow[this.moduleName].data[nodeId].outputs[output_class].connections[searchConnection].points.splice(position_add_array_point, 0, { pos_x, pos_y });
          } else {
            this.drawflow.drawflow[this.moduleName].data[nodeId].outputs[output_class].connections[searchConnection].points.push({ pos_x, pos_y });
          }
  
          ele.parentElement.querySelectorAll(".main-path").forEach((item, i) => {
            item.classList.remove("selected");
          });
  
        } else {
          this.drawflow.drawflow[this.moduleName].data[nodeId].outputs[output_class].connections[searchConnection].points.push({ pos_x, pos_y });
        }
  
  
  
  
  
  
        /*
        this.drawflow.drawflow[this.moduleName].data[nodeId].outputs[output_class].connections[searchConnection].points.sort((a,b) => (a.pos_x > b.pos_x) ? 1 : (b.pos_x > a.pos_x ) ? -1 : 0 );
        this.drawflow.drawflow[this.moduleName].data[nodeId].outputs[output_class].connections[searchConnection].points.forEach((item, i) => {
  
            ele.parentElement.children[i+1].setAttributeNS(null, 'cx', item.pos_x);
            ele.parentElement.children[i+1].setAttributeNS(null, 'cy', item.pos_y);
        });*/
  
        this.dispatch('addReroute', nodeId);
        this.updateConnectionNodes(nodeUpdate);
    }
  
    removeReroutePoint(ele:any) {
      const nodeUpdate = ele.parentElement.classList[2].slice(9)
      const nodeUpdateIn = ele.parentElement.classList[1].slice(13);
      const output_class = ele.parentElement.classList[3];
      const input_class = ele.parentElement.classList[4];
  
  
      let numberPointPosition = Array.from(ele.parentElement.children).indexOf(ele)-1;
  
      const nodeId = nodeUpdate.slice(5);
      const searchConnection = this.drawflow.drawflow[this.moduleName].data[nodeId].outputs[output_class].connections.findIndex(function(item,i) {
        return item.node ===  nodeUpdateIn && item.output === input_class;
      });
  
      if(this.reroute_fix_curvature) {
  
         const numberMainPath = ele.parentElement.querySelectorAll(".main-path").length
         ele.parentElement.children[numberMainPath-1].remove();
         numberPointPosition -= numberMainPath;
         if(numberPointPosition < 0) {
           numberPointPosition = 0;
         }
      }
      // console.log(numberPointPosition);
      this.drawflow.drawflow[this.moduleName].data[nodeId].outputs[output_class].connections[searchConnection].points.splice(numberPointPosition,1);
  
      ele.remove();
      this.dispatch('removeReroute', nodeId);
      this.updateConnectionNodes(nodeUpdate);
  
    }
    /**
     *
     * @param name Name of module registered.
     * @param html HTML to drawn or vue component.
     * @param props Only for vue. Props of component. Not Required
     * @param options Only for vue. Options of component. Not Required
     */
    registerNode(name: string, html: any, props: any, options: any): void {
      this.noderegister[name] = {html, props, options};
    }
    /**
     * Get Info of node. Ex: id: 5
     * @param id
     */
    getNodeFromId(id: string | number): DrawflowNode {
      const moduleName = this.getModuleFromNodeId(id)
      return JSON.parse(JSON.stringify(this.drawflow.drawflow[moduleName].data[id]));
    }
    /**
     *  Return Array of nodes id. Ex: name: telegram
     *  @param name
    */
    getNodesFromName(name: string): any[] {
      const nodes: any[] = [];
      const editor = this.drawflow.drawflow
      Object.keys(editor).map(function(moduleName, index) {
        for (const node in editor[moduleName].data) {
          if(editor[moduleName].data[node].name == name) {
            nodes.push(editor[moduleName].data[node].id);
          }
        }
      });
      return nodes;
    }
    /**
     *
     * @param name Name of module
     * @param num_in Number of inputs
     * @param num_out Number of outputs
     * @param ele_pos_x Position on start node left
     * @param ele_pos_y Position on start node top
     * @param className Added classname to de node
     * @param data Data passed to node
     * @param html HTML drawn on node or name of register node.
     * @param typenode Default false, true for Object HTML, vue for vue
    */
    addNode (name: string, num_in: number, num_out: number, ele_pos_x: number, ele_pos_y: number,
      className: string, data: any, html: string, typenode: boolean | string): number {	
		let newNodeId : number|string = 0;
      if (this.useuuid) {
        newNodeId = this.getUuid();
      } else {
        newNodeId = this.nodeId;
      }
      const parent = document.createElement('div');
      parent.classList.add("parent-node");
  
      const node = document.createElement('div');
      node.innerHTML = "";
      node.setAttribute("id", "node-"+newNodeId);
      node.classList.add("drawflow-node");
      if(className != '') {
        node.classList.add(className);
      }
  
  
      const inputs = document.createElement('div');
      inputs.classList.add("inputs");
  
      const outputs = document.createElement('div');
      outputs.classList.add("outputs");
  
  
	  const json_inputs: Record<string | number, any> = {};
      for(let x = 0; x < num_in; x++) {
        const input = document.createElement('div');
        input.classList.add("input");
        input.classList.add("input_"+(x+1));
        json_inputs["input_"+(x+1)] = { "connections": []};
        inputs.appendChild(input);
      }
  
      const json_outputs : Record<string | number, any> = {};
      for(let x = 0; x < num_out; x++) {
        const output = document.createElement('div');
        output.classList.add("output");
        output.classList.add("output_"+(x+1));
        json_outputs["output_"+(x+1)] = { "connections": []};
        outputs.appendChild(output);
      }
  
      const content = document.createElement('div');
      content.classList.add("drawflow_content_node");
      if(typenode === false) {
        content.innerHTML = html;
      } else if (typenode === true) {
        content.appendChild(this.noderegister[html].html.cloneNode(true));
      } else {
        if(parseInt(this.render.version) === 3 ) {
          // Vue 3
          const wrapper = this.render.createApp({
            render: h => this.render.h(this.noderegister[html].html, this.noderegister[html].props, this.noderegister[html].options)
          }).mount(content)
        } else {
          // Vue 2
          const wrapper = new this.render({
            render: h => h(this.noderegister[html].html, { props: this.noderegister[html].props }),
            ...this.noderegister[html].options
          }).$mount()
          //
          content.appendChild(wrapper.$el);
        }
      }
  
      Object.entries(data).forEach(function (key, value) {
        if(typeof key[1] === "object") {
          insertObjectkeys(null, key[0], key[0]);
        } else {
          const elems = content.querySelectorAll('[df-'+key[0]+']');
            for(let i = 0; i < elems.length; i++) {
              elems[i].value = key[1];
            }
        }
      })
  
      function insertObjectkeys(object, name, completname) {
        if(object === null) {
          const object = data[name];
        } else {
          const object = object[name]
        }
        if(object !== null) {
          Object.entries(object).forEach(function (key, value) {
            if(typeof key[1] === "object") {
              insertObjectkeys(object, key[0], name+'-'+key[0]);
            } else {
              const elems = content.querySelectorAll('[df-'+completname+'-'+key[0]+']');
                for(let i = 0; i < elems.length; i++) {
                  elems[i].value = key[1];
                }
            }
          });
        }
      }
      node.appendChild(inputs);
      node.appendChild(content);
      node.appendChild(outputs);
      node.style.top = ele_pos_y + "px";
      node.style.left = ele_pos_x + "px";
      parent.appendChild(node);
      this.precanvas.appendChild(parent);
      const json = {
        id: newNodeId,
        name,
        data,
        class: classoverride,
        html,
        typenode,
        inputs: json_inputs,
        outputs: json_outputs,
        pos_x: ele_pos_x,
        pos_y: ele_pos_y,
      }
      this.drawflow.drawflow[this.moduleName].data[newNodeId] = json;
      this.dispatch('nodeCreated', newNodeId);
      if (!this.useuuid) { 
        this.nodeId++;
      }
      return newNodeId;
    }
  
    addNodeImport (dataNode, precanvas) {
      const parent = document.createElement('div');
      parent.classList.add("parent-node");
  
      const node = document.createElement('div');
      node.innerHTML = "";
      node.setAttribute("id", "node-"+dataNode.id);
      node.classList.add("drawflow-node");
      if(dataNode.class != '') {
        node.classList.add(dataNode.class);
      }
  
      const inputs = document.createElement('div');
      inputs.classList.add("inputs");
  
      const outputs = document.createElement('div');
      outputs.classList.add("outputs");
  
      Object.keys(dataNode.inputs).map(function(input_item, index) {
        const input = document.createElement('div');
        input.classList.add("input");
        input.classList.add(input_item);
        inputs.appendChild(input);
        Object.keys(dataNode.inputs[input_item].connections).map(function(output_item, index) {
  
          const connection = document.createElementNS('http://www.w3.org/2000/svg',"svg");
          const path = document.createElementNS('http://www.w3.org/2000/svg',"path");
          path.classList.add("main-path");
          path.setAttributeNS(null, 'd', '');
          // path.innerHTML = 'a';
          connection.classList.add("connection");
          connection.classList.add("node_in_node-"+dataNode.id);
          connection.classList.add("node_out_node-"+dataNode.inputs[input_item].connections[output_item].node);
          connection.classList.add(dataNode.inputs[input_item].connections[output_item].input);
          connection.classList.add(input_item);
  
          connection.appendChild(path);
          precanvas.appendChild(connection);
  
        });
      });
  
  
      for(let x = 0; x < Object.keys(dataNode.outputs).length; x++) {
        const output = document.createElement('div');
        output.classList.add("output");
        output.classList.add("output_"+(x+1));
        outputs.appendChild(output);
      }
  
      const content = document.createElement('div');
      content.classList.add("drawflow_content_node");
      // content.innerHTML = dataNode.html;
  
      if(dataNode.typenode === false) {
        content.innerHTML = dataNode.html;
      } else if (dataNode.typenode === true) {
        content.appendChild(this.noderegister[dataNode.html].html.cloneNode(true));
      } else {
        if(parseInt(this.render.version) === 3 ) {
          // Vue 3
          const wrapper = this.render.createApp({
            render: h => this.render.h(this.noderegister[dataNode.html].html, this.noderegister[dataNode.html].props, this.noderegister[dataNode.html].options)
          }).mount(content)
        } else {
          // Vue 2
          const wrapper = new this.render({
            render: h => h(this.noderegister[dataNode.html].html, { props: this.noderegister[dataNode.html].props }),
            ...this.noderegister[dataNode.html].options
          }).$mount()
          content.appendChild(wrapper.$el);
        }
      }
  
  
  
      Object.entries(dataNode.data).forEach(function (key, value) {
        if(typeof key[1] === "object") {
          insertObjectkeys(null, key[0], key[0]);
        } else {
          const elems = content.querySelectorAll('[df-'+key[0]+']');
            for(let i = 0; i < elems.length; i++) {
              elems[i].value = key[1];
            }
        }
      })
  
      function insertObjectkeys(object, name, completname) {
        if(object === null) {
          const object = dataNode.data[name];
        } else {
          const object = object[name]
        }
        if(object !== null) {
          Object.entries(object).forEach(function (key, value) {
            if(typeof key[1] === "object") {
              insertObjectkeys(object, key[0], name+'-'+key[0]);
            } else {
              const elems = content.querySelectorAll('[df-'+completname+'-'+key[0]+']');
                for(let i = 0; i < elems.length; i++) {
                  elems[i].value = key[1];
                }
            }
          });
        }
      }
      node.appendChild(inputs);
      node.appendChild(content);
      node.appendChild(outputs);
      node.style.top = dataNode.pos_y + "px";
      node.style.left = dataNode.pos_x + "px";
      parent.appendChild(node);
      this.precanvas.appendChild(parent);
    }
  
    addRerouteImport(dataNode) {
      const reroute_width = this.reroute_width
      const reroute_fix_curvature = this.reroute_fix_curvature
  
      Object.keys(dataNode.outputs).map(function(output_item, index) {
        Object.keys(dataNode.outputs[output_item].connections).map(function(input_item, index) {
          const points = dataNode.outputs[output_item].connections[input_item].points
          if(points !== undefined) {
  
            points.forEach((item, i) => {
              const input_id = dataNode.outputs[output_item].connections[input_item].node;
              const input_class = dataNode.outputs[output_item].connections[input_item].output;
              // console.log('.connection.node_in_'+input_id+'.node_out_'+dataNode.id+'.'+output_item+'.'+input_class);
              const ele = document.querySelector('.connection.node_in_node-'+input_id+'.node_out_node-'+dataNode.id+'.'+output_item+'.'+input_class);
  
              if(reroute_fix_curvature) {
                if(i === 0) {
                  for (let z = 0; z < points.length; z++) {
                    const path = document.createElementNS('http://www.w3.org/2000/svg',"path");
                    path.classList.add("main-path");
                    path.setAttributeNS(null, 'd', '');
                    ele.appendChild(path);
  
                  }
                }
              }
  
  
              const point = document.createElementNS('http://www.w3.org/2000/svg',"circle");
              point.classList.add("point");
              const pos_x = item.pos_x;
              const pos_y = item.pos_y;
  
              point.setAttributeNS(null, 'cx', pos_x);
              point.setAttributeNS(null, 'cy', pos_y);
              point.setAttributeNS(null, 'r', reroute_width);
  
              ele.appendChild(point);
  
            });
          };
        });
      });
    }
  
    updateNodeValue(event) {
      const attr = event.target.attributes
      for(let i= 0; i < attr.length; i++) {
        if(attr[i].nodeName.startsWith('df-')) {
          this.drawflow.drawflow[this.moduleName].data[event.target.closest(".drawflow_content_node").parentElement.id.slice(5)].data[attr[i].nodeName.slice(3)] = event.target.value;
        }
  
      }
    }
    /**
     * Update data element. Ex: 5, { name: 'Drawflow' }
     * @param id
    */
    updateNodeDataFromId(id: string | number, data) : void{
      const moduleName = this.getModuleFromNodeId(id)
      this.drawflow.drawflow[moduleName].data[id].data = data;
      if(this.moduleName === moduleName) {
        const content = document.querySelector('#node-'+id);
  
        Object.entries(data).forEach(function (key, value) {
          if(typeof key[1] === "object") {
            insertObjectkeys(null, key[0], key[0]);
          } else {
            const elems = content.querySelectorAll('[df-'+key[0]+']');
              for(let i = 0; i < elems.length; i++) {
                elems[i].value = key[1];
              }
          }
        })
  
        function insertObjectkeys(object, name, completname) {
          if(object === null) {
            const object = data[name];
          } else {
            const object = object[name]
          }
          if(object !== null) {
            Object.entries(object).forEach(function (key, value) {
              if(typeof key[1] === "object") {
                insertObjectkeys(object, key[0], name+'-'+key[0]);
              } else {
                const elems = content.querySelectorAll('[df-'+completname+'-'+key[0]+']');
                  for(let i = 0; i < elems.length; i++) {
                    elems[i].value = key[1];
                  }
              }
            });
          }
        }
  
      }
    }
    /**
     * Add input to node. Ex id: 5
     * @param id
     */
    addNodeInput(id: string | number): void {
      const moduleName = this.getModuleFromNodeId(id)
      const infoNode = this.getNodeFromId(id)
      const numInputs = Object.keys(infoNode.inputs).length;
      if(this.moduleName === moduleName) {
        // Draw input
        const input = document.createElement('div');
        input.classList.add("input");
        input.classList.add("input_"+(numInputs+1));
        const parent = document.querySelector('#node-'+id+' .inputs');
        parent.appendChild(input);
        this.updateConnectionNodes('node-'+id);
  
      }
      this.drawflow.drawflow[moduleName].data[id].inputs["input_"+(numInputs+1)] = { "connections": []};
    }
  
    /**
     * Add output to node. Ex id: 5
     * @param id
     */
     addNodeOutput(id: string | number): void{
      const moduleName = this.getModuleFromNodeId(id)
      const infoNode = this.getNodeFromId(id)
      const numOutputs = Object.keys(infoNode.outputs).length;
      if(this.moduleName === moduleName) {
        // Draw output
        const output = document.createElement('div');
        output.classList.add("output");
        output.classList.add("output_"+(numOutputs+1));
        const parent = document.querySelector('#node-'+id+' .outputs');
        parent.appendChild(output);
        this.updateConnectionNodes('node-'+id);
  
      }
      this.drawflow.drawflow[moduleName].data[id].outputs["output_"+(numOutputs+1)] = { "connections": []};
    }
  
    /**
     * Remove input to node. Ex id: 5, input_2
     * @param id
     * @param input_class
     */
     removeNodeInput(id: string | number, input_class: string): void{
      const moduleName = this.getModuleFromNodeId(id)
      const infoNode = this.getNodeFromId(id)
      if(this.moduleName === moduleName) {
        document.querySelector('#node-'+id+' .inputs .input.'+input_class).remove();
      }
      const removeInputs = [];
      Object.keys(infoNode.inputs[input_class].connections).map(function(key, index) {
        const id_output = infoNode.inputs[input_class].connections[index].node;
        const output_class = infoNode.inputs[input_class].connections[index].input;
        removeInputs.push({id_output, id, output_class, input_class})
      })
      // Remove connections
      removeInputs.forEach((item, i) => {
        this.removeSingleConnection(item.id_output, item.id, item.output_class, item.input_class);
      });
  
      delete this.drawflow.drawflow[moduleName].data[id].inputs[input_class];
  
      // Update connection
      const connections = [];
      const connectionsInputs = this.drawflow.drawflow[moduleName].data[id].inputs
      Object.keys(connectionsInputs).map(function(key, index) {
        connections.push(connectionsInputs[key]);
      });
      this.drawflow.drawflow[moduleName].data[id].inputs = {};
      const input_class_id = input_class.slice(6);
      let nodeUpdates = [];
      connections.forEach((item, i) => {
        item.connections.forEach((itemx, f) => {
          nodeUpdates.push(itemx);
        });
        this.drawflow.drawflow[moduleName].data[id].inputs['input_'+ (i+1)] = item;
      });
      nodeUpdates =  new Set(nodeUpdates.map(e => JSON.stringify(e)));
      nodeUpdates = Array.from(nodeUpdates).map(e => JSON.parse(e));
  
      if(this.moduleName === moduleName) {
        const eles = document.querySelectorAll("#node-"+id +" .inputs .input");
        eles.forEach((item, i) => {
          const id_class = item.classList[1].slice(6);
          if(parseInt(input_class_id) < parseInt(id_class)) {
            item.classList.remove('input_'+id_class);
            item.classList.add('input_'+(id_class-1));
          }
        });
  
      }
  
      nodeUpdates.forEach((itemx, i) => {
        this.drawflow.drawflow[moduleName].data[itemx.node].outputs[itemx.input].connections.forEach((itemz, g) => {
            if(itemz.node == id) {
              const output_id = itemz.output.slice(6);
              if(parseInt(input_class_id) < parseInt(output_id)) {
                if(this.moduleName === moduleName) {
                  const ele = document.querySelector(".connection.node_in_node-"+id+".node_out_node-"+itemx.node+"."+itemx.input+".input_"+output_id);
                  ele.classList.remove('input_'+output_id);
                  ele.classList.add('input_'+(output_id-1));
                }
                if(itemz.points) {
                    this.drawflow.drawflow[moduleName].data[itemx.node].outputs[itemx.input].connections[g] = { node: itemz.node, output: 'input_'+(output_id-1), points: itemz.points }
                } else {
                    this.drawflow.drawflow[moduleName].data[itemx.node].outputs[itemx.input].connections[g] = { node: itemz.node, output: 'input_'+(output_id-1)}
                }
              }
            }
        });
      });
      this.updateConnectionNodes('node-'+id);
    }
  
    /**
     * Remove output to node. Ex id: 5, output_2
     * @param id
     * @param output_class
     */
     removeNodeOutput(id: string | number, output_class: string): void{
      const moduleName = this.getModuleFromNodeId(id)
      const infoNode = this.getNodeFromId(id)
      if(this.moduleName === moduleName) {
        document.querySelector('#node-'+id+' .outputs .output.'+output_class).remove();
      }
      const removeOutputs = [];
      Object.keys(infoNode.outputs[output_class].connections).map(function(key, index) {
        const id_input = infoNode.outputs[output_class].connections[index].node;
        const input_class = infoNode.outputs[output_class].connections[index].output;
        removeOutputs.push({id, id_input, output_class, input_class})
      })
      // Remove connections
      removeOutputs.forEach((item, i) => {
        this.removeSingleConnection(item.id, item.id_input, item.output_class, item.input_class);
      });
  
      delete this.drawflow.drawflow[moduleName].data[id].outputs[output_class];
  
      // Update connection
      const connections = [];
      const connectionsOuputs = this.drawflow.drawflow[moduleName].data[id].outputs
      Object.keys(connectionsOuputs).map(function(key, index) {
        connections.push(connectionsOuputs[key]);
      });
      this.drawflow.drawflow[moduleName].data[id].outputs = {};
      const output_class_id = output_class.slice(7);
      let nodeUpdates = [];
      connections.forEach((item, i) => {
        item.connections.forEach((itemx, f) => {
          nodeUpdates.push({ node: itemx.node, output: itemx.output });
        });
        this.drawflow.drawflow[moduleName].data[id].outputs['output_'+ (i+1)] = item;
      });
      nodeUpdates =  new Set(nodeUpdates.map(e => JSON.stringify(e)));
      nodeUpdates = Array.from(nodeUpdates).map(e => JSON.parse(e));
  
      if(this.moduleName === moduleName) {
        const eles = document.querySelectorAll("#node-"+id +" .outputs .output");
        eles.forEach((item, i) => {
          const id_class = item.classList[1].slice(7);
          if(parseInt(output_class_id) < parseInt(id_class)) {
            item.classList.remove('output_'+id_class);
            item.classList.add('output_'+(id_class-1));
          }
        });
  
      }
  
      nodeUpdates.forEach((itemx, i) => {
        this.drawflow.drawflow[moduleName].data[itemx.node].inputs[itemx.output].connections.forEach((itemz, g) => {
            if(itemz.node == id) {
              const input_id = itemz.input.slice(7);
              if(parseInt(output_class_id) < parseInt(input_id)) {
                if(this.moduleName === moduleName) {
  
                  const ele = document.querySelector(".connection.node_in_node-"+itemx.node+".node_out_node-"+id+".output_"+input_id+"."+itemx.output);
                  ele.classList.remove('output_'+input_id);
                  ele.classList.remove(itemx.output);
                  ele.classList.add('output_'+(input_id-1));
                  ele.classList.add(itemx.output);
                }
                if(itemz.points) {
                    this.drawflow.drawflow[moduleName].data[itemx.node].inputs[itemx.output].connections[g] = { node: itemz.node, input: 'output_'+(input_id-1), points: itemz.points }
                } else {
                    this.drawflow.drawflow[moduleName].data[itemx.node].inputs[itemx.output].connections[g] = { node: itemz.node, input: 'output_'+(input_id-1)}
                }
              }
            }
        });
      });
  
      this.updateConnectionNodes('node-'+id);
    }
    /**
     * Remove node. Ex id: node-x
     * @param id
     */
     removeNodeId(id: string | number): void {
      this.removeConnectionNodeId(id);
      const moduleName = this.getModuleFromNodeId(id.slice(5))
      if(this.moduleName === moduleName) {
        this.container.querySelector(`#${id}`).remove();
      }
      delete this.drawflow.drawflow[moduleName].data[id.slice(5)];
      this.dispatch('nodeRemoved', id.slice(5));
    }
  
    removeConnection() {
      if(this.connection_selected != null) {
        const listclass = this.connection_selected.parentElement.classList;
        this.connection_selected.parentElement.remove();
        // console.log(listclass);
        const index_out = this.drawflow.drawflow[this.moduleName].data[listclass[2].slice(14)].outputs[listclass[3]].connections.findIndex(function(item,i) {
          return item.node === listclass[1].slice(13) && item.output === listclass[4]
        });
        this.drawflow.drawflow[this.moduleName].data[listclass[2].slice(14)].outputs[listclass[3]].connections.splice(index_out,1);
  
        const index_in = this.drawflow.drawflow[this.moduleName].data[listclass[1].slice(13)].inputs[listclass[4]].connections.findIndex(function(item,i) {
          return item.node === listclass[2].slice(14) && item.input === listclass[3]
        });
        this.drawflow.drawflow[this.moduleName].data[listclass[1].slice(13)].inputs[listclass[4]].connections.splice(index_in,1);
        this.dispatch('connectionRemoved', { output_id: listclass[2].slice(14), input_id: listclass[1].slice(13), output_class: listclass[3], input_class: listclass[4] } );
        this.connection_selected = null;
      }
    }
    /**
     * Remove connection. Ex: 15,16,'output_1','input_1'
     * @param id_output
     * @param id_input
     * @param output_class
     * @param input_class
     */
     removeSingleConnection(id_output: string | number, id_input: string | number,
      output_class: string, input_class: string): boolean{
      const nodeOneModule = this.getModuleFromNodeId(id_output);
      const nodeTwoModule = this.getModuleFromNodeId(id_input);
      if(nodeOneModule === nodeTwoModule) {
        // Check nodes in same module.
  
        // Check connection exist
        const exists = this.drawflow.drawflow[nodeOneModule].data[id_output].outputs[output_class].connections.findIndex(function(item,i) {
          return item.node == id_input && item.output === input_class
        });
        if(exists > -1) {
  
          if(this.moduleName === nodeOneModule) {
            // In same module with view.
            document.querySelector('.connection.node_in_node-'+id_input+'.node_out_node-'+id_output+'.'+output_class+'.'+input_class).remove();
          }
  
          const index_out = this.drawflow.drawflow[nodeOneModule].data[id_output].outputs[output_class].connections.findIndex(function(item,i) {
            return item.node == id_input && item.output === input_class
          });
          this.drawflow.drawflow[nodeOneModule].data[id_output].outputs[output_class].connections.splice(index_out,1);
  
          const index_in = this.drawflow.drawflow[nodeOneModule].data[id_input].inputs[input_class].connections.findIndex(function(item,i) {
            return item.node == id_output && item.input === output_class
          });
          this.drawflow.drawflow[nodeOneModule].data[id_input].inputs[input_class].connections.splice(index_in,1);
  
          this.dispatch('connectionRemoved', { output_id: id_output, input_id: id_input, output_class, input_class});
          return true;
  
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  
    /**
     * Remove node connections. Ex id: node-x
     * @param id
     */
     removeConnectionNodeId(id: string | number): void{
      const idSearchIn = 'node_in_'+id;
      const idSearchOut = 'node_out_'+id;
  
      const elemsOut = this.container.querySelectorAll(`.${idSearchOut}`);
      for(let i = elemsOut.length-1; i >= 0; i--) {
        const listclass = elemsOut[i].classList;
  
        const index_in = this.drawflow.drawflow[this.moduleName].data[listclass[1].slice(13)].inputs[listclass[4]].connections.findIndex(function(item,i) {
          return item.node === listclass[2].slice(14) && item.input === listclass[3]
        });
        this.drawflow.drawflow[this.moduleName].data[listclass[1].slice(13)].inputs[listclass[4]].connections.splice(index_in,1);
  
        const index_out = this.drawflow.drawflow[this.moduleName].data[listclass[2].slice(14)].outputs[listclass[3]].connections.findIndex(function(item,i) {
          return item.node === listclass[1].slice(13) && item.output === listclass[4]
        });
        this.drawflow.drawflow[this.moduleName].data[listclass[2].slice(14)].outputs[listclass[3]].connections.splice(index_out,1);
  
        elemsOut[i].remove();
  
        this.dispatch('connectionRemoved', { output_id: listclass[2].slice(14), input_id: listclass[1].slice(13), output_class: listclass[3], input_class: listclass[4] } );
      }
  
      const elemsIn = this.container.querySelectorAll(`.${idSearchIn}`);
      for(let i = elemsIn.length-1; i >= 0; i--) {
  
        const listclass = elemsIn[i].classList;
  
        const index_out = this.drawflow.drawflow[this.moduleName].data[listclass[2].slice(14)].outputs[listclass[3]].connections.findIndex(function(item,i) {
          return item.node === listclass[1].slice(13) && item.output === listclass[4]
        });
        this.drawflow.drawflow[this.moduleName].data[listclass[2].slice(14)].outputs[listclass[3]].connections.splice(index_out,1);
  
        const index_in = this.drawflow.drawflow[this.moduleName].data[listclass[1].slice(13)].inputs[listclass[4]].connections.findIndex(function(item,i) {
          return item.node === listclass[2].slice(14) && item.input === listclass[3]
        });
        this.drawflow.drawflow[this.moduleName].data[listclass[1].slice(13)].inputs[listclass[4]].connections.splice(index_in,1);
  
        elemsIn[i].remove();
  
        this.dispatch('connectionRemoved', { output_id: listclass[2].slice(14), input_id: listclass[1].slice(13), output_class: listclass[3], input_class: listclass[4] } );
      }
    }
  
    /**
     * Get name of module where is the id. Ex id: 5
     * @param id
     */
     getModuleFromNodeId(id: string | number): string {
      let nameModule:string;
      const editor = this.drawflow.drawflow
      Object.keys(editor).map(function(moduleName, index) {
        Object.keys(editor[moduleName].data).map(function(node, index2) {
          if(node == id) {
            nameModule = moduleName;
          }
        })
      });
      return nameModule;
    }
  
    addModule(name: string): void {
      this.drawflow.drawflow[name] =  { "data": {} };
      this.dispatch('moduleCreated', name);
    }
    changeModule(name: string): void {
      this.dispatch('moduleChanged', name);
      this.moduleName = name;
      this.precanvas.innerHTML = "";
      this.canvas_x = 0;
      this.canvas_y = 0;
      this.pos_x = 0;
      this.pos_y = 0;
      this.mouse_x = 0;
      this.mouse_y = 0;
      this.zoom = 1;
      this.zoom_last_value = 1;
      this.precanvas.style.transform = '';
      this.import(this.drawflow);
    }
  
    removeModule(name) {
      if(this.moduleName === name) {
        this.changeModule('Home');
      }
      delete this.drawflow.drawflow[name];
      this.dispatch('moduleRemoved', name);
    }
  
    clearModuleSelected(): void {
      this.precanvas.innerHTML = "";
      this.drawflow.drawflow[this.moduleName] =  { "data": {} };
    }
  
    clear () :void{
      this.precanvas.innerHTML = "";
      this.drawflow = { "drawflow": { "Home": { "data": {} }}};
    }
    export () {
      const dataExport = JSON.parse(JSON.stringify(this.drawflow));
      this.dispatch('export', dataExport);
      return dataExport;
    }
  
    import (data) {
      this.clear();
      this.drawflow = JSON.parse(JSON.stringify(data));
      this.load();
      this.dispatch('import', 'import');
    }
  
    /* Events */
    on (event:any, callback:any) {
         // Check if the callback is not a function
         if (typeof callback !== 'function') {
             console.error(`The listener callback must be a function, the given type is ${typeof callback}`);
             return false;
         }
  
  
         // Check if the event is not a string
         if (typeof event !== 'string') {
             console.error(`The event name must be a string, the given type is ${typeof event}`);
             return false;
         }
  
         // Check if this event not exists
         if (this.events[event] === undefined) {
             this.events[event] = {
                 listeners: []
             }
         }
  
         this.events[event].listeners.push(callback);
     }
  
     removeListener (event, callback) {
         // Check if this event not exists
         if (this.events[event] === undefined) {
             // console.error(`This event: ${event} does not exist`);
             return false;
         }
  
       this.events[event].listeners = this.events[event].listeners.filter(listener => {
           return listener.toString() !== callback.toString();
       });
     }
  
     dispatch (event, details) {
         // Check if this event not exists
         if (this.events[event] === undefined) {
             // console.error(`This event: ${event} does not exist`);
             return false;
         }
  
         this.events[event].listeners.forEach((listener) => {
             listener(details);
         });
     }
     
      getUuid() {
          // http://www.ietf.org/rfc/rfc4122.txt
          const s = [];
          const hexDigits = "0123456789abcdef";
          for (let i = 0; i < 36; i++) {
              s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
          }
          s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
          s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
          s[8] = s[13] = s[18] = s[23] = "-";
  
          const uuid = s.join("");
          return uuid;
      }
      
}