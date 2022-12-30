import { useRef } from "react";

export const Step =({instruction})=>{
    const v = useRef();
    const {stepTitle,stepDescription,stepMinutes,stepCategory} = instruction;
    console.log(instruction);
    // return (<><input id={stepKey} className = {'step'} key={stepKey} ref={v} placeholder={'please add new step...'}/><button>Delete</button></>)
    return (
      <tr>
      <td className = {'text'} contentEditable='true'>{stepTitle}</td>
      <td className = {'select'}>
          <select id="category" value={stepCategory}>
            <option value={1}>Prep</option>
            <option value={2}>Mix</option>
            <option value={3}>Cook</option>
            <option value={4}>Wait</option>
            <option value={5}>Service</option>
          </select>
      </td>
      <td className={'text'} contentEditable='true'>{stepDescription}</td>
      <td className={'text'} contentEditable='true'>{stepMinutes}</td>
      <td className={'noInput'}>
          <i class="fa-solid fa-circle-arrow-up"></i>
          <i class="fa-solid fa-circle-arrow-down"></i>
          <i class="fa-solid fa-trash-can"></i>
      </td>
      </tr>
    )
  }