import React, { useState, createContext, useContext,useRef } from "react";

export const DragNDropContext = createContext();

export const useDnDContext = () => useContext(DragNDropContext);

export const DnDProvider = ({ children }) => {
    const destList=useRef();
    const sourceList=useRef();
    const dragItem=useRef();

    // sends information back to list components
    class dragged {
        constructor(s,d,i){
            this.source=s;
            this.destination=d;
            this.item=i;
            this.moveItem=this.source!==this.destination  && (this.destination!==null || this.destination!==undefined);
            this.itemKey=this.item?.key;
        };
    };

    // onDragStart sets source variables
    const handleDragStart = (e,l) => {
        sourceList.current=e.currentTarget.id;
        const dragId=e.target.id;
        dragItem.current=l[l.findIndex((item) => item.key.toString() === dragId)];
        return new dragged(sourceList.current,destList.current,dragItem.current);        
    };
    
    // Drag end events
    
    // OnDragEnd fires on source element
    const handleDragEnd=(e)=>{    
        const output = new dragged(sourceList.current,destList.current,dragItem.current);
        destList.current=null;
        sourceList.current=null;
        dragItem.current=null;
        return output;
    };

    // allows onDrop event to fire
    const handleDragOver=(e)=>{
        e.preventDefault();
    };

    // onDrop fires on destination element
    const handleDrop = (e,id)=>{
        destList.current=id;
        const output = new dragged(sourceList.current,destList.current,dragItem.current);
        return output;
    };
    
    return (
        <DragNDropContext.Provider value={{ 
            handleDragEnd:handleDragEnd, 
            handleDragOver:handleDragOver, 
            handleDragStart:handleDragStart, 
            handleDrop:handleDrop }}>
        {children}
        </DragNDropContext.Provider>
    );
};
