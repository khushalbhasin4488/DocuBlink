import { ThemedView } from "@/components/ThemedView";
import { useRef } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
    ICarouselInstance,
    Pagination
} from "react-native-reanimated-carousel";

export const CustomCarousel = ({ images }: { images: string[] }) => {
    const ref = useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);
    
    const onPressPagination = (index: number) => {
      ref.current?.scrollTo({
        /**
         * Calculate the difference between the current index and the target index
         * to ensure that the carousel scrolls to the nearest index
         */
        count: index - progress.value,
        animated: true,
      });
    };


    return (
        <ThemedView style={styles.rootContainer}>
                  <Carousel
        ref={ref}
        height={Dimensions.get("window").height * 0.4}
        width={Dimensions.get("window").width-10}
        data={images}
        onProgressChange={(_, absoluteProgress) => {
          progress.value = absoluteProgress;
        }}
        renderItem={({ item, index }) => (
          <View
            style={{
                display:"flex"
                ,alignItems:"center",
                justifyContent:"center",
                width: "100%",
                height: "100%",
                margin:"auto"
            }}
          >
           <Image
           source={{ uri: item }}
           style={{ height: '100%', width: "100%"}}
           />
          </View>
        )}
      />
 
      <Pagination.Basic
        progress={progress}
        data={images}
        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
        containerStyle={{ gap: 5, marginTop: 10 }}
        onPress={onPressPagination}
      />
        </ThemedView>


    )
}
const styles = StyleSheet.create({
    rootContainer:{
        display:"flex",
        flex:1,
        flexDirection:"column",
        padding:10,
        alignItems:"center",
        justifyContent:"center",
    }
})