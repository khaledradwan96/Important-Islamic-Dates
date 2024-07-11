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

    nextPray(data)

    document.querySelector('#prayerTimings .content .box').innerHTML = cartona;
}

function nextPray(data){
    // get current Time
    let now = new Date()
    let hours = now.getHours()
    let minutes = now.getMinutes()
    let currTime = hours * 60 + minutes
    
    // get prays Times
    let timings = data.data.timings
    let pray01 = Number(timings.Fajr.split(':')[0] * 60) + Number(timings.Fajr.split(':')[1])
    let pray02 = Number(timings.Dhuhr.split(':')[0] * 60) + Number(timings.Dhuhr.split(':')[1])
    let pray03 = Number(timings.Asr.split(':')[0] * 60) + Number(timings.Asr.split(':')[1])
    let pray04 = Number(timings.Maghrib.split(':')[0] * 60) + Number(timings.Maghrib.split(':')[1])
    let pray05 = Number(timings.Isha.split(':')[0] * 60) + Number(timings.Isha.split(':')[1])
    let arr = [pray01, pray02, pray03, pray04, pray05]

    let next = []
    for(let i=0; i<arr.length; i++){
        if(currTime > arr[i]){
            // console.log(arr[i])
            continue;
        }
        // console.log(arr[i])
        next.push(arr[i])
    }
    console.log(next[0])
    let hoursDifference = Math.floor((next[0] - currTime) / 60)
    let minsDifference = (next[0] - currTime) - (hoursDifference * 60)

    let differenceTime = `${((hoursDifference < 10) ? ("0" + hoursDifference) : hoursDifference)}:${((minsDifference < 10) ? ("0" + minsDifference) : minsDifference)}`
    document.querySelector('#differenceTime').innerHTML = differenceTime;
}

getPrayerTimings()


