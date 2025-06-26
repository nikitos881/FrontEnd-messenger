import {Image, ImageProps} from "react-native"

export function editPencilImage(props: ImageProps){
    return(
        <Image source={require("./editPencil.png")} {...props}/>
    )
}