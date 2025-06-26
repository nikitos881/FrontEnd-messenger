import {Image, ImageProps} from "react-native"

export function eyeImage(props: ImageProps){
    return(
        <Image source={require("./eyeImage.png")} {...props}/>
    )
}