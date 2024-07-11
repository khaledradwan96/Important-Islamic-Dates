// ========== Navbar ==========
$('#open-nav').click(function(){
    $('#leftMenu').animate({width: `250`},500)
})

$('#leftMenu .fa-xmark').click(function(){
    $('#leftMenu').animate({width: `0`},500)
})

// ========== Slider Down ==========
$('#sliderDown h3').click(function(){
  $(this).next().slideToggle(500)
  $('.inner').not($(this).next()).slideUp(500)
})


// ========== Prayer Timings ==========
async function getPrayerTimings(){
    const apiLInk = `https://api.aladhan.com/v1/timingsByCity/11-07-2024?city=cairo&country=egypt&method=8`
    try{
        const response = await fetch(apiLInk)
        const data = await response.json()
        console.log(data)
        displayPrayerTimings(data)
        // console.log(data.data.timings)
        // console.log(data.data.date.hijri.day)
    }catch (error) {
        console.error(error);  
    }
}

function displayPrayerTimings(data){
    const date = new Date();
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let dayName = date.toLocaleDateString(location, {weekday: 'long'})
    let dayNum = date.getDate()
    let monthName = date.toLocaleDateString(location, {month: 'long'})
    let year = date.getFullYear()

    let hijri = data.data.date.hijri
    let timings = data.data.timings

    let cartona = ''
    cartona = `
        <span class="time" style="float: right;">${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}</span>
        <h3>${dayName}</h3>
        <h3>${hijri.day} ${hijri.month.en} ${hijri.year} A.H.</h3>
        <h3>${dayNum} ${monthName} ${year}</h3>
        <ul>
            <li>Fajar <span>${timings.Fajr}</span></li>
            <li>Dhuhur <span>${timings.Dhuhr}</span></li>
            <li>Asr <span>${timings.Asr}</span></li>
            <li>Maghrib <span>${timings.Maghrib}</span></li>
            <li>Isha <span>${timings.Isha}</span></li>
        </ul>`

    calcNextPray(data)
    document.querySelector('#prayerTimings .content .box').innerHTML = cartona;
}



function calcNextPray(data){
    let now = new Date()
    let hours = now.getHours()
    let minutes = now.getMinutes()

    let timings = data.data.timings
    let timeAsNum = Number(timings.Isha.split(':')[0] * 60) + Number(timings.Isha.split(':')[1])
    let currTime = hours * 60 + minutes

    let hoursDifference = Math.floor((timeAsNum - currTime) / 60)
    let minsDifference = (timeAsNum - currTime) - (hoursDifference * 60)

    let differenceTime = `${((hoursDifference < 10) ? ("0" + hoursDifference) : hoursDifference)}:${((minsDifference < 10) ? ("0" + minsDifference) : minsDifference)}`
    
    document.querySelector('#differenceTime').innerHTML = differenceTime;
}



getPrayerTimings()


