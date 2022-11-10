export const Instructions = ({steps})=>{
    console.log(steps);
    // if (!Array.isArray(steps)){
    //     return (
    //         <div>
    //             <p>No instructions found...</p>
    //         </div>
    //     )
    // }
    return (
        <ul>
            {steps.map(step=>(
                <li><p>{step.stepDescription}</p></li>
            ))}
        </ul>
    )
}