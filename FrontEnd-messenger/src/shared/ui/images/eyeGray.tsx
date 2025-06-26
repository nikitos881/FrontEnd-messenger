import {Image, ImageProps} from "react-native"

export function eyeGrayImage(props: ImageProps){
    return(
        <Image source={require("./eyeGray.png")} {...props}/>
    )
}