import {ConnectionStartEvent, ConnectionEvent, MousePositionEvent} from './otherinter'
export class Drawflow {
    /**
     *
     * @param eventName
     * @param callback (event: id of Node)
     */
    on(eventName: 'nodeCreated', callback: (event: number) => void): void;
    /**
     *
     * @param eventName
     * @param callback (event: id of Node)
     */
    on(eventName: 'nodeRemoved', callback: (event: number) => void): void;
    /**
     *
     * @param eventName
     * @param callback (event: id of Node)
     */
    on(eventName: 'nodeSelected', callback: (event: number) => void): void;
    /**
     *
     * @param eventName
     * @param callback (event: true)
     */
    on(eventName: 'nodeUnselected', callback: (event: boolean) => void): void;
    /**
     *
     * @param eventName
     * @param callback
     */
    on(eventName: 'nodeMoved', callback: (event: any) => void): void;
    /**
     * Called when starting to create a connection
     * @param eventName
     * @param callback
     */
    on(eventName: 'connectionStart', callback: (event: ConnectionStartEvent) => void): void;
    /**
     * Called when the connection creation was canceled
     * @param eventName
     * @param callback (event: true)
     */
    on(eventName: 'connectionCancel', callback: (event: boolean) => void): void;
    /**
     *
     * @param eventName
     * @param callback (event: id's of nodes and output/input selected)
     */
    on(eventName: 'connectionCreated', callback: (event: ConnectionEvent) => void): void;
    /**
     *
     * @param eventName
     * @param callback (event: id's of nodes and output/input selected)
     */
    on(eventName: 'connectionRemoved', callback: (event: ConnectionEvent) => void): void;
    /**
     *
     * @param eventName
     * @param callback (event: id's of nodes and output/input selected)
     */
    on(eventName: 'connectionSelected', callback: (event: ConnectionEvent) => void): void;
    /**
     *
     * @param eventName
     * @param callback (event: true)
     */
    on(eventName: 'connectionUnselected', callback: (event: boolean) => void): void;
    /**
     *
     * @param eventName
     * @param callback (event: id of Node output)
     */
    on(eventName: 'addReroute', callback: (event: number) => void): void;
    /**
     *
     * @param eventName
     * @param callback (event: id of Node output)
     */
    on(eventName: 'removeReroute', callback: (event: number) => void): void;
    /**
     *
     * @param eventName
     * @param callback (event: name of Module)
     */
    on(eventName: 'moduleCreated', callback: (event: string) => void): void;
    /**
     *
     * @param eventName
     * @param callback (event: name of Module)
     */
    on(eventName: 'moduleChanged', callback: (event: string) => void): void;
    /**
     *
     * @param eventName
     * @param callback (event: name of Module)
     */
    on(eventName: 'moduleRemoved', callback: (event: string) => void): void;
    /**
     *
     * @param eventName
     * @param callback (event: mouse event)
     */
    on(eventName: 'click', callback: (event: MouseEvent) => void): void;
    /**
     * Once the click changes have been made
     * @param eventName
     * @param callback
     */
    on(eventName: 'clickEnd', callback: (event: any) => void): void;
    /**
     * Click second button mouse event
     * @param eventName
     * @param callback
     */
    on(eventName: 'contextmenu', callback: (event: any) => void): void;
    /**
     *
     * @param eventName
     * @param callback (event: position)
     */
    on(eventName: 'mouseMove', callback: (event: MousePositionEvent) => void): void;
    /**
     *
     * @param eventName
     * @param callback (event: keyboard event)
     */
    on(eventName: 'keydown', callback: (event: KeyboardEvent) => void): void;
    /**
     *
     * @param eventName
     * @param callback (event: Level of zoom)
     */
    on(eventName: 'zoom', callback: (event: any) => void): void;
    /**
     *
     * @param eventName
     * @param callback (event: position)
     */
    on(eventName: 'translate', callback: (event: MousePositionEvent) => void): void;
    /**
     * Finish import
     * @param eventName
     * @param callback
     */
    on(eventName: 'import', callback: (event: any) => void): void;
    /**
     * Data export
     * @param eventName
     * @param callback
     */
    on(eventName: 'export', callback: (event: any) => void): void;
}
