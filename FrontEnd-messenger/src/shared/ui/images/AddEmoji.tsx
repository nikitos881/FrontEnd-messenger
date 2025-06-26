import {Image, ImageProps} from "react-native"

export function AddEmojiImage(props: ImageProps){
    return(
        <Image source={require("./AddEmoji.png")} {...props}/>
    )
}



