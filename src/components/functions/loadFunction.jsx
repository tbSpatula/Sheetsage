import { getUserPreference } from "./UserPreferences";
import processPallete from "./processPallete";

export default function loadFunction(){
    processPallete(getUserPreference("theme"))
}