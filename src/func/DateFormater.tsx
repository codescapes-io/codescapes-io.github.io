const DateFormater = (sDate: string | undefined) => {
    if (sDate) {
        let date = new Date(sDate);
        let month = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        let formatDate = `${date.getDay()}  ${month[date.getMonth()]}  ${date.getFullYear()}`
        return formatDate;
    } else {
        return null;
    };
};

export default DateFormater;
