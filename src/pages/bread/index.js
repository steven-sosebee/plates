import { useRef, useState } from "react"

export const BreadCalc = () => {
    const tw = useRef();
    const h = useRef();

    const [flour,setFlour] = useState();
    const [water, setWater] = useState();
    const [salt, setSalt] = useState();
    const [yeast, setYeast] = useState();
    const [preFlour, setPreFlour] = useState();
    const [preWater, setPreWater] = useState();

    const calc =() =>{
        if (!Number.isInteger(tw.current) || !Number.isInteger(h.current)) {return};
        console.log(Number.isInteger(tw.current));
        console.log(Number.isInteger(h.current));
        const hp = h.current / 100;
        const f = tw.current / (1 + hp);
        const y = f * .01;
        const s = f * .02;
        setWater(Math.round((f * hp) * .8))
        setFlour(Math.round(f * .8));
        setPreFlour(Math.round(f * .2));
        setPreWater(Math.round((f * hp) * .2));
        setSalt(Math.round(s));
        setYeast(Math.round(y));
        
    }
    const setTW = (e) =>{
        tw.current = parseInt(e.target.value);
        calc();
    }
    const setH = (e) =>{
        h.current = parseInt(e.target.value);
        calc()
    }
    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td>Total Weight (g):</td>
                    <td><input ref={tw} onChange={setTW}></input></td>
                </tr>
                <tr>
                    <td>Hydration (%):</td>
                    <td><input ref={h} default={70} onChange={setH}></input></td>
                </tr>
                <tr>
                    <td>Preferment Flour (g): </td><td>{preFlour}</td>
                </tr>
                <tr>
                    <td>Preferment Water (g): </td><td>{preWater}</td>
                </tr>

                <tr>
                    <td>Flour (g): </td><td>{flour}</td>
                </tr>
                <tr>
                    <td>Water (g): </td><td>{water}</td>
                </tr>
                <tr>
                    <td>Salt (g): </td><td>{salt}</td>
                </tr>
                <tr>
                    <td>Yeast (g): </td><td>{yeast}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}