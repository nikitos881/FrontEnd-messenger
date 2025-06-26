import {Image, ImageProps} from "react-native"

export function checkboxOutlineImage(props: ImageProps){
    return(
        <Image source={require("./checkboxOutline.png")} {...props}/>
    )
}