import {Image, ImageProps} from "react-native"

export function profileImage(props: ImageProps){
    return(
        <Image source={require("./profileImage.png")} {...props}/>
    )
}