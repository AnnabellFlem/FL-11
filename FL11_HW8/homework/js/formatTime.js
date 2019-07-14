function formatTime(timeInMinutes) {
    const minutesInDay = 1440;
    const hoursInDay = 24;
    const minutesInHour = 60;

    const days = timeInMinutes / minutesInDay;
    const roundDays = Math.floor(days);
    const hours = (days - roundDays) * hoursInDay;
    const roundHours = Math.floor(hours);
    const minutes = (hours - roundHours) * minutesInHour;
    const roundMinutes = Math.round(minutes);
    return timeInMinutes + " minutes = "
        + roundDays + " day(s) and "
        + roundHours + " hour(s) and "
        + roundMinutes + " minute(s).";
}

console.log(formatTime(120));
