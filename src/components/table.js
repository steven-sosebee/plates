export const Table = ({headers, data, columnTypes}) => {
    return (
        <table>
            <thead>
                {headers.map(x=><th>{x}</th>)}
            </thead>
            <tbody>
                {data.map(x=>(<tr>{x.map(y=>(<td>{y}</td>))}</tr>))}
            </tbody>
        </table>
    )
}