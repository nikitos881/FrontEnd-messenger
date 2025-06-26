import {Image, ImageProps} from "react-native"

export function deleteImage(props: ImageProps){
    return(
        <Image source={require("./deleteImage.png")} {...props}/>
    )
}