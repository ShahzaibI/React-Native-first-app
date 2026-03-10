import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedCardFlip = () => {
    const flip = useSharedValue(0);
    const frontImage = require('../images/img1.jpg');
    const backImage = require('../images/img2.jpg');

    const animatedStyleFront = useAnimatedStyle(()=>{
        return {
            transform: [
                {perspective: 1000 },
                { rotateY: `${flip.value}deg` }
            ],
            opacity: flip.value < 90 ? 1 : 0,
        };
    });

    const animatedStyleBack = useAnimatedStyle(()=>{
        return {
            transform: [
                {perspective: 1000 },
                { rotateY: `${flip.value + 180}deg` }
            ],
            opacity: flip.value >= 90 ? 1 : 0,
        };
    });

    const handleFlip = () => {
        flip.value = withSpring(flip.value === 0 ? 180 : 0);
    };

    return (
        <View className='flex-1 justify-center items-center bg-[#f04f8]'>
            <View className='w-64 h-64 relative'>
                <Animated.View // In which use the Animated. before the component name where you want to apply the animation
                    style={[animatedStyleFront]}
                    className="py-3 absolute w-full bg-white rounded-3xl shadow-xl justify-center items-center"
                >
                    <Image source={frontImage} className="w-56 h-36 rounded-lg" resizeMode='cover' />
                    <Text className='text-[#333] font-semibold text-lg'>Product Title - Item Front</Text>
                    <Text className='text-gray-600 font-semibold text-sm'>This is front side</Text>
                </Animated.View>
                <Animated.View
                    style={[animatedStyleBack]}
                    className="py-3 absolute w-full bg-white rounded-3xl shadow-xl justify-center items-center"
                >
                    <Image source={backImage} className="w-56 h-36 rounded-lg" resizeMode='cover' />
                    <Text className='text-[#333] font-semibold text-lg'>Product Title - Item Back</Text>
                    <Text className='text-gray-600 font-semibold text-sm'>This is back side</Text>
                </Animated.View>
            </View>
            <TouchableOpacity onPress={handleFlip} className="mt-8 px-8 py-3 bg-[#4a90e2] rounded-lg shadow-md">
                <Text className='text-white text-lg font-semibold'>Flip</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AnimatedCardFlip;