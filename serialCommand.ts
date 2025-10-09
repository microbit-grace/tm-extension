
/**
 * Serial event/command blocks
 */

namespace SerialCommands {
    let initialised = false
    export let callbacks: CommandCallbacks = null
    init()
    
    function init(): void {
        serial.writeLine(`initialised? ${initialised} ${callbacks}`)
        if (callbacks) {
            return
        }
        callbacks = new CommandCallbacks();
        serial.setRxBufferSize(128)
        serial.onDataReceived(serial.delimiters(Delimiters.NewLine), parseInput)
        initialiseDefaults()
        initialised = true
    }
    function parseInput(): void {
        let commandStr = serial.readUntil(serial.delimiters(Delimiters.NewLine))
        let command = commandStr.split(":", 3)
        serial.writeLine(commandStr)
        if (command[0] === "c") {
            if (command.length > 2) {
                callbacks.fireCallbackwithArgFor(command[1], parseInt(command[2]))
            } else {
                callbacks.fireCallbackFor(command[1])
            }
        } else {
            serial.writeLine("unknown message type")
        }
    }
    export function sendCommand(command: string): void {
        serial.writeLine("c:" + command)
    }
    export function sendCommandWithArgument(command: string, arg: number): void {
        serial.writeLine("c:" + command + ":" + arg.toString())
    }
    export function onCommandwithArg(arg: string, handler: (value: number) => void) {
        init()
        callbacks.addCommandCallbackwithArg(arg, handler)
    }
    export function onCommand(arg: string, handler: () => void) {
        init()
        callbacks.addCommandCallback(arg, handler)
    }
}
