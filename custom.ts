
/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

/**
 * Custom blocks
 */
//% weight=120 color=#3E80F6 icon="" block="Machine Learning"
namespace Custom {
    
    //% block="on green start"
    export function onMLGreenStart(handler: () => void): void {
        SerialCommands.onCommand("green", handler)
    }

    //% block="on purple start"
    export function onMLPurpleStart(handler: () => void): void {
        SerialCommands.onCommand("purple", handler)
    }
    
    //% block="on orange start"
    export function onMLOrangeStart(handler: () => void): void {
        SerialCommands.onCommand("orange", handler)
    }
}
