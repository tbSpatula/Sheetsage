import "./WebTitle.sass"

export default function WebTitle (props) {

    return (
        <div className="webtitle width">
            <span className="title-24 parchm"> s<span className="hidden">heet sage</span> </span> 
        {props.children}
        </div>
    )
}