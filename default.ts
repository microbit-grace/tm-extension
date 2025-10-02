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
    let servoMode = ""
    let prevAngle = 0

    export function initialiseDefaults() {
        setupRecordCommand()
        setupServo()
        setupDefaultCallbacks()
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
            servoMode = ""
            if (value === -1) {
                servos.P0.stop()
                return
            }
            const servoOption = servoOptions[value]
            if (typeof servoOption === "number") {
                servos.P0.setAngle(servoOption)
            } else {
                servoMode = servoOption
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
        serial.setRxBufferSize(128)
        basic.forever(function () {
            if (servoMode !== "slow wave" && servoMode !== "fast wave") {
                return
            }
            let newAngle
            const isSlowWave = servoMode === "slow wave"
            if (prevAngle < 90) {
                newAngle = isSlowWave ? 165 : 120
            } else {
                newAngle = isSlowWave ? 15 : 60
            }
            basic.pause(isSlowWave ? 500 : 250)
            prevAngle = newAngle
            servos.P0.setAngle(newAngle)
        })
    }

    function setupRecordCommand() {
        // Record data for class
        const startRecord = (classId: number) => {
            SerialCommands.sendCommandWithArgument('startRecord', classId)
        }
        const endRecord = (classId: number) => {
            SerialCommands.sendCommandWithArgument('endRecord', classId)
        }
        control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A,
            EventBusValue.MICROBIT_BUTTON_EVT_DOWN, () => startRecord(0))
        control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A,
            EventBusValue.MICROBIT_BUTTON_EVT_UP, () => endRecord(0))
        control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_B,
            EventBusValue.MICROBIT_BUTTON_EVT_DOWN, () => startRecord(1))
        control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_B,
            EventBusValue.MICROBIT_BUTTON_EVT_UP, () => endRecord(1))
        input.onLogoEvent(TouchButtonEvent.Touched, () => startRecord(2))
        input.onLogoEvent(TouchButtonEvent.Released, () => endRecord(2))
    }
}

