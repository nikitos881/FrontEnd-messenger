import {Image, ImageProps} from "react-native"

export function ThumbUpImage(props: ImageProps){
    return(
        <Image source={require("./ThumbUp.png")} {...props}/>
    )
}





