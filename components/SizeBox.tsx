import { ThemedView } from "./ThemedView"

export const SizeBox = ({size}: {size: number}) => {
    return (
        <ThemedView style={{width: size, height: size, backgroundColor:"transparent"}} />
    )
}