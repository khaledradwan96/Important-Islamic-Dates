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

    let cartona = `
        <span class="time" style="float: right;">${hours}:${minutes}</span>
        <h3>${dayName}</h3>
        <h3>${hijri.day} ${hijri.month.en} ${hijri.year} A.H.</h3>
        <h3>${dayNum} ${monthName} ${year}</h3>
        <ul>
            <li>Fajar <span>${timings.Fajr}</span></li>
            <li>Dhuhur <span>${timings.Dhuhr}</span></li>
            <li>Asr <span>${timings.Asr}</span></li>
            <li>Maghrib <span>${timings.Maghrib}</span></li>
            <li>Isha <span>${timings.Isha}</span></li>
        </ul>
        <h5>Next pray at: <span  class="time">10:00</span></h5>`

    calcNextPray(data)
    document.querySelector('#prayerTimings .content').innerHTML = cartona;
}







getPrayerTimings()


