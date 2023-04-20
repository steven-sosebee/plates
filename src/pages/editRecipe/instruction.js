import { useRef } from "react";

export const Step =({instruction={}})=>{
    const v = useRef();
    const {stepTitle,stepDescription,stepMinutes,stepCategory,id} = instruction;
    // console.log(instruction);
    // return (<><input id={stepKey} className = {'step'} key={stepKey} ref={v} placeholder={'please add new step...'}/><button>Delete</button></>)
    return (
      <tr id={id}>
      <td className = {'text'} contentEditable='true'>{stepTitle? stepTitle : ""}</td>
      <td className = {'select'}>
          <select id="category" defaultValue={stepCategory? stepCategory : ""}>
            <option value={1}>Prep</option>
            <option value={2}>Mix</option>
            <option value={3}>Cook</option>
            <option value={4}>Wait</option>
            <option value={5}>Service</option>
          </select>
      </td>
      <td className={'text'} contentEditable='true'>{stepDescription? stepDescription : ""}</td>
      <td className={'text'} contentEditable='true'>{stepMinutes? stepMinutes : null}</td>
      <td className={'noInput'}>
          <i className="fa-solid fa-circle-arrow-up"></i>
          <i className="fa-solid fa-circle-arrow-down"></i>
          <i className="fa-solid fa-trash-can"></i>
      </td>
      </tr>
    )
  }