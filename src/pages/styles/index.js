import "./styles.css"
import svgImg from "./blog.svg"
import testImg from "../../assets/Untitled.svg"
export const Styles = () => {

    return (
        <div>
            <h1>SVG Test</h1>
            {/* <img src={"./blog.svg"} height={300}/> */}
            <img src={testImg} height={100}/>
            <h6>SVG1</h6>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                {/* <ellipse fill="#000" stroke="#000" cx="5" cy="5" r="10"/> */}
                <line stroke="#000" x1={50} y1={25} x2={100} y2={100}/>
                <line stroke="#000" x1={25} y1={75} x2={100} y2={0}/>
            </svg>
        </div>
    )
}