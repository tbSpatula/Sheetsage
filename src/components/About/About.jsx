import GoBackButton from "../miniComponents/GobackButton"
import "./About.sass"

function Section(props){
    return(
        <div className="section">
            <h2> {props.title} </h2>
            <p>
                  {props.children}
            </p>
        </div>
    )
}

export default function About(props) {

    return (
        <div className="center">
            <div id="Aboutpage" className="width2 unique">
                
                <Section title="about">
                    Sheet Sage is a tool for testing and improving ones skill in reading music sheets.
                </Section>

                <Section title="Bug report">
                    join our discord or send us an email in order to report a bug.
                </Section>
                <Section title="Donating">
                    Consider supporting us in order to keep our services free.
                </Section>

                <GoBackButton className="width" onClick={props.onGoBack}/>
            </div>
        </div>
    )
}