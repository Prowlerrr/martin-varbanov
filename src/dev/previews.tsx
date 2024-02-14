import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import AuthButton from "../components/Login/AuthButton";
import AmericanFlag from "../components/LanguageSwitcher/AmericanFlag";
import Comments from "../components/Comments/Comments";
import Login from "../components/Login/Login";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/AuthButton">
                <AuthButton/>
            </ComponentPreview>
            <ComponentPreview path="/AmericanFlag">
                <AmericanFlag/>
            </ComponentPreview>
            <ComponentPreview path="/PaletteTree">
                <PaletteTree/>
            </ComponentPreview>
            <ComponentPreview path="/Comments">
                <Comments/>
            </ComponentPreview>
            <ComponentPreview path="/Login">
                <Login/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;