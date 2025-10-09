input.onPinPressed(TouchPin.P0, function () {
    servos.setSlowWave(ServoPinNumber.P0)
    servos.setFastWave(ServoPinNumber.P1)
})
input.onButtonPressed(Button.A, function () {
    if (fast) {
        servos.setSlowWave(ServoPinNumber.P0)
        servos.setSlowWave(ServoPinNumber.P1)
        servos.setSlowWave(ServoPinNumber.P2)
    } else {
        servos.setFastWave(ServoPinNumber.P0)
        servos.setFastWave(ServoPinNumber.P1)
        servos.setFastWave(ServoPinNumber.P2)
    }
    fast = !(fast)
})
input.onPinPressed(TouchPin.P2, function () {
    servos.setSlowWave(ServoPinNumber.P2)
    servos.setFastWave(ServoPinNumber.P0)
})
input.onButtonPressed(Button.B, function () {
    servos.stopWave(ServoPinNumber.P0)
    servos.stopWave(ServoPinNumber.P1)
    servos.stopWave(ServoPinNumber.P2)
})
input.onPinPressed(TouchPin.P1, function () {
    servos.setSlowWave(ServoPinNumber.P1)
    servos.setFastWave(ServoPinNumber.P2)
})
let fast = false
servos.P1.setAngle(90)
servos.P2.setAngle(90)
servos.P0.setAngle(90)
