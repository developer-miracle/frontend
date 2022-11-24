import React, { useEffect, useState } from "react";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/ru'

function RealTime() {
    dayjs.extend(utc)
    dayjs.locale('ru')

    const [dateTime, setDateTime] = useState<dayjs.Dayjs>(dayjs)
    useEffect(() => {
        const interval = setInterval(
            () => setDateTime(dayjs()),
            1000
        );
        return () => {
            clearInterval(interval)
        }
    }, [])
    return <span>Текущее время : {dateTime?.format('DD.MM.YYYY HH:mm:ss Z')}</span>
}

export default RealTime