
/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

/**
 * TMMachineLearning blocks
 */
//% weight=120 color=#3E80F6 icon="" block="Teachable Machine"
namespace TMMachineLearning {
    
    //% block="🟢 on green start"
    //% weight=3
    export function onMLGreenStart(handler: () => void): void {
        SerialCommands.onCommand("green", handler)
    }

    //% block="🟣 on purple start"
    //% weight=2
    export function onMLPurpleStart(handler: () => void): void {
        SerialCommands.onCommand("purple", handler)
    }
    
    //% block="🟠 on orange start"
    //% weight=1
    export function onMLOrangeStart(handler: () => void): void {
        SerialCommands.onCommand("orange", handler)
    }
}

enum  ServoPinNumber {
    //% block="P0"
    P0,
    //% block="P1"
    P1,
    //% block="P2"
    P2
}

/**
 * Additional servo blocks
 */
//% color="#03AA74" weight=88 icon="\uf021" blockGap=8
//% groups='["Gestures", "Positional", "Continuous", "Configuration"]'
namespace servos {
    /**
     * Set fast wave gesture
     */
    //% blockId=servossetfastwave block="set servo %servoPin to fast wave"
    //% servoPin.fieldEditor="gridpicker"
    //% servoPin.fieldOptions.width=220
    //% servoPin.fieldOptions.columns=3
    //% blockGap=8
    //% group="Gestures"
    //% weight=5
    export function setFastWave(servoPin: ServoPinNumber,): void {
        SerialCommands.setServoMode(servoPin, "fast wave");
    }

    /**
     * Set slow wave gesture
     */
    //% blockId=servossetslowwave block="set servo %servoPin to slow wave"
    //% servoPin.fieldEditor="gridpicker"
    //% servoPin.fieldOptions.width=220
    //% servoPin.fieldOptions.columns=3
    //% blockGap=8
    //% group="Gestures"
    //% weight=4
    export function setSlowWave(servoPin: ServoPinNumber,): void {
        SerialCommands.setServoMode(servoPin, "slow wave");
    }

    /**
     * Stop wave gesture
     */
    //% blockId=servosstopwave block="stop wave on servo %servoPin"
    //% servoPin.fieldEditor="gridpicker"
    //% servoPin.fieldOptions.width=220
    //% servoPin.fieldOptions.columns=3
    //% blockGap=8
    //% group="Gestures"
    //% weight=1
    export function stopWave(servoPin: ServoPinNumber): void {
        SerialCommands.setServoMode(servoPin, "");
    }
}
