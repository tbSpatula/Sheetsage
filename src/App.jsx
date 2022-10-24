import ClefInstance from "./components/ClefInstance/ClefInstance";
import EndScreen from "./components/EndScreen/EndScreen";
import PracticeSelection from "./components/PracticeSelection/PracticeSelection";
import keybindInit from "./components/functions/loadDefaultKeybinds";
import ConstantUI from "./components/ConstantUI/ConstantUI";

import { useState , useEffect,useRef} from "react";
import { motion,AnimatePresence } from "framer-motion";
//import { isMobile } from "react-device-detect";

import UUID from "./components/functions/UUID";

import "./App.sass"
import Options from "./components/Options/Options";
import About from "./components/About/About";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import loadFunction from "./components/functions/loadFunction";


function AnimationWrapper(props){

  const shown = {
    opacity: 1,
  }

  const hidden = {
    opacity: 0,
  }

  return (
    <AnimatePresence>
     <motion.div
      key={UUID("presence")}
      className="presence_div"
      initial={hidden}
      animate={shown}
      exit={hidden}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  )
}

function ClefParsed(props){

  function onCompleteFunction(x){
    return (
      <AnimationWrapper key="1.5">
        <EndScreen
        points={x.points}
        elapsedTime={x.elapsedTime}
        clef={x.clef}
        onPlayAgain={() => {
          props.setter(
            <ClefParsed 
            optionsObject={props.optionsObject}
            setter={props.setter}
            onGoBack={props.onGoBack}
            />
          )
        }}
        onGoBack={props.onGoBack}
        />
      </AnimationWrapper>
    )
  }

  return(
    <AnimationWrapper>
      <ClefInstance
      clef={props.clef}
      optionsObject={props.optionsObject}
      onComplete={(x) => {
        props.setter(
          onCompleteFunction(x)
        )
      }}
      />
    </AnimationWrapper>
  )
}

function App() {
  const [page, setpage0] = useState();
  const currentpage = useRef("")
  const lastpage = useRef(<></>)
  function setpage(value){

    const getKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value);

    if(value.key !== lastpage.current.key) {
      currentpage.current = getKeyByValue(pages,value) || ""
      console.log(currentpage.current)
      lastpage.current = value
      setpage0(value)
    }
  }

  useEffect(() => {
    keybindInit()
    loadFunction()
  }, []);

  const pages = {
    "options": <AnimationWrapper key={2}> <Options onGoBack={() => setpage(pages.practiceSelection)}/> </AnimationWrapper>,
    "about": <AnimationWrapper key={3}> <About onGoBack={() => setpage(pages.practiceSelection)}/> </AnimationWrapper>,
    "privacyPolicy": <AnimationWrapper key={4}> <PrivacyPolicy onGoBack={() => setpage(pages.practiceSelection)}/> </AnimationWrapper>,
    "practiceSelection": 
        <AnimationWrapper key={5}> 
          <PracticeSelection 
            onStart={(x) => setpage(<ClefParsed optionsObject={x} setter={setpage} onGoBack={() => setpage(pages.practiceSelection)}/>)}
            onPrivacyPolicy={() => setpage(pages.privacyPolicy)}
            onAbout={() => setpage(pages.about)}
          /> 
        </AnimationWrapper>,
  }


  return (
    <div className="App"> 
        {
          page === undefined ? setpage(pages.practiceSelection) : page
        }
        <ConstantUI
        onOptions={() => setpage(pages.options)}
        onHome={() => setpage(pages.practiceSelection)}
        />
    </div>
  );
}

export default App;
