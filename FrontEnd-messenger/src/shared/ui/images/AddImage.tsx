import {Image, ImageProps} from "react-native"

export function AddImageImage(props: ImageProps){
    return(
        <Image source={require("./AddImage.png")} {...props}/>
    )
}


