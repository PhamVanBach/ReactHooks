import { useEffect, useState } from 'react';

function formatDate() {
    const date = new Date();
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);

    return `${hours} : ${minutes} : ${seconds}`
}

function Clock() {
    const [timeString, setTimeString] = useState('')

    useEffect(() => {
        const clockInterval = setInterval(() => {
            const now = new Date();
            const newTimeString = formatDate(now)

            setTimeString(newTimeString)
        }, 1000)

        //clean up 
        return () => {
            clearInterval(clockInterval)
        }
    }, [])

    return {timeString}
}

export default Clock;