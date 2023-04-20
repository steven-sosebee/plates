export const Instructions = ({steps})=>{
    
    if (!Array.isArray(steps)){
        return (
            <div>
                <p>No instructions found...</p>
            </div>
        )
    }
    return (
        <table>
            <thead>
                <th></th>
                <th>Instruction</th>
                <th>Minutes</th>
                <th>Description</th>
            </thead>
            {steps.map((step,i)=>(
                <tr>
                    <td>{i+1}</td>
                    <td>{step.stepTitle}</td>
                    <td>{step.stepMinutes}</td>
                    <td>{step.stepDescription}</td>
                </tr>
            ))}
        </table>
    )
}