
/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

/**
 * TMMachineLearning blocks
 */
//% weight=120 color=#3E80F6 icon="" block="Machine Learning"
namespace TMMachineLearning {
    
    //% block="on green start"
    //% weight=3
    export function onMLGreenStart(handler: () => void): void {
        SerialCommands.onCommand("green", handler)
    }

    //% block="on purple start"
    //% weight=2
    export function onMLPurpleStart(handler: () => void): void {
        SerialCommands.onCommand("purple", handler)
    }
    
    //% block="on orange start"
    //% weight=1
    export function onMLOrangeStart(handler: () => void): void {
        SerialCommands.onCommand("orange", handler)
    }
}
