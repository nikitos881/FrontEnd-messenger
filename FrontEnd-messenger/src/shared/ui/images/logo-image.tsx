import {Image, ImageProps} from "react-native"

export function LogoImage(props: ImageProps){
    return(
        <Image source={require("./logo.png")} {...props}/>
    )
}