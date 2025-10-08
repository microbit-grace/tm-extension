// Default program
namespace SerialCommands {
    const sounds = [
        soundExpression.giggle,
        soundExpression.happy,
        soundExpression.hello,
        soundExpression.mysterious,
        soundExpression.sad,
        soundExpression.soaring,
        soundExpression.spring,
        soundExpression.twinkle,
        soundExpression.yawn
    ]
    const servoOptions = [
        "slow wave",
        "fast wave",
        0,
        15,
        30,
        45,
        60,
        75,
        90,
        105,
        120,
        135,
        150,
        165,
        180
    ];

    // Initialise servo.
    let servoPins = [servos.P0, servos.P1, servos.P2]
    let servoModes = ["", "", ""]
    let prevAngles = [0, 0, 0]
    let serialServoPin = 0

    export function initialiseDefaults() {
        setupRecordCommand()
        setupServo()
        setupDefaultCallbacks()
    }

    export function setServoMode(servoPin: number, mode: string) {
        servoModes[servoPin] = mode
    }

    function setupDefaultCallbacks() {
        callbacks.addCommandCallbackwithArg("display", function (value) {
            if (value === -1) {
                basic.clearScreen()
            } else {
                basic.showIcon(value)
            }
        })
        callbacks.addCommandCallbackwithArg("servo", function (value) {
            servoModes[serialServoPin] = ""
            if (value === -1) {
                servoPins[serialServoPin].stop()
                return
            }
            const servoOption = servoOptions[value]
            if (typeof servoOption === "number") {
                servoPins[serialServoPin].setAngle(servoOption)
            } else {
                servoModes[serialServoPin] = servoOption
            }
        })
        callbacks.addCommandCallbackwithArg("sound", function (value) {
            if (value === -1) {
                music.stopAllSounds()
            }
            if (sounds[value]) {
                music.stopAllSounds()
                music.play(music.builtinPlayableSoundEffect(sounds[value]), music.PlaybackMode.InBackground)
            }
        })
    }
    
    function setupServo() {
        for (let i = 0; i < servoModes.length; i++) {
            const idx = i
            basic.forever(function () {
                if (servoModes[idx] !== "slow wave" && servoModes[idx] !== "fast wave") {
                    return
                }
                let newAngle
                const isSlowWave = servoModes[idx] === "slow wave"
                if (prevAngles[idx] < 90) {
                    newAngle = isSlowWave ? 165 : 120
                } else {
                    newAngle = isSlowWave ? 15 : 60
                }
                basic.pause(isSlowWave ? 500 : 250)
                prevAngles[idx] = newAngle
                servoPins[idx].setAngle(newAngle)
                // serial.writeLine("Servo[" + idx + "] to " + servoModes[idx] + " at " + newAngle)
            })
        }
    }

    const buttonToClassId = {
        [Button.A]: 0,
        [Button.B]: 1,
        [Button.AB]: 2,
    }

    let buttonPressed: Button | null = null
    function setupRecordCommand() {
        // Record data for class
        const record = (startOrEnd: 'start' | 'end', button: Button) => {
            if (startOrEnd === 'start' && buttonPressed) {
                // Recording has already started.
                return;
            }
            if (button !== Button.AB && startOrEnd === 'start') {
                // Abort if AB is pressed.
                basic.pause(100)
                if (buttonPressed) {
                    return;
                }
            }
            if (startOrEnd === 'end' && buttonPressed !== button) {
                // What has ended is not the button pressed.
                return;
            }
            // Record what is pressed.
            buttonPressed = startOrEnd === "start" ? button : null
            const classId = buttonToClassId[button];
            SerialCommands.sendCommandWithArgument(`${startOrEnd}Record`, classId)
        }
        control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A,
            EventBusValue.MICROBIT_BUTTON_EVT_DOWN, () => record('start', Button.A))
        control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A,
            EventBusValue.MICROBIT_BUTTON_EVT_UP, () => record('end', Button.A))
        control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_B,
            EventBusValue.MICROBIT_BUTTON_EVT_DOWN, () => record('start', Button.B))
        control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_B,
            EventBusValue.MICROBIT_BUTTON_EVT_UP, () => record('end', Button.B))
        control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_AB,
            EventBusValue.MICROBIT_BUTTON_EVT_DOWN, () => record('start', Button.AB))
        control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_AB,
            EventBusValue.MICROBIT_BUTTON_EVT_UP, () => record('end', Button.AB))
    }
}

