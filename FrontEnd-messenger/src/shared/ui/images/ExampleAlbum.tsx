import {Image, ImageProps} from "react-native"

export function ExampleAlbumImage(props: ImageProps){
    return(
        <Image source={require("./ExampleAlbum.jpg")} {...props}/>
    )
}