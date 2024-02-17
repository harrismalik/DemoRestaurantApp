export const extractHour = (_date:string) => {
    const hr = parseInt(_date.split(':')[0])
    const am_pm = hr>11 ? 'PM' : 'AM'
    return (hr>12 ? hr-12 : hr).toString()+' '+am_pm
}
