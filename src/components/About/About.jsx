import GoBackButton from "../miniComponents/GobackButton"
import "./About.sass"
import {BiDonateHeart, BiBug, BiEnvelope} from "react-icons/bi"
import {BsQuestionCircle} from "react-icons/bs"

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
                
                <Section title={<>about <BsQuestionCircle/></>}>
                    Sheet Sage is a tool for testing and improving ones skill in reading music sheets.
                </Section>

                <Section title={<> Bug report <BiBug/></>}>
                    join our discord or send us an email in order to report a bug.
                </Section>

                <Section title={<> support  <BiDonateHeart size={36}/>  </>}>
                    Consider supporting us in order to keep our services free. <br/>


                </Section>

                <Section title={<>Contact <BiEnvelope/> </>}>
                {
                // eslint-disable-next-line
                }
                    send us an email at <a href="mailto:sheetsage@gmail.com"> sheetsage@gmail.com</a>.
                </Section>



                <GoBackButton className="width" onClick={props.onGoBack}/>
            </div>
        </div>
    )
}